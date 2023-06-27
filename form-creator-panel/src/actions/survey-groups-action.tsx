import { redirect } from 'react-router-dom';
import LimeSurveyAdapter from '../services/lime-survey-adapter';


const limeSurveyAdapter = new LimeSurveyAdapter();

const AddSurveyGroupAction = async ({ params, request }) => {
    const formData = await request.formData();
    const { method } = request;
    const { surveyId } = params;

    console.log("action", formData, surveyId, request)

    switch(method) {
        case 'DELETE':
            const groupId = formData.get('groupId');
        
            await limeSurveyAdapter.groupDelete(surveyId, groupId);
        
            return redirect(`/surveys/${surveyId}/groups`);

        case 'POST':
            const title = formData.get('title');
        
            await limeSurveyAdapter.groupAdd(surveyId, title,);
        
            return redirect(`/surveys/${surveyId}/groups`);

        default:
            throw new Error('Unrecognized method');
    }

};

export default AddSurveyGroupAction;