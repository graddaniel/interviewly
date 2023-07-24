import { StatusCodes } from 'http-status-codes';
import config from 'config';

import type MailService from '../services/mail-service/mail-service';
import { Request, Response } from 'express';
import ContactRequestValidator from './validators/contact-request-validator';


export default class ContactRequestController {
    mailService: MailService;
    notificationsEmail: string;

    constructor (mailService: MailService) {
        this.mailService = mailService;

        this.notificationsEmail = config.get('contactRequest.notificationsEmail');
    }

    send = async (req: Request, res: Response) => {
        const {
            email,
            message,
        } = req.body;

        await ContactRequestValidator.ValidateNewContactRequest({
            email,
            message,
        })

        await this.mailService.send(
            this.notificationsEmail,
            `Contact request from ${email}`,
            message,
        );

        res.status(StatusCodes.CREATED).send();
    }
}