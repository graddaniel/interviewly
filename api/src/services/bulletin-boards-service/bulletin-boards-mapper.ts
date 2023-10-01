import { BulletinBoardRoomModel, BulletinBoardThreadModel, BulletinBoardResponseModel } from "../../models";

export default class BulletinBoardsMapper {
    static mapRoomAndThreadsModelsToRoom = (
        room: BulletinBoardRoomModel,
        threads: BulletinBoardThreadModel[],
    ) => {
        const {
            name,
        } = room;

        return {
            name,
            threads: threads.map(thread => ({
                postDate: thread.createdAt,
                message: thread.message,
                uuid: thread.uuid,
                author: {
                    name: thread.RecruiterProfile.name,
                    surname: thread.RecruiterProfile.surname,
                },
                responses: thread.BulletinBoardResponses.map(
                    BulletinBoardsMapper.mapThreadResponseModelToThreadResponse
                ),
            })),
        }
    }

    static mapThreadResponseModelToThreadResponse = (
        response: BulletinBoardResponseModel,
    ) => {
        const {
            message,
            createdAt,
        } = response;

        const profile = response.RecruiterProfile || response.RespondentProfile || {};

        return {
            message,
            postDate: createdAt,
            author: {
                name: profile.name,
                surname: profile.surname,
            },
        };
    }
}