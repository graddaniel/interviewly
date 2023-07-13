import LimeSurveyAdapter from '../services/lime-survey-adapter';


const limeSurveyAdapter = new LimeSurveyAdapter();

const SurveyGroupsLoader = async ({
    params,
}) => {
    const response = await limeSurveyAdapter.groupList(params.surveyId);

    if (response.status === "No groups found") {
        return [];
    }

    // const surveyGroups2 = await limeSurveyAdapter.surveyGroupList(true);
    // console.log(surveyGroups2)
    return response;
}

export default SurveyGroupsLoader;