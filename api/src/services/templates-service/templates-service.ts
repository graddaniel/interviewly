import { v4 as generateUuidV4 } from 'uuid';

import TemplateModel from '../../models/template';
import NotPermittedError from '../../generic/not-permitted-error';
import TemplateNotFoundError from './errors/template-not-found-error';
import SequelizeConnection from '../sequelize-connection';

import type CompaniesService from '../companies-service/companies-service';
import { QueryTypes } from 'sequelize';


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
        const sequelize = SequelizeConnection.instance();

        // with associations the condition is put to ON,
        // which makes it impossible to achieve desired result
        const companyAndPublicTemplates = await sequelize.query(`\
SELECT templates.uuid, templates.name, IF(company_id is NULL, FALSE, TRUE) as isPrivate \
FROM templates \
LEFT JOIN companies ON templates.company_id = companies.id \
WHERE companies.uuid = '${companyUuid}' OR companies.uuid IS NULL;`,
{ type: QueryTypes.SELECT });

        return companyAndPublicTemplates;
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