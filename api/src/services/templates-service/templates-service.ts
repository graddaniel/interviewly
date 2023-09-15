import { v4 as generateUuidV4 } from 'uuid';

import CompanyModel from '../../models/company';
import TemplateModel from '../../models/template';
import NotPermittedError from '../../generic/not-permitted-error';
import TemplateNotFoundError from './errors/template-not-found-error';

import type CompaniesService from '../companies-service/companies-service';


export default class TemplatesService {
    companiesService: CompaniesService;

    constructor(companiesService: CompaniesService) {
        this.companiesService = companiesService;
    }

    getTemplate = async (query: any) => {
        const template = await TemplateModel.findOne({
            where: query,
        });

        if (!template) {
            throw new TemplateNotFoundError();
        }

        return template;
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
        templateData: any,
        companyUuid: string,
    ) => {
        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        const {
            surveyType,
            ...template
        } = templateData;

        await TemplateModel.create({
            uuid: generateUuidV4(),
            name: template.name,
            templateJson: template,
            surveyType,
            CompanyId: company.id,
        });
    }

    getOneTemplate = async (
        templateUuid: string,
        companyUuid: string,
    ) => {
        const template = await this.getTemplate({ uuid: templateUuid });

        const templatesCompany = await template.getCompany();
        if (templatesCompany && templatesCompany.uuid !== companyUuid) {
            throw new NotPermittedError('Not permitted to access this template.');
        }

        return {
            template: template.templateJson,
            surveyType: template.surveyType,
        };
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
            throw new TemplateNotFoundError();
        }

        const templatesCompany = await template.getCompany();
        if (templatesCompany && templatesCompany.uuid !== companyUuid) {
            throw new NotPermittedError('Not permitted to modify this template.');
        }

        template.name = templateData.name;
        template.templateJson = templateData;
        template.surveyType = templateData.surveyType;
        await template.save();
    }
}