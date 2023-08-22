import { StatusCodes } from 'http-status-codes';

import AccountsValidator from './validators/accounts-validator';

import type { Request, Response } from 'express';

import type AccountsService from '../services/accounts-service/accounts-service';
import type { AuthenticatedRequest, AuthenticationRequest } from '../generic/types';


export default class AccountsController {
    private accountsService: AccountsService;

    constructor(accountsService: AccountsService) {
        this.accountsService = accountsService;
    }

    login = async (
        req: AuthenticationRequest,
        res: Response,
    ): Promise<void> => {
        const {
            email,
            password,
        } = req.credentials;

        const jwtToken = await this.accountsService.login(
            email,
            password
        );

        res.status(StatusCodes.OK).send(jwtToken);
    }

    register = async (
        req: AuthenticationRequest,
        res: Response,
    ): Promise<void> => {
        const { notify, language = 'en' } = req.query;
        console.log(language)
        const {
            email,
            password,
        } = req.credentials;

        const {
            name,
            surname,
            type,
            gender,
            companyName,
            newsletter,
        } = req.body;

        await AccountsValidator.validateNewAccount({
            email,
            password,
            name,
            surname,
            type,
            gender,
            companyName,
        });

        const newAccountData = await this.accountsService.register({
            email,
            password,
            type,
            name,
            surname,
            gender,
            newsletter,
            language: language as string,
            companyName,
            notify: !!notify,
        });

        //TODO validate language

        res.status(StatusCodes.OK).send(newAccountData);
    }

    patchAccount = async (
        req: Request,
        res: Response,
    ) => {
        const {
            accountId,
        } = req.params;

        const {
            confirm,
            password,
        } = req.body;

        if (confirm) { 
            await this.accountsService.confirmAccountRegistration(accountId);
        }
        
        if (password) {
            await AccountsValidator.validateNewPassword({ password });

            await this.accountsService.setPassword(accountId, password);
        }

        res.status(StatusCodes.OK).send();
    }

    requestPasswordReset = async (
        req: Request,
        res: Response,
    ) => {
        const {
            accountId,
        } = req.params;

        await this.accountsService.requestPasswordReset(accountId);

        res.status(StatusCodes.OK).send();
    }

    confirmPasswordReset = async (
        req: Request,
        res: Response,
    ) => {
        const {
            accountId,
        } = req.params;

        const {
            resetRequestId,
        } = req.body;

        await this.accountsService.confirmPasswordReset(
            accountId,
            resetRequestId,
        );

        res.status(StatusCodes.CREATED).send();
    }

    getIntroductionVideo = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;

        const videoURI = null;//
        // await this.accountsService.getIntroductionVideoURI(
        //     uuid,
        // );

        // read user data from the session
        res.status(StatusCodes.OK).send(videoURI);
    }

    //Needed? Should the worker do that periodically?
    createIntroductionVideo = async (
        req: Request,
        res: Response,
    ) => {
        res.status(StatusCodes.OK).send('NOT IMPLEMENTED');
    }
}