import ProjectService from "../../services/project-service";


export default async function ProjectLoader ({
    params,
}) {
    const { projectId } = params;

    const project = await ProjectService.getProject(projectId);

    return project;
}