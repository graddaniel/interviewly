import LimeSurveyAdapter from '../services/lime-survey-adapter';


const limeSurveyAdapter = new LimeSurveyAdapter();

const QuestionsListLoader = async ({ params }) => {
    const questions = await limeSurveyAdapter.questionsList(params.surveyId);

    return questions;
};

export default QuestionsListLoader;