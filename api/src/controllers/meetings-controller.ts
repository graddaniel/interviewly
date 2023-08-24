import { StatusCodes } from "http-status-codes";

import type { Response } from 'express'

import type MeetingsService from "../services/meetings-service/meetings-service";
import type { AuthenticatedRequest } from "../generic/types";

export default class MeetingsController {
    meetingsService: MeetingsService;

    constructor(
        meetingsService: MeetingsService
    ) {
        this.meetingsService = meetingsService;
    }

    getMeetings = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: userUuid,
            type: accountType,
        } = req.currentUser;

        const meetings = await this.meetingsService.getMeetings(
            userUuid,
            accountType,
        );

        res.status(StatusCodes.OK).send(meetings);
    }
}