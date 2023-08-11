import {
    object,
} from 'yup';
import { t } from 'i18next';
import { ProjectTypes, ValidationSchemas, Errors } from 'shared';

import validateParams from './validate-params';

const { ErrorCodes } = Errors;

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
                otherRequirements: SCHEMAS.project.otherRequirements,
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

        if (
            step === ProjectTypes.EditSteps.Details
            && editProjectData.startDate >= editProjectData.endDate
            && !errors.startDate
        ) {
            errors.startDate = t(`errors.${ErrorCodes.ProjectStartDateAfterEndDate}`);
        }

        if (Object.keys(errors).length > 0) {
            throw errors;
        }          
    }
}