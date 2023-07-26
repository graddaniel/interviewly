import axios from 'axios';

import { API_HOST } from 'config/current';


export default class CompanyService {
    static getCompanyAccounts = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/companies/accounts`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static createCompanyAccount = async (account) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        await axios.post(`${API_HOST}/companies/accounts`, account, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });
    }

    static editCompanyAccount = async (account) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        await axios.patch(`${API_HOST}/companies/accounts/${account.uuid}`, account, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });
    }
}
