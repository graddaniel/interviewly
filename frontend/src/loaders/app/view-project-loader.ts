import { AccountTypes, ProfileTypes } from "shared";
import { getAuth } from "../../hooks/useAuth";
import ProjectService from "../../services/project-service";
import TemplateService from "../../services/template-service";


export default async function ViewProjectLoader ({
    params,
}) {
    const auth = getAuth();
    const { projectId } = params;

    const loaderData = {} as any;

    try {
        loaderData.project = await ProjectService.getProject(projectId);

        if (auth.type === AccountTypes.Type.RESPONDENT) {
            loaderData.respondent = await ProjectService.getProjectRespondent(
                projectId,
                auth.currentUser?.uuid as string,
            );

        } else {
            loaderData.templates = auth.currentUserHasRole([ProfileTypes.Role.Observer])
                ? []
                : await TemplateService.getAllTemplates();
    
            loaderData.meetings = await ProjectService.getProjectMeetings(
                projectId,
            );
        }

    } catch (error) {
        return {
            success: false,
            error,
        }
    }

    return {
        success: true,
        data: loaderData,
    };
}