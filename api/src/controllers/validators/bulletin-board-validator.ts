import {
    object,
    mixed,
} from 'yup';
import { ProjectTypes, ValidationSchemas, Errors } from 'shared';

import validate from './validate';
import ValidationError from './validation-error';
import moment from 'moment';

const { ErrorCodes } = Errors;

const schemas = ValidationSchemas.instance();

export default class BulletinBoardValidator {
    static validateNewRoom = async (
        newRoomData,
    ) => {
        const schema = object({
            roomName: schemas.bulletinBoard.roomName,
        });

        await validate(schema, newRoomData);
    }

    static validateMessage = async (
        newMessageData,
    ) => {
        const newProjectSchema = object({
            message: schemas.bulletinBoard.message,
        });

        await validate(newProjectSchema, newMessageData);
    }
}