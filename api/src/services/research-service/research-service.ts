import ResearchModel from '../../models/research'
import ResearchNotFoundError from './errors/research-not-found-error';
import { v4 as generateUuidV4 } from 'uuid';

import type AccountsService from '../accounts-service/accounts-service';
import type CompaniesService from '../companies-service/companies-service';
import type LimeSurveyAdapter from '../lime-survey-adapter';
import type LSQBuilder from '../lsq-builder';


export default class ResearchService {
    accountsService: AccountsService;
    companiesService: CompaniesService;
    limeSurveyAdapter: LimeSurveyAdapter;
    lsqBuilder: LSQBuilder;

    constructor (
        accountsService: AccountsService,
        companiesService: CompaniesService,
        limeSurveyAdapter: LimeSurveyAdapter,
        lsqBuilder: LSQBuilder,
    ) {
        this.accountsService = accountsService;
        this.companiesService = companiesService;
        this.limeSurveyAdapter = limeSurveyAdapter;
        this.lsqBuilder = lsqBuilder;
    }

    //TODO no need to find the company by user when we have its uuid
    createNewResearch = async (
        currentUserUuid: string,
        title: string,
    ): Promise<ResearchModel> => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        //@ts-ignore
        const company = await account.RecruiterProfile.getCompany();

        const research = await ResearchModel.create({
            title,
            uuid: generateUuidV4(),
            CompanyId: company.id,
        }, {
            include: [ResearchModel.associations.Company]
        });

        return research;
    }

    getResearch = async (
        companyUuid: string,
        researchUuid: string,
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        const research = await ResearchModel.findOne({
            attributes: ['uuid', 'title', 'description',
                'methodology', 'participantsCount', 'meetingDuration',
                'participantsPaymentCurrency', 'participantsPaymentValue'],
            where: {
                uuid: researchUuid,
                CompanyId: company.id,
            },
        });

        if (!research) {
            throw new ResearchNotFoundError();
        }

        //TODO check if thr user despite belonging to the company has also access to the research

        return research;
    }

    //TODO no need to find the company by user when we have its uuid
    getAllResearchOfUser = async (
        currentUserUuid: string,
    ): Promise<ResearchModel[]> => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        //@ts-ignore
        const company = await account.RecruiterProfile.getCompany();

        const allResearch = await ResearchModel.findAll({
            attributes: ['uuid', 'title', 'methodology'],
            where: {
                CompanyId: company.id,
            },
        });

        //TODO check also if the user when not an admin, can access this research

        return allResearch;
    }

    updateResearch = async (
        companyUuid,
        researchUuid,
        newResearchData
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        const research = await ResearchModel.findOne({
            where: {
                uuid: researchUuid,
                CompanyId: company.id,
            },
        });

        if (!research) {
            throw new ResearchNotFoundError();
        }

        await research.update(newResearchData);

        await research.save();

        //TODO check if user belongs to the research and if has admin role

        //TODO check if research is in draft mode
    }

    addSurveyToResearch = async (researchId, surveyTemplate) => {
        const {
            name,
            languages,
            questions,
        } = surveyTemplate;

        const firstLanguage = languages.splice(0, 1)[0];

        await this.limeSurveyAdapter.createSessionKey();

        const surveyId = await this.limeSurveyAdapter.addSurvey(0, name, firstLanguage);

        for (const language of languages) {
            await this.limeSurveyAdapter.addLanguage(surveyId, language);
        }

        const groupId = await this.limeSurveyAdapter.addGroup(surveyId, '');

        if (!questions) {
            console.log("No questions");
        } else {
            for (const question of questions) {
                const questionParams = {
                    type: question.type,
                    title: question.code,
                    relevance: '1',
                    question: question.text,
                    languages: Object.keys(question.text),
                    qid: '999',
                    parent_qid: '0',
                    sid: surveyId,
                    gid: groupId,
                };
            
                const extraParams = {
                    type: 'T',
                    parent_qid: '999',
                    sid: surveyId,
                    gid: groupId,
                };
    
                const lsqCode = this.lsqBuilder.buildLSQ(
                    questionParams,
                    extraParams, {
                    checkboxes: question.answers?.map(a => a.text),
                    dropdowns: question.answers?.map(a => a.text),
                });

                const encodedLsqCode = Buffer.from(lsqCode, 'utf8').toString('base64');

                console.log(lsqCode)
    
                await this.limeSurveyAdapter.questionImport(
                    surveyId,
                    groupId,
                    encodedLsqCode,
                    question.obligatory
                );
            }
        }

        await this.limeSurveyAdapter.releaseSessionKey();
    }
}