import { redirect } from 'react-router-dom';
import LimeSurveyAdapter from '../services/lime-survey-adapter';


const limeSurveyAdapter = new LimeSurveyAdapter();

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
  }
  
  function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }

const QuestionsListAction = async ({ request, params }) => {
    const formData = await request.formData();
    const { method } = request;

    switch (method) {
        case 'POST':
            const { surveyId, groupId } = params;
            const question = formData.get('lsq');
            const mandatory = formData.get('mandatory');
            console.log(question)
            await limeSurveyAdapter.questionImport(surveyId, groupId, utf8_to_b64(question), mandatory);
        
            return null;

        case 'DELETE':
            const questionId = formData.get('questionId');

            await limeSurveyAdapter.questionDelete(questionId);
        
            return null;

        default:
            throw new Error('Unrecognized method');
    }


};

export default QuestionsListAction;