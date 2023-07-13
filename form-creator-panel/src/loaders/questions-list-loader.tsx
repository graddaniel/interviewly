import LimeSurveyAdapter from '../services/lime-survey-adapter';


const limeSurveyAdapter = new LimeSurveyAdapter();

const QuestionsListLoader = async ({ params }) => {
    const result = await limeSurveyAdapter.questionsList(params.surveyId);

    if (result.status === "No questions found") {
        return [];
    }

    return result;
};

export default QuestionsListLoader;