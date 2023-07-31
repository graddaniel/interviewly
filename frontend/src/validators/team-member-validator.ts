import {
    object,
} from 'yup';
import { ValidationSchemas } from 'shared';

import validateParams from './validate-params';


export default class TeamMemberValidator {
    static validateData = async (teamMemberData) => {
        const SCHEMAS = ValidationSchemas.instance();

        const teamMemberSchema = object({
            name: SCHEMAS.accountName,
            surname: SCHEMAS.accountSurname,
            email: SCHEMAS.email,
            role: SCHEMAS.accountRole,
            status: SCHEMAS.accountStatus,
            gender: SCHEMAS.gender,
        });

        const errors: any = await validateParams(
            teamMemberSchema,
            teamMemberData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}