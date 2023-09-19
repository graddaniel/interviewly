import SurveyService from "../../services/survey-service";


export default async function ProjectSurveyLoader({
    params,
}) {
    const {
        surveyId,
    } = params;

    try {
        const surveyResponses = await SurveyService.getSurveyResponses(surveyId);

        return {
            success: true,
            data: {
                surveyResponses,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}