import ProjectService from '../../services/project-service';

export default async function ProjectRespondentLoader({
    params,
}) {
    const { projectId, respondentId } = params;

    try {
        const respondent = await ProjectService.getProjectRespondent(projectId, respondentId);

        if (respondent.meeting) {
            respondent.meeting.date = new Date(respondent.meeting.date);
        }
    
        return {
            success: true,
            data: {
                respondent,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        }
    }

    
}