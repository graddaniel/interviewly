import axios from 'axios';

import { API_HOST } from '~/config/current';


export default class ContactRequestService {
    static sendRequest = async (email: string, message: string) => {
        const body = {
            email,
            message,
        };

        const response = await axios.post(`${API_HOST}/contactRequest`, body);

        const { data } = response;

        return data;
    }
}
