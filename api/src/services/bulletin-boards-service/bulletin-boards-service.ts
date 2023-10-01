import { v4 as generateUuidV4 } from 'uuid';

import {
    RespondentProfileModel,
    BulletinBoardModel,
    BulletinBoardRoomModel,
    BulletinBoardThreadModel,
    BulletinBoardResponseModel,
} from '../../models';
import BulletinBoardNotFoundError from './errors/bulletin-board-is-not-associated-with-project-error';
import AccountsService from '../accounts-service/accounts-service';
import RoomNotFoundError from './errors/room-is-not-associated-with-project-error';
import RoomIsNotAssociatedWithTheProjectError from './errors/room-is-not-associated-with-project-error';
import BulletinBoardIsNotAssociatedWithTheProjectError from './errors/bulletin-board-is-not-associated-with-project-error';
import { AccountTypes, ProfileTypes } from 'shared';
import NotPermittedError from '../../generic/not-permitted-error';
import BulletinBoardsMapper from './bulletin-boards-mapper';
import ThreadIsNotAssociatedWithTheProjectError from './errors/thread-is-not-associated-with-project-error';

export default class BulletinBoardsService {
    private accountsService: AccountsService;

    constructor(
        accountsService: AccountsService,
    ) {
        this.accountsService = accountsService;
    }

    assertUserAccessToRoom = async (
        userUuid: string,
        room: BulletinBoardRoomModel,
    ) => {
        const account = await this.accountsService.getAccount({ uuid: userUuid });

        if (
            account.type === AccountTypes.Type.RECRUITER
            && [ProfileTypes.Role.Translator].includes(account.RecruiterProfile.role)
        ) {
            throw new NotPermittedError();

        } else if (account.type === AccountTypes.Type.RESPONDENT) {
            const currentUsersInTheRoom = await room.getRespondentProfiles({
                where: {
                    id: account.RespondentProfile.id,
                }
            });

            const userHasAccessToTheRoom = currentUsersInTheRoom.length > 0;
            if (!userHasAccessToTheRoom) {
                throw new NotPermittedError();
            }
        }
    }

    // TODO transaction
    createRoom = async (
        projectUuid: string,
        bulletinBoardUuid: string,
        name: string,
        respondentUuids: string[],
    ) => {
        const bulletinBoard = await BulletinBoardModel.findOne({
            where: {
                uuid: bulletinBoardUuid,
            },
            include: [{
                association: BulletinBoardModel.associations.ProjectModel,
                where: {
                    uuid: projectUuid,
                },
            }],
        });

        if (!bulletinBoard) {
            throw new BulletinBoardIsNotAssociatedWithTheProjectError();
        }

        const respondents = await RespondentProfileModel.findAll({
            include: [{
                association: RespondentProfileModel.associations.AccountModel,
                where: {
                    uuid: respondentUuids,
                }
            }],
        });

        const room = await BulletinBoardRoomModel.create({
            name,
            uuid: generateUuidV4(),
        });

        await bulletinBoard.addBulletinBoardRoom(room);

        await room.addRespondentProfiles(respondents);
    }

    private findRoomAndCheckRelationWithProject = async (
        roomUuid: string,
        projectUuid: string,
    ) => {
        const bulletinBoardRoom = await BulletinBoardRoomModel.findOne({
            where: {
                uuid: roomUuid,
            },
            include: [{
                association: BulletinBoardRoomModel.associations.BulletinBoardModel,
                include: [{
                    association: BulletinBoardModel.associations.ProjectModel,
                    where: {
                        uuid: projectUuid,
                    },
                }],
            }],
        });

        if (!bulletinBoardRoom) {
            throw new RoomIsNotAssociatedWithTheProjectError();
        }

        return bulletinBoardRoom;
    }

    private findThreadAndCheckRelationWithProject = async (
        threadUuid: string,
        projectUuid: string,
    ) => {
        const bulletinBoardThread = await BulletinBoardThreadModel.findOne({
            where: {
                uuid: threadUuid,
            },
            include: [{
                association: BulletinBoardThreadModel.associations.BulletinBoardRoomModel,
                include: [{
                    association: BulletinBoardRoomModel.associations.BulletinBoardModel,
                    include: [{
                        association: BulletinBoardModel.associations.ProjectModel,
                        where: {
                            uuid: projectUuid,
                        },
                    }],
                }],
            }],
        });

        if (!bulletinBoardThread) {
            throw new ThreadIsNotAssociatedWithTheProjectError();
        }

        return bulletinBoardThread;
    }

    findUsersRoom = async (
        currentUserUuid: string,
        projectUuid: string,
        roomUuid: string,
    ) => {
        const bulletinBoardRoom = await this.findRoomAndCheckRelationWithProject(
            roomUuid,
            projectUuid,
        );

        await this.assertUserAccessToRoom(currentUserUuid, bulletinBoardRoom);

        const threads = await bulletinBoardRoom.getBulletinBoardThreads({
            order: [['createdAt', 'DESC']],
            include: [{
                association: BulletinBoardThreadModel.associations.BulletinBoardResponseModel,
                include: [{
                    association: BulletinBoardResponseModel.associations.RecruiterProfileModel, 
                    attributes: ['id', 'name', 'surname'],
                }, {
                    association: BulletinBoardResponseModel.associations.RespondentProfileModel, 
                    attributes: ['id', 'name', 'surname'],
                }],
            }, {
                association: BulletinBoardThreadModel.associations.RecruiterProfileModel, 
                attributes: ['id', 'name', 'surname'],
            }],
        });

        return BulletinBoardsMapper.mapRoomAndThreadsModelsToRoom(bulletinBoardRoom, threads);
    }

    createThread = async (
        currentUserUuid: string,
        projectUuid: string,
        roomUuid: string,
        message: string,
    ) => {
        const bulletinBoardRoom = await this.findRoomAndCheckRelationWithProject(
            roomUuid,
            projectUuid,
        );

        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });

        const thread = await BulletinBoardThreadModel.create({
            message,
            uuid: generateUuidV4(),
            RecruiterProfileId: account.RecruiterProfile.id,
        });

        await bulletinBoardRoom.addBulletinBoardThread(thread);
    }

    createThreadResponse = async (
        currentUserUuid: string,
        projectUuid: string,
        threadUuid: string,
        message: string,
    ) => {
        const bulletinBoardThread = await this.findThreadAndCheckRelationWithProject(
            threadUuid,
            projectUuid,
        );

        const account = await this.accountsService.getAccount({ uuid: currentUserUuid });
        const responseData: any = {
            message,
        };
        if (account.type === AccountTypes.Type.RECRUITER) {
            responseData.RecruiterProfileId = account.RecruiterProfile.id;
        } else if (account.type === AccountTypes.Type.RESPONDENT) {
            responseData.RespondentProfileId = account.RespondentProfile.id;
        }

        const response = await BulletinBoardResponseModel.create(responseData);

        await bulletinBoardThread.addBulletinBoardResponse(response);
    }
}