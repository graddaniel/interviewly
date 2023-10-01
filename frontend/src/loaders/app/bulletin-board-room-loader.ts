import BulletinBoardService from "../../services/bulletin-board-service";


export default async function BulletinBoardRoomLoader({
    params,
}) {
    const {
        projectId,
        roomId,
    } = params;

    try {
        const room = await BulletinBoardService.getRoom(
            projectId,
            roomId,
        );

        return {
            success: true,
            data: {
                room,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}