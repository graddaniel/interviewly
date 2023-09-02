import type { Response } from 'express'
import { StatusCodes } from 'http-status-codes';

import type AccountsService from '../services/accounts-service/accounts-service';
import type { AuthenticatedRequest } from '../generic/types'
import type CompaniesService from '../services/companies-service/companies-service';
import AccountsValidator from './validators/accounts-validator';
import { ProfileTypes } from 'shared';
import NotPermittedError from '../generic/not-permitted-error';
import CompaniesValidator from './validators/comapnies-validator';


export default class CompaniesController {
    private accountsService: AccountsService;
    private companiesService: CompaniesService;

    constructor(
        accountsService: AccountsService,
        companiesService: CompaniesService
    ) {
        this.accountsService = accountsService;
        this.companiesService = companiesService;
    }

    getCompany = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { companyUuid } = req.currentUser;

        const company = await this.companiesService.getCompanyDetails(companyUuid);

        res.status(StatusCodes.OK).send(company);
    }

    editCompany = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
        } = req.currentUser;

        const companyDetails = req.body;

        const validatedCompanyDetails =
            await CompaniesValidator.validateCompanyDetails(companyDetails);

        const company = await this.companiesService.editCompanyDetails(
            companyUuid,
            validatedCompanyDetails,
        );

        res.status(StatusCodes.OK).send(company);
    }

    getCompanysAccounts = async (
        req: AuthenticatedRequest,
        res: Response
    ) => {
        const { companyUuid } = req.currentUser;

        const accounts = await this.companiesService.getCompanyAccounts(companyUuid);

        res.status(StatusCodes.OK).send(accounts);
    }

    createCompanysAccount = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            companyUuid,
            role: currentUserRole
        } = req.currentUser;

        const {
            name,
            surname,
            email,
            gender,
            role,
            status,
        } = req.body;

        const { language = 'en' } = req.query;
        //TODO this business logic leaks out of the services; refactor this in future
        //TODO validate language
        if (currentUserRole !== ProfileTypes.Role.InterviewlyStaff
            && role === ProfileTypes.Role.InterviewlyStaff) {
            throw new NotPermittedError();
        }

        await AccountsValidator.validateNewCompanyAccount({
            name,
            surname,
            email,
            gender,
            role,
            status,
        });

        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        await this.accountsService.createRecruiterAccount({
            email,
            name,
            surname,
            gender,
            newsletter: false,
            role,
            status,
            company,
            language: language as string,
        });

        res.status(StatusCodes.CREATED).send();
    }

    editCompanysAccount = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { role: currentUserRole } = req.currentUser;

        const {
            uuid,
            role,
            status,
            projects,
        } = req.body;

        await AccountsValidator.validateEditedCompanyAccount({
            role,
            status,
        });

        await this.accountsService.editRecruiterAccount(
            currentUserRole,
            uuid,
            role,
            status,
            projects,
        );

        res.status(StatusCodes.OK).send();
    }
}