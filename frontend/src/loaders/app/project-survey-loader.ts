import SurveyService from "../../services/survey-service";


export default async function ProjectSurveyLoader({
    params,
}) {
    const {
        surveyId,
    } = params;

    return await SurveyService.getSurveyResponses(surveyId);
}