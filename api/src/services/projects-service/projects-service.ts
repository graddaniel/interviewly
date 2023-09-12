import { v4 as generateUuidV4 } from 'uuid';
import { AccountTypes, ProfileTypes, ProjectTypes } from 'shared';

import RespondentProfileModel from '../../models/respondent-profile';
import ProjectModel from '../../models/project'
import ProjectNotFoundError from './errors/project-not-found-error';

import type AccountsService from '../accounts-service/accounts-service';
import type CompaniesService from '../companies-service/companies-service';
import type LimeSurveyAdapter from '../lime-survey-adapter';
import type LSQBuilder from '../lsq-builder';
import TemplatesService from '../templates-service/templates-service';
import SurveyModel from '../../models/survey';
import SurveyParticipantModel from '../../models/survey-participant';

import type AccountModel from '../../models/account';
import moment from 'moment';
import config from 'config';
import SequelizeConnection from '../sequelize-connection';
import { MeetingModel } from '../../models';
import RespondentDoesNotBelongToProjectError from './errors/respondent-does-not-belong-to-project-error';
import NoDurationError from './errors/no-duration-error';
import NotPermittedError from '../../generic/not-permitted-error';
import S3Adapter from '../s3-adapter';
import SurveysService from '../surveys-service/surveys-service';
import MeetingFinishedError from '../meetings-service/errors/meeting-finished-error';
import ProjectNoLongerEditableError from './errors/project-no-longer-editable';
import ProjectValidator from '../../controllers/validators/project-validator';
import IncompleteProjectDraftError from './errors/incomplete-project-draft-error';
import IncorrectProjectStatusError from './errors/incorrect-proejct-status-error';
import { getCVBucketKeyByEmail } from '../../utils'; 

type LimesurveyConfig = {
    url: string;
};

type RespondentFileEntry = {
    email: string;
    language: string
};

export default class ProjectsService {
    accountsService: AccountsService;
    companiesService: CompaniesService;
    templatesService: TemplatesService;
    surveysService: SurveysService;
    limeSurveyAdapter: LimeSurveyAdapter;
    lsqBuilder: LSQBuilder;
    limeSurveyUrl: string;
    s3Adapter: S3Adapter;

    recordingsBucketName: string;
    transcriptionsBucketName: string;
    cvBucketName: string;

    constructor (
        accountsService: AccountsService,
        companiesService: CompaniesService,
        templatesService: TemplatesService,
        surveysService: SurveysService,
        limeSurveyAdapter: LimeSurveyAdapter,
        lsqBuilder: LSQBuilder,
        s3Adapter: S3Adapter,
    ) {
        this.accountsService = accountsService;
        this.companiesService = companiesService;
        this.templatesService = templatesService;
        this.surveysService = surveysService;
        this.limeSurveyAdapter = limeSurveyAdapter;
        this.lsqBuilder = lsqBuilder;
        this.s3Adapter = s3Adapter;

        const limesurveyConfig = config.get('limesurvey') as LimesurveyConfig;
        this.limeSurveyUrl = limesurveyConfig.url;

        this.recordingsBucketName = config.get('s3.recordingsBucket');
        this.transcriptionsBucketName = config.get('s3.transcriptionsBucket');

        this.cvBucketName = config.get('s3.cvBucket');
    }

    //TODO no need to find the company by user when we have its uuid
    createNewProject = async (
        currentUserUuid: string,
        title: string,
    ): Promise<ProjectModel> => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        //@ts-ignore
        const company = await account.RecruiterProfile.getCompany();

        const project = await ProjectModel.create({
            title,
            uuid: generateUuidV4(),
            CompanyId: company.id,
        }, {
            include: [ProjectModel.associations.Company]
        });

        return project;
    }

    getProject = async (query: any) => {
        const project = await ProjectModel.findOne({
            where: query,
            include: [{
                association: ProjectModel.associations.RespondentProfileModel,
                include: [{
                    association: RespondentProfileModel.associations.AccountModel,
                }],
            }]
        });

        if (!project) {
            throw new ProjectNotFoundError();
        }

        return project;
    }

    getOneCompanyProject = async (
        companyUuid: string,
        projectUuid: string,
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        const project = await ProjectModel.findOne({
            attributes: ['id', 'uuid', 'title', 'description', 'methodology', 'status',
                'participantsCount', 'reserveParticipantsCount', 'meetingDuration',
                'participantsPaymentCurrency', 'participantsPaymentValue',
                'startDate', 'endDate', 'otherRequirements',
                'addLanguageTest', 'addScreeningSurvey', 'requireCandidateRecording',
                'transcriptionNeeded', 'moderatorNeeded'
            ],
            where: {
                uuid: projectUuid,
                CompanyId: company.id,
            },
            include: [{
                association: ProjectModel.associations.RespondentProfileModel,
                attributes: [
                    'name',
                    'surname',
                    'gender',
                ],
                include: [{
                    association: RespondentProfileModel.associations.AccountModel,
                    attributes: ['email', 'uuid'],
                }],
            }, {
                association: ProjectModel.associations.SurveyModel,
                attributes: [
                    'uuid',
                    'name',
                    'startDate',
                    'endDate',
                ],
            }]
        });

        if (!project) {
            throw new ProjectNotFoundError();
        }

        //TODO check if thr user despite belonging to the company has also access to the project

        return project;
    }

    getOneRecruiterProject = async (
        recruiterUuid: string,
        recruiterRole: ProfileTypes.Role,
        companyUuid: string,
        projectUuid: string,
    ) => {
        if ([ProfileTypes.Role.Moderator,
            ProfileTypes.Role.Observer,
            ProfileTypes.Role.Translator,
        ].includes(recruiterRole)) {
            const recruiterAccount = await this.accountsService.getAccount({
                uuid: recruiterUuid,
            });
    
            const projects = await recruiterAccount.RecruiterProfile.getProjects({
                where: {
                    uuid: projectUuid,
                }
            });

            const userHasAccess = projects.length > 0;
            if (!userHasAccess) {
                throw new NotPermittedError();
            }
        }

        const project = await this.getOneCompanyProject(
            companyUuid,
            projectUuid,
        );

        await this.checkAndUpdateProjectStatus(project);

        return project;
    }

    getOneRespondentProject = async (
        uuid: string,
        projectUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid });
        //@ts-ignore
        const respondentProfile = await account.getRespondentProfile();

        const project = await ProjectModel.findOne({
            attributes: [
                'id', 'uuid', 'title', 'description', 'methodology',
                'startDate', 'endDate', 'status',
            ],
            where: {
                uuid: projectUuid,
            },
            include: [{
                association: ProjectModel.associations.RespondentProfileModel,
                attributes: ['id'],
                where: {
                    id: respondentProfile.id,
                },
            }]
        });

        if (!project) {
            throw new ProjectNotFoundError();
        }

        await this.checkAndUpdateProjectStatus(project);

        //TODO exclude inactive surveys
        const surveys = await SurveyModel.findAll({
            attributes: [
                'uuid',
                'name',
                'startDate',
                'endDate',
            ],
            include: [{
                association: SurveyModel.associations.ProjectModel,
                attributes: ['id'],
                where: {
                    id: project.id,
                }
            }, {
                association: SurveyModel.associations.SurveyParticipantModel,
                attributes: ['hasFinished', 'token', 'SurveyId'],
                where: {
                    RespondentProfileId: respondentProfile.id,
                }
            }]
        });

        const projectInfo = {
            ...project.toJSON(),
            surveys,
        }

        //TODO check if thr user has access to the project

        return projectInfo;
    }

    flattenCompanyProjectDetails = (projectModel) => {
        const project = projectModel.toJSON();

        const {
            RespondentProfiles: respondentProfiles,
            Surveys: surveys,
            ...projectData
        } = project;

        const flattenedRespondentProfiles = respondentProfiles.map(r => {
            const {
                Account: account,
                ProjectsRespondents, //discard
                ...respondentData
            } = r;
            
            return {
                ...respondentData,
                ...account,
            };
        });
        
        return {
            ...projectData,
            respondents: flattenedRespondentProfiles,
            surveys,
        };
    }
    
    flattenRespondentProjectDetails = (project) => {
        const {
            RespondentProfiles: respondentProfiles,
            surveys,
            ...projectData
        } = project;

        return {
            ...projectData,
            surveys: surveys.map(survey => {
                const {
                    Project,
                    SurveyParticipants,
                    ...rest
                } = survey.toJSON();

                const allowToTakeSurvey = moment().isBefore(rest.endDate)
                    && !SurveyParticipants[0].hasFinished;

                const participantInfo = {
                    hasFinished: SurveyParticipants[0].hasFinished,
                    token: SurveyParticipants[0].token,
                    id: SurveyParticipants[0].SurveyId,
                    url: allowToTakeSurvey
                        ? `${this.limeSurveyUrl}/${SurveyParticipants[0].SurveyId}?token=${SurveyParticipants[0].token}`
                        : null,
                };

                return {
                    ...rest,
                    ...participantInfo,
                };
            }).filter(survey => moment().isAfter(survey.startDate)),
        };
    }

    //TODO no need to find the company by user when we have its uuid
    getAllProjectsOfUser = async (
        currentUserUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        let projects: ProjectModel[] = [];
        switch (account.type) {
            case AccountTypes.Type.RECRUITER:
                projects = await this.getAllProjectsOfRecruiter(account);
                break;
            case AccountTypes.Type.RESPONDENT:
                projects = await this.getAllProjectsOfRespondent(account);
                break;
        }        

        const mappedProjects = projects
            .map(p => p.toJSON())
            .map(({ id, ...project }) => ({ ...project }));

        return mappedProjects;
    }

    getAllProjectsOfCompany = async (
        companyUuid: string,
    ) => {
        const projects = await ProjectModel.findAll({
            order: [['startDate', 'DESC']],
            attributes: ['id', 'uuid', 'title', 'methodology', 'startDate', 'endDate', 'status'],
            include: [{
                association: ProjectModel.associations.CompanyModel,
                where: {
                    uuid: companyUuid,
                }
            }],
        });

        const checkedProjects = await Promise.all(projects.map(
            this.checkAndUpdateProjectStatus
        ));

        const mappedProjects = checkedProjects
            .map(p => p.toJSON())
            .map(({ Company, id, ...project }) => ({ ...project }));

        return mappedProjects;
    }

    private getAllProjectsOfRecruiter = async (account: AccountModel) => {
        //@ts-ignore
        const company = await account.RecruiterProfile.getCompany();
        //check user access
        const searchCriteria: any = {
            order: [['startDate', 'DESC']],
            attributes: ['id', 'uuid', 'title', 'methodology', 'startDate', 'endDate', 'status'],
            where: {
                CompanyId: company.id,
            },
        };

        if ([
            ProfileTypes.Role.Moderator,
            ProfileTypes.Role.Observer,
            ProfileTypes.Role.Translator,
        ].includes(account.RecruiterProfile.role)) {
            searchCriteria.include = [{
                association: ProjectModel.associations.RecruiterProfileModel,
                where: { id: account.RecruiterProfile.id }
            }];
        }

        const projects = await ProjectModel.findAll(searchCriteria);

        return Promise.all(projects.map(this.checkAndUpdateProjectStatus));
    }

    private getAllProjectsOfRespondent = async (account: AccountModel) => {
        //@ts-ignore
        const respondentProfile = await account.getRespondentProfile();

        const projects = await ProjectModel.findAll({
            order: [['startDate', 'DESC']],
            attributes: ['id', 'uuid', 'title', 'methodology', 'startDate', 'endDate', 'status'],
            include: [{
                association: ProjectModel.associations.RespondentProfileModel,
                attributes: [],
                where: {
                    id: respondentProfile.id,
                }
            }],
        });

        return Promise.all(projects.map(this.checkAndUpdateProjectStatus));
    }

    checkAndUpdateProjectStatus = async (
        project: ProjectModel,
    ) => {
        const {
            startDate,
            endDate,
        } = project;

        // status reference may change below, thus we access it through project object
        if (
            project.status === ProjectTypes.Status.New
            && moment().isAfter(moment(startDate))
        ) {
            project.status = ProjectTypes.Status.InProgress;
        }
        
        if (
            project.status === ProjectTypes.Status.InProgress
            && moment().isAfter(moment(endDate))
        ) {
            project.status = ProjectTypes.Status.Finished;
        }

        if (project.changed()) {
            await project.save();
        }

        return project;
    }

    updateProject = async (
        companyUuid,
        projectUuid,
        projectData,
    ) => {
        const project = await this.getOneCompanyProject(companyUuid, projectUuid);

        if (project.status !== ProjectTypes.Status.Draft) {
            throw new ProjectNoLongerEditableError();
        }

        const {
            respondents: allRespondents,
            ...projectDetails
        } = projectData;

        if (allRespondents) {
            const newRespondents = await this.separateNewRespondentsFromExisting(allRespondents);
            await this.registerNewRespondents(newRespondents);

            const allRespondentsEmails = allRespondents.map(r => r.email);
            const allRespondentsProfiles = await RespondentProfileModel.findAll({
                include: [{
                    association: RespondentProfileModel.associations.AccountModel,
                    where: {
                        email: allRespondentsEmails,
                    }
                }]
            });

            await project.addRespondentProfiles(allRespondentsProfiles);
        }

        await project.update(projectDetails);

        await project.save();

        //TODO check if user belongs to the project and if has admin role
    }

    private separateNewRespondentsFromExisting = async (
        allRespondents: RespondentFileEntry[]
    ) => {
        return (await Promise.allSettled(
            allRespondents.map(
                async respondent => {
                    await this.accountsService.assertAccountDoesntExist({
                        email: respondent.email
                    });

                    return respondent;
                }
            )
        )).filter(({ status }) => status === 'fulfilled')
        .map(({ value }: PromiseFulfilledResult<any>) => value);
    }

    private registerNewRespondents = async (
        newRespondents: RespondentFileEntry[]
    ) => {
        const respondentsRegistrationPromises = newRespondents.map(
            respondent => this.accountsService.createRespondentAccount({
                email: respondent.email,
                name: '',
                surname: '',
                gender: ProfileTypes.Gender.MALE,
                newsletter: false,
                language: respondent.language || 'en',
                createdFromFile: true,
            })
        );

        await Promise.all(respondentsRegistrationPromises);
    }

    setProjectStatus = async (
        companyUuid: string,
        projectUuid: string,
        status: ProjectTypes.Status,
    ) => {
        const project = await this.getOneCompanyProject(
            companyUuid,
            projectUuid,
        );

        try {
            await ProjectValidator.validateCompleteProjectDraft(project);
        } catch (error) {
            throw new IncompleteProjectDraftError();
        }

        project.status = status;

        await project.save();
    }


    addSurveyToProject = SequelizeConnection.transaction(async (
        currentUserUuid: string,
        templateUuid: string,
        startDate: Date,
        endDate: Date,
        projectUuid: string,
    ) => {
        const surveyTemplate = await this.templatesService.getTemplate({ uuid: templateUuid });
        const project = await this.getProject({ uuid: projectUuid });

        const currentAccount = await this.accountsService.getAccount({
            uuid: currentUserUuid,
        });
        if (ProfileTypes.Role.Moderator === currentAccount.RecruiterProfile.role) {
            const currentUsersInTheProject = await project.getRecruiterProfiles({
                where: {
                    id: currentAccount.RecruiterProfile.id,
                }
            });

            if (currentUsersInTheProject.length < 1) {
                throw new NotPermittedError();
            }
        }

        if (![
            ProjectTypes.Status.New,
            ProjectTypes.Status.InProgress,
        ].includes(project.status)) {
            throw new IncorrectProjectStatusError();
        }

        const projectsRespondents = await this.getProjectsRespondents(projectUuid);

        const surveyInfo = await this.generateSurveyFromTemplateAndAddRespondents(
            surveyTemplate.templateJson,
            projectsRespondents,
        );

        const survey = await SurveyModel.create({
            id: surveyInfo.surveyId,
            uuid: generateUuidV4(),
            name: surveyTemplate.name,
            templateJson: surveyTemplate.templateJson,
            TemplateId: surveyTemplate.id,
            ProjectId: project.id,
            startDate,
            endDate,
        });

        await SurveyParticipantModel.bulkCreate(
            surveyInfo.respondents.map(respondent => ({
                RespondentProfileId: respondent.id,
                token: respondent.token,
                hasFinished: false,
                SurveyId: survey.id,
            }), {
                include: SurveyParticipantModel.associations.SurveyModel,
            })
        );
    })

    getProjectsRespondents = async (projectUuid: string) => {
        const project = await this.getProject({ uuid: projectUuid });

        return project
            .toJSON()
            .RespondentProfiles
            .map(r => ({
                ...r,
                email: r.Account.email,
            }));
    }

    generateSurveyFromTemplateAndAddRespondents = async (template: {
        name: string,
        languages: string[],
        questions: any[],
    }, respondents: {
        id: number,
        email: string,
    }[]) => {
        const {
            name,
            languages: inputLanguages,
            questions,
        } = template;
        const languages = [...inputLanguages];

        await this.limeSurveyAdapter.createSessionKey();

        const firstLanguage = languages.splice(0, 1)[0];
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
                    checkboxes: question.answers,
                    dropdowns: question.answers,
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


        await this.limeSurveyAdapter.activateTokens(surveyId);

        const respondentsWithTokens = await Promise.all(
            respondents.map(
                async respondent => {
                    const result = await this.limeSurveyAdapter.addParticipant(
                        surveyId,
                        respondent.email
                    );

                    return {
                        id: respondent.id,
                        email: respondent.email,
                        token: result[0].token,
                    }
                }
            )
        )

        await this.limeSurveyAdapter.activateSurvey(surveyId);

        await this.limeSurveyAdapter.releaseSessionKey();

        return {
            surveyId,
            respondents: respondentsWithTokens,
        }
    }

    getProjectRespondent = async (
        projectUuid: string,
        respondentUuid: string,
    ) => {
        //TODO check access to the project
        const project = await this.getProject({ uuid: projectUuid });

        const respondents = await project.getRespondentProfiles({
            attributes: [
                'name',
                'surname',
                'gender',
                'avatarUrl',
                'AccountId',
                'phoneNumber',
                'profession',
                'province',
                'specialization',
                'city',
                'martialStatus',
                'zipCode',
                'hasChildren',
                'street',
                'childrenCount',
                'hasUploadedCV',
            ],
            include: [{
                association: RespondentProfileModel.associations.AccountModel,
                attributes: [
                    'uuid',
                    'email',
                ],
                where: {
                    uuid: respondentUuid,
                }
            }, {
                association: RespondentProfileModel.associations.SurveyModel,
                through: {
                    attributes: [
                        'hasFinished',
                        'SurveyId',
                    ]
                },
                attributes: [
                    'uuid',
                    'name',
                ],
            }, {
                association: RespondentProfileModel.associations.MeetingModel,
                where: {
                    ProjectId: project.id,
                },
                required: false,
                attributes: [
                    'uuid',
                    'date',
                ],
            }],
        });

        const respondentProfile = respondents[0].toJSON();

        const flattenedRespondentProfile =
            this.flattenRespondentProfile(respondentProfile, project.toJSON());

        if (flattenedRespondentProfile.hasUploadedCV) {
            flattenedRespondentProfile.cvUrl = this.s3Adapter.getPresignedS3Url(
                this.cvBucketName,
                getCVBucketKeyByEmail(flattenedRespondentProfile.email)
            );
        }

        return flattenedRespondentProfile;
    }

    private flattenRespondentProfile = (respondentProfile: any, project: any) => {
        const {
            AccountId,
            Account,
            Surveys,
            ProjectsRespondents,
            Meetings: meetingsArray,
            ...repondentProfileAttributes
        } = respondentProfile;

        const { meetingDuration: duration } = project;
        
        let meeting: any = null;
        if (meetingsArray.length > 0) {
            meeting = meetingsArray[0];
            delete meeting.RespondentMeeting;
            meeting.duration = duration;
        }
        
        const flattenedSurveys = Surveys.map(survey => {
            const {
                SurveyParticipant,
                ...surveyAttributes
            } = survey;

            return {
                ...surveyAttributes,
                ...SurveyParticipant,
            };
        });

        return {
            ...repondentProfileAttributes,
            ...Account,
            surveys: flattenedSurveys,
            meeting,
        };
    };

    createOrUpdateMeeting = async (
        currentUserUuid: string,
        projectUuid: string,
        respondentAccountUuid: string,
        meetingDate: Date,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });
        const companyUuid = account.RecruiterProfile.Company.uuid as string;

        const project = await this.getOneCompanyProject(
            companyUuid,
            projectUuid,
        );

        const { RecruiterProfile: recruiterProfile } = account;
        if (![
            ProfileTypes.Role.InterviewlyStaff,
            ProfileTypes.Role.Admin,
        ].includes(recruiterProfile.role)) {
            const currentUsersInTheProject = await project.getRecruiterProfiles({
                where: {
                    id: account.RecruiterProfile.id,
                }
            });
    
            if (currentUsersInTheProject.length < 1) {
                throw new NotPermittedError();
            }
        }

        if (![
            ProjectTypes.Status.New,
            ProjectTypes.Status.InProgress,
        ].includes(project.status)) {
            throw new IncorrectProjectStatusError();
        }

        //TODO Check if this particular user has access to the project
        //should be done once accounts get assigned to projects

        const respondents = await project.getRespondentProfiles({
            attributes: ['id', 'AccountId'],
            include: [{
                association: RespondentProfileModel.associations.AccountModel,
                attributes: ['uuid'],
                where: {
                    uuid: respondentAccountUuid,
                }
            }],
        })
        if(!respondents || respondents.length < 1) {
            throw new RespondentDoesNotBelongToProjectError();
        }

        const respondent = respondents[0];
        const meetingDuration = project.meetingDuration;
        if (!meetingDuration) {
            throw new NoDurationError()
        }
        
        const meeting = await MeetingModel.findOne({
            include: [{
                association: MeetingModel.associations.ProjectModel,
                attributes: ['uuid'],
                where: {
                    uuid: projectUuid,
                },
            }, {
                association: MeetingModel.associations.RespondentProfileModel,
                attributes: ['id', 'AccountId'],
                include: [{
                    association: RespondentProfileModel.associations.AccountModel,
                    attributes: ['uuid'],
                    where: {
                        uuid: respondentAccountUuid,
                    }
                }]
            }],
        });

        if (meeting?.hasFinished) {
            throw new MeetingFinishedError();
        }

        if (!meeting) {
            const meeting = await MeetingModel.create({
                uuid: generateUuidV4(),
                date: new Date(meetingDate),
                ProjectId: project.id,
            });

            await meeting.addRespondentProfile(respondent);
        } else {
            meeting.date = meetingDate;

            await meeting.save();
        }
    }

    getOneMeeting = async (
        respondentUuid: string,
        projectUuid: string,
        companyUuid?: string,
    ) => {
        // TODO room url will be generated when meeting is fetched

        if (companyUuid) {
            await this.getOneCompanyProject(
                companyUuid,
                projectUuid,
            );
        }
        //TODO check access by this prticular recruiter account also

        const project = await this.getProject({ uuid: projectUuid });
        const respondents = await project.getRespondentProfiles({
            include: [{
                association: RespondentProfileModel.associations.AccountModel,
                where: {
                    uuid: respondentUuid,
                }
            }],
        });
        if(!respondents || respondents.length < 1) {
            throw new RespondentDoesNotBelongToProjectError();
        }

        const respondent = respondents[0];
        if (!respondent) {
            throw new NotPermittedError();
        }

        //@ts-ignore
        const meeting = await project.getMeeting({
            include: [{
                association: MeetingModel.associations.RespondentProfileId,
                where: {
                    id: respondent.id,
                }
            }],
        })

        return meeting;
    }

    getProjectMeetings = async (
        projectUuid: string,
        currentUserUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });
        const company = await account.RecruiterProfile.getCompany();

        const project = await ProjectModel.findOne({
            attributes: ['id', 'CompanyId'],
            where: {
                uuid: projectUuid,
            },
            include: [{
                association: ProjectModel.associations.CompanyModel,
                where: {
                    uuid: company.uuid,
                },
            }],
        });
        if (!project) {
            throw new ProjectNotFoundError();
        }

        const meetings = await project.getMeetings({
            include: [{
                attributes: ['name', 'surname', 'AccountId'],
                association: MeetingModel.associations.RespondentProfileModel,
                include: [{
                    attributes: ['uuid', 'startDate', 'endDate', 'name', 'ProjectId'],
                    association: RespondentProfileModel.associations.SurveyModel,
                    where: {
                        ProjectId: project.id
                    },
                    required: false,
                }, {
                    attributes: ['email', 'uuid'],
                    association: RespondentProfileModel.associations.AccountModel,
                }],
            }]
        });
        //console.log(meetings.map(m => m.RespondentProfiles[0].Surveys))

        const projectMeetings = await this.flattenProjectMeetings(meetings);
    
        return projectMeetings;
    }

    flattenProjectMeetings = async (meetings: MeetingModel[]) => {
        const flattenedMeetings = meetings.map(meeting => {
            const {
                uuid,
                date,
                hasFinished,
                recordingAvailable,
                transcriptionAvailable,
                RespondentProfiles,
            } = meeting;

            let respondent: any = null;
            if (RespondentProfiles.length > 0) {
                const respondentData = RespondentProfiles[0];

                const {
                    name,
                    surname,
                    Surveys: surveys,
                    Account: account,
                } = respondentData;

                respondent = {
                    uuid: account.uuid,
                    name,
                    surname,
                    email: account.email,
                    surveys: surveys.map(survey => {
                        const {
                            SurveyParticipant,
                            ...surveyData
                        } = survey.toJSON();

                        return {
                            ...surveyData,
                            hasFinished: SurveyParticipant.hasFinished,
                        };
                    }),
                };
            }
            

            return {
                uuid,
                date,
                hasFinished,
                recordingUrl: recordingAvailable
                    ? this.s3Adapter.getPresignedS3Url(
                        this.recordingsBucketName,
                        `${uuid}.mp4`,
                    )
                    : null,
                transcriptUrl: transcriptionAvailable
                ? this.s3Adapter.getPresignedS3Url(
                    this.transcriptionsBucketName,
                    `${uuid}.txt`,
                )
                : null,
                respondent,
            };
        });

        return flattenedMeetings;
    }
}