import {
    object,
    mixed,
} from 'yup';
import { ResearchTypes, ValidationSchemas } from 'shared';

import validate from './validate';


const Steps = ResearchTypes.EditSteps;
const schemas = ValidationSchemas.instance();

export default class ResearchValidator {
    private static getEditResearchSchema = (step: ResearchTypes.EditSteps) => {
        const editResearchSchemas = {
            [Steps.General]: object({
                title: schemas.research.title,
                description: schemas.research.description,
            }),
            [Steps.Methodology]: object({
                methodology: schemas.research.methodology,
            }),
            [Steps.Respondents]: object({
                // if they exist then they're true, otherwise theyre false
            }),
            [Steps.Details]: object({
                participantsCount: schemas.research.participantsCount,
                reserveParticipantsCount: schemas.research.reserveParticipantsCount,
                meetingDuration: schemas.research.meetingDuration,
                participantsPaymentCurrency: schemas.research.participantsPaymentCurrency,
                participantsPaymentValue: schemas.research.participantsPaymentValue,
            }),
            [Steps.Summary]: object({}),
        };

        return editResearchSchemas[step];
    };

    static validateEditResearchStep = async (
        step: ResearchTypes.EditSteps
    ) => {
        const stepSchema = object({
            step: mixed()
            .required()
            .oneOf(Object.values(ResearchTypes.EditSteps).filter(v => typeof v === 'number')),
        });

        await validate(stepSchema, { step });  
    }

    static validateEditResearch = async (
        step: ResearchTypes.EditSteps,
        editProjectData,
    ) => {
        const schema = ResearchValidator.getEditResearchSchema(step);

        await validate(schema, editProjectData);   
    }

    static validateNewResearch = async (
        newResearch,
    ) => {
        const newResearchSchema = object({
            title: schemas.research.title,
        });

        await validate(newResearchSchema, newResearch);
    }
}