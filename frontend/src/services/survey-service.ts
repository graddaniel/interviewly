import axios from 'axios';

import { API_HOST } from 'config/current';


export default class SurveyService {
    static getSurveyResponses = async (
        surveyUuid: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/surveys/${surveyUuid}/responses`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    };

    static completeSurvey = async (
        surveyUuid: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.patch(`${API_HOST}/surveys/${surveyUuid}/complete`, {}, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}