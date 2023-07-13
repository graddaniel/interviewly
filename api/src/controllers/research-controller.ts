import { StatusCodes } from 'http-status-codes';
import { ResearchTypes } from 'shared';

import ResearchValidator from './validators/research-validator';

import type { Response } from 'express';

import type { AuthenticatedRequest } from '../generic/types';
import type ResearchService from '../services/research-service/research-service';


export default class ResearchController {
    researchService: ResearchService;

    constructor(researchService: ResearchService) {
        this.researchService = researchService;
    }

    getAllResearch = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const allCompanysResearch = await this.researchService.getAllResearchOfUser(currentUserUuid);

        res.status(StatusCodes.OK).send(allCompanysResearch);
    }

    createResearch = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: currentUserUuid,
        } = req.currentUser;

        const {
            title,
        } = req.body;

        await ResearchValidator.validateNewResearch({ title });

        const research = await this.researchService.createNewResearch(currentUserUuid, title);

        res.status(StatusCodes.CREATED).send(research.uuid);
    }

    getOneResearch = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const {
            researchId: researchUuid,
        } = req.params;

        const allCompanysResearch = await this.researchService.getResearch(companyUuid, researchUuid);

        res.status(StatusCodes.OK).send(allCompanysResearch);
    }

    updateResearch = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const { researchId } = req.params;

        const {
            step: stepString,
            ...formData
        } = req.body;

        //@ts-ignore
        const file = req.file;

        const step = parseInt(stepString, 10) as ResearchTypes.EditSteps;

        await ResearchValidator.validateEditResearchStep(step);
        await ResearchValidator.validateEditResearch(step, formData);

        await this.researchService.updateResearch(companyUuid, researchId, formData);

        res.status(StatusCodes.OK).send();
    }

    addSurveyToResearch = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        console.log("SURVEY", req.body);
        const { researchId } = req.params;

        await this.researchService.addSurveyToResearch(researchId, req.body);

        res.status(StatusCodes.OK).send();
    }
}