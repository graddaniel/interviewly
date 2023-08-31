import { t } from "i18next";
import { Errors } from "shared";

import ProjectService from "../../services/project-service";

const { ErrorCodes } = Errors;

export default async function ViewProjectAction({
    request,
    params,
}) {
    const { projectId } = params;
    const {
        selectedTemplateUuid,
        type,
        startDate,
        endDate,
    } = Object.fromEntries(await request.formData());

    // workaround to hide past results
    if (type === "reset") {
        return null;
    }

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
            errors: {
                generic: error,
            },
        };
    }

    return {
        success: true,
    };
}