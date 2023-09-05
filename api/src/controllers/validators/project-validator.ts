import {
    object,
    mixed,
} from 'yup';
import { ProjectTypes, ValidationSchemas, Errors } from 'shared';

import validate from './validate';
import ValidationError from './validation-error';
import moment from 'moment';

const { ErrorCodes } = Errors;

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
                otherRequirements: schemas.project.otherRequirements,
                addLanguageTest: schemas.project.addLanguageTest,
                addScreeningSurvey: schemas.project.addScreeningSurvey,
                requireCandidateRecording: schemas.project.requireCandidateRecording,
            }),
            [Steps.Details]: object({
                participantsCount: schemas.project.participantsCount,
                reserveParticipantsCount: schemas.project.reserveParticipantsCount,
                meetingDuration: schemas.project.meetingDuration,
                startDate: schemas.project.startDate,
                endDate: schemas.project.endDate,
                transcriptionNeeded: schemas.project.transcriptionNeeded,
                moderatorNeeded: schemas.project.moderatorNeeded,
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

        if (editProjectData.startDate >= editProjectData.endDate) {
            throw new ValidationError(
                'startDate',
                `${ErrorCodes.ProjectStartDateAfterEndDate}`,
            );
        }
    }

    static validateNewProject = async (
        newProject,
    ) => {
        const newProjectSchema = object({
            title: schemas.project.title,
        });

        await validate(newProjectSchema, newProject);
    }

    static validateCompleteProjectDraft = async (
        projectDraft,
    ) => {
        const editProjectSchemas = object({
            title: schemas.project.title,
            description: schemas.project.description,
            methodology: schemas.project.methodology,
            otherRequirements: schemas.project.otherRequirements,
            addLanguageTest: schemas.project.addLanguageTest,
            addScreeningSurvey: schemas.project.addScreeningSurvey,
            requireCandidateRecording: schemas.project.requireCandidateRecording,
            participantsCount: schemas.project.participantsCount,
            reserveParticipantsCount: schemas.project.reserveParticipantsCount,
            meetingDuration: schemas.project.meetingDuration,
            transcriptionNeeded: schemas.project.transcriptionNeeded,
            moderatorNeeded: schemas.project.moderatorNeeded,
            participantsPaymentCurrency: schemas.project.participantsPaymentCurrency,
            participantsPaymentValue: schemas.project.participantsPaymentValue,
        });

        await validate(editProjectSchemas, projectDraft);

        const {
            startDate,
            endDate,
        } = projectDraft;

        if (!startDate || !endDate || moment(endDate).isBefore(moment(startDate))) {
            throw new Error('we dont care about the error type here');
        }
    }
}