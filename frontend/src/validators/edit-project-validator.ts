import {
    object,
} from 'yup';
import { ResearchTypes, ValidationSchemas } from 'shared';

import validateParams from './validate-params';


const Steps = ResearchTypes.EditSteps;

export default class EditProjectValidator {
    private static getSchema = (step: ResearchTypes.EditSteps) => {
        const SCHEMAS = ValidationSchemas.instance();

        const schemas = {
            [Steps.General]: object({
                title: SCHEMAS.research.title,
                description: SCHEMAS.research.description,
            }),
            [Steps.Methodology]: object({
                methodology: SCHEMAS.research.methodology,
            }),
            [Steps.Respondents]: object({
                // if they exist then they're true, otherwise theyre false
            }),
            [Steps.Details]: object({
                participantsCount: SCHEMAS.research.participantsCount,
                reserveParticipantsCount: SCHEMAS.research.reserveParticipantsCount,
                meetingDuration: SCHEMAS.research.meetingDuration,
                participantsPaymentCurrency: SCHEMAS.research.participantsPaymentCurrency,
                participantsPaymentValue: SCHEMAS.research.participantsPaymentValue,
            }),
            [Steps.Summary]: object({}),
        };

        return schemas[step];
    };

    static validateData = async (
        step: ResearchTypes.EditSteps,
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