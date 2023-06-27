import LimeSurveyAdapter from '../services/lime-survey-adapter';


const limeSurveyAdapter = new LimeSurveyAdapter();

const SurveyGroupsLoader = async ({
    params,
}) => {
    const surveyGroups = await limeSurveyAdapter.groupList(params.surveyId);

    // const surveyGroups2 = await limeSurveyAdapter.surveyGroupList(true);
    // console.log(surveyGroups2)
    return surveyGroups;
}

export default SurveyGroupsLoader;