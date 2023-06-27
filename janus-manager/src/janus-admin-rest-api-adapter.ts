import axios from "axios";

import { generateRandomInteger } from './utils';
import JanusError from './janus-error';


const HOST = 'localhost';
const PORT = '7088';
const JANUS_ENDPOINT = '/admin';
const PROTOCOL = 'http://';

const API_ADDRESS = `${PROTOCOL}${HOST}:${PORT}${JANUS_ENDPOINT}`;


export default class JanusAdminRestApiAdapter {
    adminSecret: string;

    constructor (adminSecret: string) {
        this.adminSecret = adminSecret;
    }

    sendRequest = async (
        request: any,
    ) => {
        const transaction = `transaction${generateRandomInteger()}`;

        request.transaction = transaction;
        request.admin_secret = this.adminSecret;

        const response = await axios.post(
            API_ADDRESS,
            request,
        );

        const { data: responseData } = response;

        if (responseData.transaction !== transaction) {
            throw new Error('Transaction values do not match.');
        }

        if (responseData.error) {
            throw new JanusError(responseData.error);
        } else if (responseData?.plugindata?.data?.error) {
            throw new JanusError(responseData.plugindata.data.error);
        }

        return responseData;
    };

    addToken = async (token: string) => {
        await this.sendRequest({
            janus: "add_token",
            token,
        });
    };

    listTokens = async () => {
        const response = await this.sendRequest({
            janus: "list_tokens",
        });

        const { data } = response;

        return data?.tokens?.map(token => token.token) || [];
    };
};