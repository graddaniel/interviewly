import { v4 as generateUuidV4 } from 'uuid';

import CompanyModel from '../../models/company';
import TemplateModel from '../../models/template';
import NotPermittedError from '../../generic/not-permitted-error';

import type CompaniesService from '../companies-service/companies-service';
import NotFoundError from '../../generic/not-found-error';


export default class TemplatesService {
    companiesService: CompaniesService;

    constructor(companiesService: CompaniesService) {
        this.companiesService = companiesService;
    }

    getCompanyAndPublicTemplates = async (
        companyUuid: string,
    ) => {
        const companyAndPublicTemplates = await TemplateModel.findAll({
            attributes: [
                "uuid",
                "name",
                "isPrivate",
                "CompanyId"
            ],
            include: [{
                model: CompanyModel,
                where: {
                    uuid: companyUuid,
                },
                required: false,
                attributes: [],
            }],
        });

        return companyAndPublicTemplates.map((t: any) => {
            return {
                uuid: t.uuid,
                name: t.name,
                isPrivate: t.isPrivate,
            }
        });
    }

    createNewTemplate = async (
        template: any,
        companyUuid: string,
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        await TemplateModel.create({
            uuid: generateUuidV4(),
            name: template.name,
            templateJson: template,
            CompanyId: company.id,
        });
    }

    getOneTemplate = async (
        templateUuid: string,
        companyUuid: string,
    ) => {
        const template = await TemplateModel.findOne({
            attributes: [
                'templateJson',
            ],
            where: {
                uuid: templateUuid,
            },
        });

        if (!template) {
            throw new NotFoundError('Template not found.');
        }

        const templatesCompany = await template.getCompany();
        if (templatesCompany && templatesCompany.uuid !== companyUuid) {
            throw new NotPermittedError('Not permitted to access this template.');
        }

        return template.templateJson;
    }

    editTemplate = async (
        templateUuid: string,
        templateData: any,
        companyUuid: string,
    ) => {
        const template = await TemplateModel.findOne({
            attributes: [
                'id',
                'name',
                'templateJson',
            ],
            where: {
                uuid: templateUuid,
            },
        });

        if (!template) {
            throw new NotFoundError('Template not found.');
        }

        const templatesCompany = await template.getCompany();
        if (templatesCompany && templatesCompany.uuid !== companyUuid) {
            throw new NotPermittedError('Not permitted to modify this template.');
        }

        template.name = templateData.name;
        template.templateJson = templateData;
        await template.save();
    }
}