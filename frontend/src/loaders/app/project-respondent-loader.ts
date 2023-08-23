import ProjectService from '../../services/project-service';

export default async function ProjectRespondentLoader({
    params,
}) {
    const { projectId, respondentId } = params;

    const respondent = await ProjectService.getProjectRespondent(projectId, respondentId);

    return respondent;
}