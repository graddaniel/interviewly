import axios from "axios";
import config from "config";

import { generateRandomInteger } from '../../utils';
import JanusError from './errors/janus-error';


export default class JanusAdminRestApiAdapter {
    adminSecret: string;
    adminApiUrl: string;

    constructor () {
        this.adminSecret = config.get('janus.adminSecret');
        this.adminApiUrl = config.get('janus.adminApiUrl');
    }

    sendRequest = async (
        request: any,
    ) => {
        const transaction = `transaction${generateRandomInteger()}`;

        request.transaction = transaction;
        request.admin_secret = this.adminSecret;

        const response = await axios.post(
            this.adminApiUrl,
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