import { StatusCodes } from 'http-status-codes';
import { AccountTypes, ProjectTypes } from 'shared';

import ProjectValidator from './validators/project-validator';

import type { Response } from 'express';

import type { AuthenticatedRequest } from '../generic/types';
import type ProjectsService from '../services/projects-service/projects-service';


export default class ProjectsController {
    projectsService: ProjectsService;

    constructor(
        projectsService: ProjectsService,
    ) {
        this.projectsService = projectsService;
    }

    getAllProjects = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const allCompanysProjects = await this.projectsService.getAllProjectsOfUser(currentUserUuid);

        res.status(StatusCodes.OK).send(allCompanysProjects);
    }

    createProject = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const {
            title,
        } = req.body;

        await ProjectValidator.validateNewProject({ title });

        const project = await this.projectsService.createNewProject(currentUserUuid, title);

        res.status(StatusCodes.CREATED).send(project.uuid);
    }

    getOneProject = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
            type,
            uuid,
        } = req.currentUser;

        const {
            projectId: projectUuid,
        } = req.params;

        const project = type === AccountTypes.Type.RECRUITER
            ? await this.projectsService.getOneCompanyProject(companyUuid, projectUuid)
            : await this.projectsService.getOneRespondentProject(uuid, projectUuid)

        res.status(StatusCodes.OK).send(
            type === AccountTypes.Type.RECRUITER
            ? this.projectsService.flattenCompanyProjectDetails(project)
            : this.projectsService.flattenRespondentProjectDetails(project),
        );
    }

    updateProject = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const { projectId } = req.params;

        const {
            step: stepString,
            ...formData
        } = req.body;

        const step = parseInt(stepString, 10) as ProjectTypes.EditSteps;

        await ProjectValidator.validateEditProjectStep(step);
        await ProjectValidator.validateEditProject(step, formData);

        if (step === ProjectTypes.EditSteps.Respondents) {
            for (const param of [
                'addLanguageTest',
                'addScreeningSurvey',
                'requireCandidateRecording'
            ]) {
                formData[param] = formData[param] === 'true' ? true : false;
            }

            if (formData.respondents) {
                formData.respondents = JSON.parse(formData.respondents);
            }
        } else if (step === ProjectTypes.EditSteps.Details) {
            for (const param of [
                'transcriptionNeeded',
                'moderatorNeeded',
            ]) {
                formData[param] = formData[param] === 'true' ? true : false;
            }

            for (const param of [
                'startDate',
                'endDate',
            ]) {
                formData[param] = new Date(parseInt(formData[param], 10));
            }
        }

        console.log("FORM DATA", formData, step)

        await this.projectsService.updateProject(companyUuid, projectId, formData);

        res.status(StatusCodes.OK).send();
    }

    addSurveyToProject = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { projectId } = req.params;
        const {
            templateUuid,
            startDate: startDateString,
            endDate: endDateString,
         } = req.body;

        //TODO validate both uuids

        await this.projectsService.addSurveyToProject(
            templateUuid,
            new Date(parseInt(startDateString, 10)),
            new Date(parseInt(endDateString, 10)),
            projectId
        );

        res.status(StatusCodes.OK).send();
    }

    getProjectRespondent = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { projectId, respondentId } = req.params;

        //TODO validate both uuids

        const projectRespondent = await this.projectsService.getProjectRespondent(
            projectId,
            respondentId,
        );

        res.status(StatusCodes.OK).send(projectRespondent);
    }
}