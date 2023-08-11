import {
    object,
    mixed,
} from 'yup';
import { ProjectTypes, ValidationSchemas } from 'shared';

import validate from './validate';


const Steps = ProjectTypes.EditSteps;
const schemas = ValidationSchemas.instance();

export default class ProjectValidator {
    private static getEditProjectSchema = (step: ProjectTypes.EditSteps) => {
        const editProjectSchemas = {
            [Steps.General]: object({
                title: schemas.project.title,
                description: schemas.project.description,
            }),
            [Steps.Methodology]: object({
                methodology: schemas.project.methodology,
            }),
            [Steps.Respondents]: object({
                // if they exist then they're true, otherwise theyre false
            }),
            [Steps.Details]: object({
                participantsCount: schemas.project.participantsCount,
                reserveParticipantsCount: schemas.project.reserveParticipantsCount,
                meetingDuration: schemas.project.meetingDuration,
                participantsPaymentCurrency: schemas.project.participantsPaymentCurrency,
                participantsPaymentValue: schemas.project.participantsPaymentValue,
            }),
            [Steps.Summary]: object({}),
        };

        return editProjectSchemas[step];
    };

    static validateEditProjectStep = async (
        step: ProjectTypes.EditSteps
    ) => {
        const stepSchema = object({
            step: mixed()
            .required()
            .oneOf(Object.values(ProjectTypes.EditSteps).filter(v => typeof v === 'number')),
        });

        await validate(stepSchema, { step });  
    }

    static validateEditProject = async (
        step: ProjectTypes.EditSteps,
        editProjectData,
    ) => {
        const schema = ProjectValidator.getEditProjectSchema(step);

        await validate(schema, editProjectData);   
    }

    static validateNewProject = async (
        newProject,
    ) => {
        const newProjectSchema = object({
            title: schemas.project.title,
        });

        await validate(newProjectSchema, newProject);
    }
}