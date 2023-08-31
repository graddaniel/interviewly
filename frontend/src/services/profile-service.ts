import axios from 'axios';

import { API_HOST } from 'config/current';


export default class ProfileService {
    static getProfile = async (accountUuid: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/accounts/${accountUuid}/profile`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}