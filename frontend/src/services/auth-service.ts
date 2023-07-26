import axios from 'axios';
import { Buffer } from 'buffer';
import i18next from 'i18next';

import { API_HOST } from 'config/current';


export default class AuthService {
    static login = async (
        email: string,
        password: string,
    ) => {
        const base64credentials = Buffer.from(`${email}:${password}`).toString('base64');

        const response = await axios.get(`${API_HOST}/accounts`,
        {
            headers: { authorization: `Basic ${base64credentials}` }
        });

        return response.data;
    };

    static register = async (
        email: string,
        password: string,
        name: string,
        surname: string,
        type: string,
        gender: string,
        newsletter: boolean,
        companyName?: string,
    ) => {
        const base64credentials = Buffer.from(`${email}:${password}`).toString('base64');

        const body: any = {
            name,
            surname,
            type,
            gender,
            newsletter,
        }
        if (companyName) {
            body.companyName = companyName;
        }

        const response = await axios.post(`${API_HOST}/accounts?notify=true&language=${i18next.resolvedLanguage}`,
        body, {
            headers: { authorization: `Basic ${base64credentials}` }
        });

        return response.data;
    };

    static confirm = async (accountUuid: string) => {
        const response = await axios.patch(`${API_HOST}/accounts/${accountUuid}/confirm`);

        return response.data;
    }
}