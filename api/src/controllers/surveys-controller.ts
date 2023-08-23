import { StatusCodes } from 'http-status-codes';
import { AccountTypes, ProjectTypes } from 'shared';

import ProjectValidator from './validators/project-validator';

import type { Response } from 'express';

import type { AuthenticatedRequest } from '../generic/types';
import type ProjectsService from '../services/projects-service/projects-service';
import SurveysService from '../services/surveys-service/surveys-service';


export default class SurveysController {
    surveysService: SurveysService;

    constructor(
        surveysService: SurveysService,
    ) {
        this.surveysService = surveysService;
    }

    getSurveyResponses = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const {
            surveyId,
        } = req.params;

        const surveyResponses = await this.surveysService.getAllRespondentsSurveyResponses(
            surveyId,
            currentUserUuid
        );

        res.status(StatusCodes.OK).send(surveyResponses);
    }

    getRespondentsSurveyResponses = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const {
            surveyId,
            respondentId,
        } = req.params;

        const surveyResponses = await this.surveysService.getOneRespondentSurveyResponses(
            surveyId,
            respondentId,
            currentUserUuid,
        );

        res.status(StatusCodes.OK).send(surveyResponses);
    }

    patchSurveyComplete = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const {
            surveyId,
        } = req.params;

        const completedSurveysProjectUuid = await this.surveysService.completeSurvey(
            surveyId,
            currentUserUuid
        );

        res.status(StatusCodes.OK).send(completedSurveysProjectUuid);
    }
}