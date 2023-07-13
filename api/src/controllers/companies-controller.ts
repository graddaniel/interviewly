import type { Response } from 'express'
import { StatusCodes } from 'http-status-codes';

import type AccountsService from '../services/accounts-service/accounts-service';
import type { AuthenticatedRequest } from '../generic/types'
import type CompaniesService from '../services/companies-service/companies-service';
import AccountsValidator from './validators/accounts-validator';
import { ProfileTypes } from 'shared';
import NotPermittedError from '../middleware/errors/not-permitted-error';


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
        //TODO this business logic leaks out of the services; refactor this in future
        if (currentUserRole !== ProfileTypes.Role.InterviewlyStaff
            && role === ProfileTypes.Role.InterviewlyStaff) {
            throw new NotPermittedError();
        }

        await AccountsValidator.validateCompanyAccount({
            name,
            surname,
            email,
            gender,
            role,
            status,
        });

        const company = await this.companiesService.getCompany({ uuid: companyUuid });

        await this.accountsService.createRecruiterAccount(
            email,
            'asd1123', //TODO generate password reset instead
            name,
            surname,
            gender,
            company,
            role,
            status,
        );

        res.status(StatusCodes.CREATED).send();
    }

    editCompanysAccount = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const { role: currentUserRole } = req.currentUser;

        const {
            uuid,
            name,
            surname,
            email,
            gender,
            role,
            status,
        } = req.body;

        await AccountsValidator.validateCompanyAccount({
            name,
            surname,
            email,
            gender,
            role,
            status,
        });

        await this.accountsService.editRecruiterAccount(
            currentUserRole,
            uuid,
            email,
            name,
            surname,
            gender,
            role,
            status,
        );

        res.status(StatusCodes.OK).send();
    }
}