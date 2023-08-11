import {
    object,
} from 'yup';
import { ProjectTypes, ValidationSchemas } from 'shared';

import validateParams from './validate-params';


const Steps = ProjectTypes.EditSteps;

export default class EditProjectValidator {
    private static getSchema = (step: ProjectTypes.EditSteps) => {
        const SCHEMAS = ValidationSchemas.instance();

        const schemas = {
            [Steps.General]: object({
                title: SCHEMAS.project.title,
                description: SCHEMAS.project.description,
            }),
            [Steps.Methodology]: object({
                methodology: SCHEMAS.project.methodology,
            }),
            [Steps.Respondents]: object({
                // if they exist then they're true, otherwise theyre false
            }),
            [Steps.Details]: object({
                participantsCount: SCHEMAS.project.participantsCount,
                reserveParticipantsCount: SCHEMAS.project.reserveParticipantsCount,
                meetingDuration: SCHEMAS.project.meetingDuration,
                participantsPaymentCurrency: SCHEMAS.project.participantsPaymentCurrency,
                participantsPaymentValue: SCHEMAS.project.participantsPaymentValue,
            }),
            [Steps.Summary]: object({}),
        };

        return schemas[step];
    };

    static validateData = async (
        step: ProjectTypes.EditSteps,
        editProjectData: any
    ) => {
        const errors: any = await validateParams(
            EditProjectValidator.getSchema(step),
            editProjectData,
        );

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}