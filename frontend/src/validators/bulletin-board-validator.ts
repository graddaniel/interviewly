import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validateParams from './validate-params';

export default class BulletinBoardValidator {
    static validateNewRoom = async (newRoomData) => {
        const schemas = ValidationSchemas.instance();

        const newRoomSchema = object({
            roomName: schemas.bulletinBoard.roomName,
        });

        const errors: any = await validateParams(
            newRoomSchema,
            newRoomData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }

    static validateNewMessage = async (newMessage) => {
        const schemas = ValidationSchemas.instance();

        const newRoomSchema = object({
            messageData: schemas.bulletinBoard.message,
        });

        const errors: any = await validateParams(
            newRoomSchema,
            newMessage,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}