import { StatusCodes } from 'http-status-codes';
import { ProjectTypes } from 'shared';

import TemplatesValidator from './validators/templates-validator';

import type { Response } from 'express';

import type { AuthenticatedRequest } from '../generic/types';
import type TemplatesService from '../services/templates-service/templates-service';


export default class TemplatesController {
    templatesService: TemplatesService;

    constructor(templatesService: TemplatesService) {
        this.templatesService = templatesService;
    }

    getTemplates = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const allCompanysProjects = 
            await this.templatesService.getCompanyAndPublicTemplates(
                companyUuid,
            );

        res.status(StatusCodes.OK).send(allCompanysProjects);
    };

    postTemplate = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const template = req.body;

        console.log(template)

        //TODO await TemplatesValidator.validateNewTemplate

        await this.templatesService.createNewTemplate(
            template,
            companyUuid,
        );

        res.status(StatusCodes.CREATED).send();
    };

    getTemplate = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const { templateId } = req.params;

        //await TemplatesValidator.validateNewTemplate

        const templateData = await this.templatesService.getOneTemplate(
            templateId,
            companyUuid,
        );

        res.status(StatusCodes.OK).send(templateData);
    };

    patchTemplate = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const { templateId } = req.params;

        const template = req.body;

        console.log(template)

        //await TemplatesValidator.validateEditTemplate

        await this.templatesService.editTemplate(
            templateId,
            template,
            companyUuid,
        );

        res.status(StatusCodes.OK).send();
    }
}