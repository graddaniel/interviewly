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

        const {
            sort,
            limit,
        } = req.query;

        let query: any = null;
        if (sort) {
            query
            ? query.sort = sort
            : query = { sort }; 
        }
        if (limit) {
            query
            ? query.limit = parseInt(limit as string, 10)
            : query = { limit: parseInt(limit as string, 10) }; 
        }

        const meetings = await this.meetingsService.getMeetings(
            userUuid,
            accountType,
            query,
        );

        res.status(StatusCodes.OK).send(meetings);
    }

    getMeetingRoom = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: userUuid,
            type: accountType,
        } = req.currentUser;

        const {
            meetingId: meetingUuid,
        } = req.params;

        const meeting = await this.meetingsService.getMeetingRoom(
            meetingUuid,
            userUuid,
            accountType,
        );

        res.status(StatusCodes.OK).send(meeting);
    }

    deleteMeetingRoom = async (
        req: AuthenticatedRequest,
        res: Response,
    ) => {
        const {
            uuid: userUuid,
        } = req.currentUser;

        const {
            meetingId: meetingUuid,
        } = req.params;

        const meeting = await this.meetingsService.closeMeetingRoom(
            meetingUuid,
            userUuid,
        );

        res.status(StatusCodes.OK).send(meeting);
    }
}