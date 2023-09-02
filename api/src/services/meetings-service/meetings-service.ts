import { AccountTypes, ProfileTypes } from "shared";
import moment from "moment";
import config from 'config';

import {
    AccountModel,
    CompanyModel,
    MeetingModel,
    ProjectModel,
    RecruiterProfileModel,
    RespondentProfileModel
} from "../../models";
import AccountsService from "../accounts-service/accounts-service";
import NotPermittedError from "../../generic/not-permitted-error";
import MeetingNotReadyError from "./errors/meeting-not-ready-error";
import MeetingFinishedError from "./errors/meeting-finished-error";
import MeetingNotFoundError from "./errors/meeting-not-found-error";

import type JanusService from "../janus-service/janus-service";
import type MQAdapter from "../mq-adapter";
import S3Adapter from "../s3-adapter";
import AccountNotFoundError from "../accounts-service/errors/account-not-found-error";


export default class MeetingsService {
    accountsService: AccountsService;
    janusService: JanusService;
    mqAdapter: MQAdapter;
    finishedMeetingsQueue: string;
    s3Adapter: S3Adapter;

    recordingsBucketName: string;

    constructor(
        accountsService: AccountsService,
        janusService: JanusService,
        mqAdapter: MQAdapter,
        s3Adapter: S3Adapter,
    ) {
        this.accountsService = accountsService;
        this.janusService = janusService;
        this.mqAdapter = mqAdapter;
        this.finishedMeetingsQueue = config.get('rabbitMq.finishedMeetingsQueue');
        this.s3Adapter = s3Adapter;

        this.recordingsBucketName = config.get('s3.recordingsBucket');
    }

    getMeetings = async (
        userUuid: string,
        accountType: AccountTypes.Type,
        query: {
            sort: string;
            limit: number;
        },
    ) => {
        const {
            sort,
            limit,
        } = query || {};

        const meetings = accountType === AccountTypes.Type.RECRUITER
            ? await this.getAllRecruiterMeetings(userUuid)
            : await this.getAllRespondentMeetings(userUuid);

        // TODO do this in sequelize later on
        const sortedMeetings = (sort && meetings.every(m => m[sort]))
            ?  meetings.sort((a, b) => a.date - b.date)
            :  meetings.sort((a, b) => a[sort] - b[sort]);

        const limitedResults = limit
            ? sortedMeetings.slice(0, limit)
            : sortedMeetings;

        return limitedResults;
    }

    getAllRecruiterMeetings = async (
        userUuid: string,
    ) => {
        const account = await AccountModel.findOne({
            attributes: ['uuid'],
            where: {
                uuid: userUuid,
            },
            include: [{
                attributes: ['CompanyId', 'role', 'id'],
                association: AccountModel.associations.RecruiterProfileModel,
                include: [{
                    attributes: ['id'],
                    association: RecruiterProfileModel.associations.CompanyModel,
                }],
            }],
        });

        if (!account) {
            throw new AccountNotFoundError();
        }

        const projectCriteria = {
            attributes: ['id', 'meetingDuration'],
            include: ([{
                attributes: ['uuid', 'date', 'recordingAvailable'],
                association: ProjectModel.associations.MeetingModel,
            }] as any),
        };

        const projectsModels = account.RecruiterProfile.role === ProfileTypes.Role.Moderator
            || account.RecruiterProfile.role === ProfileTypes.Role.Observer
            || account.RecruiterProfile.role === ProfileTypes.Role.Translator
            ? await account.RecruiterProfile.getProjects(projectCriteria)
            : await account.RecruiterProfile.Company.getProjects(projectCriteria);

            const nestedMeetings = projectsModels.map(projectModel => {
            const project = projectModel.toJSON();

            const {
                Meetings,
                meetingDuration: duration,
                ...projectData
            } = project;

            return Meetings.map(m => ({
                ...m,
                duration,
            }));
        });
        const meetings = nestedMeetings.flat().map(m => {
            if (m.recordingAvailable) {
                m.recordingUrl = this.s3Adapter.getPresignedS3Url(
                    this.recordingsBucketName,
                    `${m.uuid}.mp4`
                );
            }

            return m;
        });

        return meetings;
    }

    getAllRespondentMeetings = async (
        userUuid: string,
    ) => {
        const accounts = await AccountModel.findAll({
            attributes: ['uuid'],
            where: {
                uuid: userUuid,
            },
            include: [{
                association: AccountModel.associations.RespondentProfileModel,
                attributes: ['id'],
                include: [{
                    attributes: ['uuid', 'date'],
                    association: RespondentProfileModel.associations.MeetingModel,
                    include: [{
                        association: MeetingModel.associations.ProjectModel,
                        attributes: ['meetingDuration'],
                    }],
                }]
            }],
        });

        //@ts-ignore
        const meetingsModels = accounts[0].RespondentProfile.Meetings;
        const meetings = meetingsModels.map(meetingModel => {
            const {
                Project,
                ...meetingData
            } = meetingModel.toJSON();

            return {
                ...meetingData,
                duration: Project.meetingDuration,
            };
        })

        return meetings; 
    }

    getMeetingRoom = async (
        meetingUuid: string,
        userUuid: string,
        accountType: AccountTypes.Type,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: userUuid });
        const meeting = await MeetingModel.findOne({
            where: {
                uuid: meetingUuid,
            },
            include: [{
                association: MeetingModel.associations.RespondentProfileModel,
                attributes: ['id'],
            }, {
                association: MeetingModel.associations.ProjectModel,
                attributes: ['id', 'meetingDuration'],
                include: [{
                    attributes: ['id', 'uuid'],
                    association: ProjectModel.associations.CompanyModel,
                }, {
                    association: ProjectModel.associations.RecruiterProfileModel,
                    include: [{
                        association: RecruiterProfileModel.associations.AccountModel,
                    }]
                }],
            }],
        });

        
        if (!meeting) {
            throw new MeetingNotFoundError();
        }
        
        const meetingRespondents = meeting.RespondentProfiles;
        if (
            accountType === AccountTypes.Type.RESPONDENT
            && !meetingRespondents.find(r => r.id === account.RespondentProfile.id)
        ) {
            throw new NotPermittedError();
        } else if (
            accountType === AccountTypes.Type.RECRUITER
            && account.RecruiterProfile.CompanyId !== meeting.Project.Company.id
        ) {
            throw new NotPermittedError();
        } else if (accountType === AccountTypes.Type.RECRUITER
            && account.RecruiterProfile.CompanyId === meeting.Project.Company.id) {
                const recruiterHasAccess = await this.recruiterAccountCanAccessMeeting(account, meeting);

                if (!recruiterHasAccess) {
                    throw new NotPermittedError();
                }
        }

        const startDate = moment(meeting.date);
        const now = moment();
        console.log("DIFF", now.diff(startDate, "minutes"), now.diff(startDate, "hours"))
        if (now.diff(startDate, "minutes") < -15) {
            throw new MeetingNotReadyError();
        } else if (now.diff(startDate, "hours") > 6 || meeting.hasFinished) {
            throw new MeetingFinishedError();
        }
        // 12h after the meeting close it if it's still open

        //TODO store in db? check access
        if (!await this.janusService.roomExists(meetingUuid)) {
            await this.janusService.createRoom(meetingUuid);
        }
        console.log(await this.janusService.listRooms())
        console.log(await this.janusService.listRoomParticipants(meetingUuid))

        return meetingUuid;
    }

    closeMeetingRoom = async (
        meetingUuid: string,
        userUuid: string,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: userUuid });
        const meeting = await MeetingModel.findOne({
            where: {
                uuid: meetingUuid,
            },
            include: [{
                association: MeetingModel.associations.ProjectModel,
                attributes: ['id', 'meetingDuration'],
                include: [{
                    attributes: ['id', 'uuid'],
                    association: ProjectModel.associations.CompanyModel,
                }],
            }],
        });

        if (!meeting) {
            throw new MeetingNotFoundError();
        }

        if (account.RecruiterProfile.CompanyId !== meeting.Project.Company.id
        ) {
            throw new NotPermittedError();
        }

        const userHasAccess = await this.recruiterAccountCanAccessMeeting(account, meeting);
        if (!userHasAccess) {
            throw new NotPermittedError();
        }

        const destroyedRoomId = await this.janusService.destroyRoom(meetingUuid);

        this.mqAdapter.send(this.finishedMeetingsQueue, meetingUuid);

        meeting.hasFinished = true;
        await meeting.save();

        return destroyedRoomId;
    }

    private recruiterAccountCanAccessMeeting = async (
        account: AccountModel,
        meeting: MeetingModel,
    ) => {
        const usersWithAccessToTheProject = await meeting.Project.getRecruiterProfiles({
            attributes: ['AccountId'],
            include: [{
                attributes: ['uuid'],
                association: RecruiterProfileModel.associations.AccountModel,
                where: {
                    uuid: account.uuid,
                }
            }],
        });

        const currentUserHasAccessToTheProject = usersWithAccessToTheProject.length > 0;
        const currentUserRole = account.RecruiterProfile.role;

        if (!currentUserHasAccessToTheProject && (
            currentUserRole === ProfileTypes.Role.Moderator
            || currentUserRole === ProfileTypes.Role.Observer
            || currentUserRole === ProfileTypes.Role.Translator
        )) {
            return false;
        }

        return true;
    }

    addRecording = async (
        meetingUuid: string,
    ) => {
        await MeetingModel.update({
            recordingAvailable: true,
        }, {
            where: {
                uuid: meetingUuid,
            },
        });
    }
}