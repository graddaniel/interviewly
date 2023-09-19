import SurveyService from '../../services/survey-service';

export default async function ProjectRespondentSurveyResponsesLoader({
    params,
}) {
    const { surveyId, respondentId } = params;

    try {
        const surveyResponse = await SurveyService.getRespondentsSurveyResponse(surveyId, respondentId);

        return {
            success: true,
            data: {
                surveyResponse
            },
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}