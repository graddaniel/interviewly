import ProjectModel from '../../models/project'
import ProjectNotFoundError from './errors/project-not-found-error';
import { v4 as generateUuidV4 } from 'uuid';

import type AccountsService from '../accounts-service/accounts-service';
import type CompaniesService from '../companies-service/companies-service';
import type LimeSurveyAdapter from '../lime-survey-adapter';
import type LSQBuilder from '../lsq-builder';


export default class ProjectsService {
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

    getProject = async (
        companyUuid: string,
        projectUuid: string,
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        const project = await ProjectModel.findOne({
            attributes: ['uuid', 'title', 'description', 'methodology',
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
        });

        if (!project) {
            throw new ProjectNotFoundError();
        }

        //TODO check if thr user despite belonging to the company has also access to the project

        return project;
    }

    //TODO no need to find the company by user when we have its uuid
    getAllProjectsOfUser = async (
        currentUserUuid: string,
    ): Promise<ProjectModel[]> => {
        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        //@ts-ignore
        const company = await account.RecruiterProfile.getCompany();

        const allProjects = await ProjectModel.findAll({
            attributes: ['uuid', 'title', 'methodology'],
            where: {
                CompanyId: company.id,
            },
        });

        //TODO check also if the user when not an admin, can access this project

        return allProjects;
    }

    updateProject = async (
        companyUuid,
        projectUuid,
        newProjectData
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        const project = await ProjectModel.findOne({
            where: {
                uuid: projectUuid,
                CompanyId: company.id,
            },
        });

        if (!project) {
            throw new ProjectNotFoundError();
        }

        await project.update(newProjectData);

        await project.save();

        //TODO check if user belongs to the project and if has admin role

        //TODO check if project is in draft mode
    }

    addSurveyToProject = async (projectId, surveyTemplate) => {
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

        await this.limeSurveyAdapter.releaseSessionKey();
    }
}