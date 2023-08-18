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
        return {
            project,
        };
    }

    const templates = await TemplateService.getAllTemplates();

    return {
        project,
        templates,
    };
}