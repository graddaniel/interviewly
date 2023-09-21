import { StatusCodes } from 'http-status-codes';

import AccountsValidator from './validators/accounts-validator';

import type { Request, Response } from 'express';

import type AccountsService from '../services/accounts-service/accounts-service';
import type { AuthenticatedRequest, AuthenticationRequest } from '../generic/types';
import { AccountTypes } from 'shared';


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
            recordingId,
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
            recordingId,
        });

        //TODO validate language

        res.status(StatusCodes.OK).send(newAccountData);
    }

    getAccountProfile = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;

        const profile = await this.accountsService.getProfile(uuid);

        res.status(StatusCodes.OK).send(profile);
    }

    updateAccountProfile = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
            type,
        } = req.currentUser;

        const profileData = req.body;

        type === AccountTypes.Type.RECRUITER
            ? await AccountsValidator.validateRecruiterProfileData(profileData)
            : await AccountsValidator.validateRespondentProfileData(profileData);

        const profile = await this.accountsService.updateProfile(uuid, profileData);

        res.status(StatusCodes.OK).send(profile);
    }

    cvUploaded = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;


        await this.accountsService.confirmCVUpload(
            uuid,
        );

        res.status(StatusCodes.OK).send();
    }

    getCVUploadUrl = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;

        const uploadUrl = await this.accountsService.getCVUploadUrl(uuid);

        res.status(StatusCodes.OK).send(uploadUrl);
    }

    otherFilesUploaded = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;


        await this.accountsService.confirmOtherFilesUpload(
            uuid,
        );

        res.status(StatusCodes.OK).send();
    }

    getOtherFilesUploadUrl = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;

        const uploadUrl = await this.accountsService.getOtherFilesUploadUrl(uuid);

        res.status(StatusCodes.OK).send(uploadUrl);
    }

    patchAccountConfirmed = async (
        req: Request,
        res: Response,
    ) => {
        const {
            accountId,
        } = req.params;

        await this.accountsService.confirmAccountRegistration(accountId);

        res.status(StatusCodes.OK).send();
    }

    patchAccountPassword = async (
        req: Request,
        res: Response,
    ) => {
        const {
            accountId: accountUuid,
        } = req.params;

        const {
            password,
        } = req.body;

        await AccountsValidator.validateNewPassword(password);

        await this.accountsService.setPassword(accountUuid, password);
        await this.accountsService.confirmAccountRegistration(accountUuid);

        res.status(StatusCodes.OK).send();
    }

    patchCurrentAccountPassword = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid,
        } = req.currentUser;

        const {
            newPassword,
            oldPassword,
        } = req.body;

        await AccountsValidator.validatePasswordChange(
            oldPassword,
            newPassword,
        );

        await this.accountsService.changePassword(
            uuid,
            oldPassword,
            newPassword,
        );

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