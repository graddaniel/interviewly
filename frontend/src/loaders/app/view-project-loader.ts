import { AccountTypes } from "shared";
import { getAuth } from "../../hooks/useAuth";
import ProjectService from "../../services/project-service";
import TemplateService from "../../services/template-service";


export default async function ViewProjectLoader ({
    params,
}) {
    const auth = getAuth();
    const { projectId } = params;

    const project = await ProjectService.getProject(projectId);

    if (auth.type === AccountTypes.Type.RESPONDENT) {
        const respondent = await ProjectService.getProjectRespondent(
            projectId,
            auth.currentUser?.uuid as string,
        );

        return {
            project,
            respondent,
        };
    } else {
        const templates = await TemplateService.getAllTemplates();

        return {
            project,
            templates,
        };
    }
}