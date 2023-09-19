import { t } from "i18next";
import { Errors } from "shared";

import ProjectService from "../../services/project-service";

const { ErrorCodes } = Errors;

export default async function ViewProjectAction({
    request,
    params,
}) {
    const { projectId } = params;
    const formData = Object.fromEntries(await request.formData());
    const {
        type,
    } = formData;

    // workaround to hide past results
    if (type === "reset") {
        return null;
    }

    if (type === "markAsPaid") {
        return markProjectAsPaid(projectId);
    }

    if (type === "addSurvey") {
        const {
            selectedTemplateUuid,
            startDate,
            endDate,
        } = formData;

        return addSurvey(
            projectId,
            selectedTemplateUuid,
            startDate,
            endDate,
        );
    }    
}

async function markProjectAsPaid(projectId: string) {
    try {
        await ProjectService.markProjectAsPaid(projectId);
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
    };
}

async function addSurvey(
    projectId: string,
    selectedTemplateUuid: string,
    startDate,
    endDate,
) {
    if (startDate >= endDate) {
        return {
            success: false,
            errors: {
                startDate: t(`errors.${ErrorCodes.ProjectStartDateAfterEndDate}`),
            },
        };
    }

    try {
        await ProjectService.addSurvey(projectId, selectedTemplateUuid, startDate, endDate);
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error,
        };
    }

    return {
        success: true,
    };
}