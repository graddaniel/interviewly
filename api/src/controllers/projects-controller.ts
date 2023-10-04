import { StatusCodes } from 'http-status-codes';
import { AccountTypes, ProfileTypes, ProjectTypes } from 'shared';

import ProjectValidator from './validators/project-validator';

import type { Response } from 'express';

import type { AuthenticatedRequest } from '../generic/types';
import type ProjectsService from '../services/projects-service/projects-service';
import BulletinBoardsService from '../services/bulletin-boards-service/bulletin-boards-service';
import BulletinBoardValidator from './validators/bulletin-board-validator';


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
            type: currentUserType,
            role: currentUserRole,
            companyUuid: currentuserCompanyUuid,
        } = req.currentUser;

        const {
            userUuid,
        } = req.query;

        let projects: any[] = [];
        if (currentUserType === AccountTypes.Type.RESPONDENT) {
            projects = await this.projectsService.getAllProjectsOfUser(currentUserUuid);
        } else if (
            (currentUserRole === ProfileTypes.Role.Admin
                || currentUserRole === ProfileTypes.Role.InterviewlyStaff)
            && !userUuid
        ) {
            projects = await this.projectsService.getAllProjectsOfCompany(currentuserCompanyUuid);
        } else if (
            (currentUserRole === ProfileTypes.Role.Admin
                || currentUserRole === ProfileTypes.Role.InterviewlyStaff)
            && userUuid) {
            //TODO check if userUuid belongs to admin's companys
            projects = await this.projectsService.getAllProjectsOfUser(userUuid as string);
        } else if (currentUserRole === ProfileTypes.Role.Observer
            || currentUserRole === ProfileTypes.Role.Moderator) {
            projects = await this.projectsService.getAllProjectsOfUser(currentUserUuid); 
        }

        res.status(StatusCodes.OK).send(projects);
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

        let project: any = null;
        if (type === AccountTypes.Type.RECRUITER) {
            project = await this.projectsService.getOneRecruiterProject(uuid, companyUuid, projectUuid);
        } else {
            project = await this.projectsService.getOneRespondentProject(uuid, projectUuid);
        }

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
        if (step === ProjectTypes.EditSteps.Summary) {
            await this.projectsService.setProjectStatus(
                companyUuid,
                projectId,
                ProjectTypes.Status.AwaitingPayment,
            );
        } else {
            await this.projectsService.updateProject(companyUuid, projectId, formData);
        }

        res.status(StatusCodes.OK).send();
    }

    markProjectAsPaid = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { projectId } = req.params;

        const {
            companyUuid,
        } = req.currentUser;

        await this.projectsService.setProjectStatus(
            companyUuid,
            projectId,
            ProjectTypes.Status.New,
        );

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
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        //TODO validate both uuids

        await this.projectsService.addSurveyToProject(
            currentUserUuid,
            templateUuid,
            new Date(parseInt(startDateString, 10)),
            new Date(parseInt(endDateString, 10)),
            projectId,
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

    putProjectRespondentMeeting = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const {
            projectId: projectUuid,
            respondentId: respondentAccountUuid,
        } = req.params;

        const {
            meetingDate,
        } = req.body;

        const surveyResponses = await this.projectsService.createOrUpdateMeeting(
            currentUserUuid,
            projectUuid,
            respondentAccountUuid,
            new Date(parseInt(meetingDate, 10)),
        );

        res.status(StatusCodes.OK).send(surveyResponses);
    }

    getProjectMeetings = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { uuid: currentUserUuid } = req.currentUser;
        const { projectId } = req.params;

        const projectMeetings = await this.projectsService.getProjectMeetings(
            projectId,
            currentUserUuid,
        );

        res.status(StatusCodes.OK).send(projectMeetings);
    }

    postBulletinBoardRoom = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            projectId,
            bulletinBoardId,
        } = req.params;
        
        const {
            roomName,
            respondentUuids,
        } = req.body;

        const { uuid } = req.currentUser;

        await BulletinBoardValidator.validateNewRoom({ roomName });

        await this.projectsService.createBulletinBoardRoom(
            uuid,
            projectId,
            bulletinBoardId,
            roomName,
            respondentUuids,
        );

        res.status(StatusCodes.CREATED).send();
    }

    getBulletinBoardRoom = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            projectId,
            roomId,
        } = req.params;

        const { uuid } = req.currentUser;

        const room = await this.projectsService.getBulletinBoardRoom(
            uuid,
            projectId,
            roomId,
        );

        res.status(StatusCodes.OK).send(room);
    }

    postBulletinBoardRoomThread = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            projectId,
            roomId,
        } = req.params;
        
        const {
            message
        } = req.body;

        const { uuid } = req.currentUser;

        await BulletinBoardValidator.validateMessage({ message });

        await this.projectsService.createBulletinBoardRoomThread(
            uuid,
            projectId,
            roomId,
            message
        );

        res.status(StatusCodes.CREATED).send();
    }

    postBulletinBoardResponse = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            projectId,
            threadId,
        } = req.params;
        
        const {
            message,
        } = req.body;

        const { uuid } = req.currentUser;

        await BulletinBoardValidator.validateMessage({ message });

        await this.projectsService.createBulletinBoardResponse(
            uuid,
            projectId,
            threadId,
            message,
        );

        res.status(StatusCodes.CREATED).send();
    }
}