import SurveyService from '../../services/survey-service';

export default async function ProjectRespondentSurveyResponsesLoader({
    params,
}) {
    const { surveyId, respondentId } = params;

    const surveyResponse = await SurveyService.getRespondentsSurveyResponse(surveyId, respondentId);

    return surveyResponse;
}