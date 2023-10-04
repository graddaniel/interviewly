import { t } from "i18next";
import { Errors } from "shared";

import ProjectService from "../../services/project-service";
import BulletinBoardService from "../../services/bulletin-board-service";
import BulletinBoardValidator from "../../validators/bulletin-board-validator";

const { ErrorCodes } = Errors;

export default async function BulletinBoardRoomAction({
    request,
    params,
}) {
    const {
        projectId,
        roomId,
    } = params;
    const formData = Object.fromEntries(await request.formData());
    const {
        type,
    } = formData;

    // workaround to hide past results
    if (type === "reset") {
        return null;
    }

    if (type === "postThread") {
        const { message } = formData;

        return postThread(
            projectId,
            roomId,
            message,
        );
    }

    if (type === "postResponse") {
        const {
            message,
            threadUuid,
        } = formData;

        return postResponse(
            projectId,
            threadUuid,
            message,
        );
    }

    console.error("Unrecognized action type", type)
}

async function postThread(
    projectId: string,
    roomId: string,
    message: string,
) {
    try {
        await BulletinBoardValidator.validateNewMessage({
            messageData: message,
        });

        await BulletinBoardService.createThread(
            projectId,
            roomId,
            message,
        );
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
    };
}

async function postResponse(
    projectId: string,
    threadId: string,
    message: string,
) {
    try {
        await BulletinBoardValidator.validateNewMessage({
            messageData: message,
        });

        await BulletinBoardService.postResponse(
            projectId,
            threadId,
            message,
        );
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
    };
}