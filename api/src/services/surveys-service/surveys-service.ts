import AccountsService from "../accounts-service/accounts-service";
import SurveyModel from "../../models/survey";
import ProjectModel from '../../models/project';
import SurveyParticipantModel from "../../models/survey-participant";
import SurveyNotFoundError from "./errors/survey-not-found-error";
import RespondentDoesNotParticipateInSurveyError from "./errors/respondent-does-not-participate-in-survey-error.ts";
import NotPermittedError from "../../generic/not-permitted-error";
import LimeSurveyAdapter from "../lime-survey-adapter";
import { RespondentProfileModel } from "../../models";

export default class SurveysService {
    accountsService: AccountsService;
    limeSurveyAdapter: LimeSurveyAdapter

    constructor(
        accountsService: AccountsService,
        limeSurveyAdapter: LimeSurveyAdapter,
    ) {
        this.accountsService = accountsService;
        this.limeSurveyAdapter = limeSurveyAdapter;
    }

    completeSurvey = async (
        surveyUuid: string,
        respondentAccountUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: respondentAccountUuid });

        const survey = await SurveyModel.findOne({
            where: {
                uuid: surveyUuid,
            },
            include: [{
                association: SurveyModel.associations.ProjectModel,
                attributes: ['uuid'],
            }],
        });
        if (!survey) {
            throw new SurveyNotFoundError();
        }

        const surveyParticipant = await SurveyParticipantModel.findOne({
            where: {
                //@ts-ignore
                RespondentProfileId: account.RespondentProfile.id,
                SurveyId: survey.id,
            },
        });
        if (!surveyParticipant) {
            throw new RespondentDoesNotParticipateInSurveyError();
        }

        surveyParticipant.hasFinished = true;
        await surveyParticipant.save();

        //@ts-ignore
        return survey.Project.uuid;
    };

    getAllRespondentsSurveyResponses = async (
        surveyUuid: string,
        currentUserUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        //@ts-ignore
        const userCompanyId = account.RecruiterProfile.CompanyId;

        const survey = await SurveyModel.findOne({
            where: {
                uuid: surveyUuid,
            },
            attributes: ['id', 'templateJson'],
            include: [{
                association: SurveyModel.associations.ProjectModel,
                attributes: ['id'],
                include: [{
                    association: ProjectModel.associations.CompanyModel,
                    attributes: ['id'],
                }]
            }, {
                association: SurveyModel.associations.RespondentProfileModel,
                attributes: ['id'],
                include: [{
                    association: RespondentProfileModel.associations.AccountModel,
                    attributes: ['email'],
                }],
            }],
        });
        if (!survey) {
            throw new SurveyNotFoundError();
        }

        if (userCompanyId !== survey.Project.Company.id) {
            throw new NotPermittedError();
        }

        if (survey.templateJson.surveyType) {
            //TODO if screening, add grade
        }

        const { templateJson } = survey;
        const { languages } = templateJson;

        const tokenToEmailMap = Object.fromEntries(
            survey.RespondentProfiles.map(
                ({ Account, SurveyParticipant }) => ([
                    SurveyParticipant.token,
                    Account.email,
                ])
            )
        );

        const responsesData = await this.getSurveyResponsesForAllUsersFromLimeSurvey(survey.id, languages);
        const mappedResponses = this.mapLimeSurveyResponses(responsesData, tokenToEmailMap);
        return mappedResponses;
    };

    private getSurveyResponsesForAllUsersFromLimeSurvey = async (surveyId: number, languages: string[]) => {
        const responsesData = {};
        await this.limeSurveyAdapter.createSessionKey();
        for (const language of languages) {
            const encodedResponses = await this.limeSurveyAdapter.exportResponses(
                surveyId,
                language,
            );

            if (encodedResponses.status === 'No Data, could not get max id.') {
                responsesData[language] = [];
                continue;
            }

            responsesData[language] = JSON.parse(Buffer.from(encodedResponses, 'base64').toString('utf-8'));
        }
        await this.limeSurveyAdapter.releaseSessionKey();

        return responsesData;
    }

    private mapLimeSurveyResponses = (responsesData: any, tokenToEmailMap?: any) => {
        const mappedResponsesData = {};

        Object.keys(responsesData).forEach(language => {
            mappedResponsesData[language] = responsesData[language].responses
            ? responsesData[language].responses.map(response => {
                const responsesDataEntries = Object.entries(response);
                const token = responsesDataEntries.slice(5, 6)[0][1] as string;
                const responses = responsesDataEntries.slice(6);

                const mappedResponse = {
                    ...Object.fromEntries(responses),
                };

                if (tokenToEmailMap) {
                    mappedResponse.__email = tokenToEmailMap[token];
                }

                return mappedResponse;
            })
            : [];
        });

        return mappedResponsesData;
    }

    getOneRespondentSurveyResponses = async (
        surveyUuid: string,
        respondentUuid: string,
        currentUserUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        //@ts-ignore
        const userCompanyId = account.RecruiterProfile.CompanyId;

        const survey = await SurveyModel.findOne({
            where: {
                uuid: surveyUuid,
            },
            attributes: ['id', 'templateJson'],
            include: [{
                association: SurveyModel.associations.ProjectModel,
                attributes: ['id'],
                include: [{
                    association: ProjectModel.associations.CompanyModel,
                    attributes: ['id'],
                }]
            }, {
                association: SurveyModel.associations.RespondentProfileModel,
                attributes: ['id'],
                include: [{
                    association: RespondentProfileModel.associations.AccountModel,
                    attributes: ['email'],
                    where: {
                        uuid: respondentUuid,
                    }
                }],
            }],
        });
        if (!survey) {
            throw new SurveyNotFoundError();
        }

        if (userCompanyId !== survey.Project.Company.id) {
            throw new NotPermittedError();
        }

        if (survey.templateJson.surveyType) {
            //TODO if screening, add grade
        }

        const { templateJson } = survey;
        const { languages } = templateJson;
        const token = survey.RespondentProfiles[0].SurveyParticipant.token;

        const responsesData = await this.getSurveyResponsesForOneUserFromLimeSurvey(
            survey.id,
            token,
            languages,
        );
        const mappedResponses = this.mapLimeSurveyResponses(responsesData);

        return mappedResponses;
    };

    private getSurveyResponsesForOneUserFromLimeSurvey = async (
        surveyId: number,
        token: string,
        languages: string[],
    ) => {
        const responsesData = {};
        await this.limeSurveyAdapter.createSessionKey();
        for (const language of languages) {
            const encodedResponses = await this.limeSurveyAdapter.exportResponsesByToken(
                surveyId,
                token,
                language,
            );

            if (encodedResponses.status === 'No Data, could not get max id.') {
                responsesData[language] = [];
                continue;
            }

            responsesData[language] = JSON.parse(Buffer.from(encodedResponses, 'base64').toString('utf-8'));
        }
        await this.limeSurveyAdapter.releaseSessionKey();

        return responsesData;
    }
}