import { ProjectTypes } from 'shared';

import ProjectService from '../../services/project-service';
import EditProjectValidator from '../../validators/edit-project-validator';


const EditProjectAction = async ({
    request,
    params,
}) => {
    const formData = Object.fromEntries(await request.formData());
    const { projectId } = params;

    const {
        step: stepString,
        ...editProjectData
    } = formData;

    const step = parseInt(stepString, 10);
    if (step === ProjectTypes.EditSteps.Details) {
        for (const param of ['participantsCount', 'participantsPaymentValue', 'reserveParticipantsCount']) {
            const parsedValue = parseInt(editProjectData[param], 10);
            editProjectData[param] = isNaN(parsedValue) ? 0 : parsedValue;
        }
    }

    try {
        if (!Object.values(ProjectTypes.EditSteps).includes(step)) {
            return {
                success: false,
                error: new Error(`Unrecognized project edition step: ${step}`),
            };
        }

        await EditProjectValidator.validateData(step, editProjectData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await ProjectService.updateProject(projectId, formData);

        return {
            success: true,
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }


};

export default EditProjectAction;