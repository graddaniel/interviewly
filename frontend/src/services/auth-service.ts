import axios from 'axios';
import { Buffer } from 'buffer';


//const API_HOST = 'https://id8d03szbk.execute-api.eu-central-1.amazonaws.com/prod/api'
const API_HOST = 'http://localhost:7081'
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
        companyName?: string,
    ) => {
        const base64credentials = Buffer.from(`${email}:${password}`).toString('base64');

        const body: any = {
            name,
            surname,
            type,
            gender,
        }
        if (companyName) {
            body.companyName = companyName;
        }

        const response = await axios.post(`${API_HOST}/accounts?notify=true`,
        body, {
            headers: { authorization: `Basic ${base64credentials}` }
        });

        return response.data;
    };
}