import axios from "axios";

import { generateRandomInteger } from './utils';
import JanusError from './janus-error';


const HOST = 'localhost';
const PORT = '8088';
const JANUS_ENDPOINT = '/janus';
const PROTOCOL = 'http://';

const API_ADDRESS = `${PROTOCOL}${HOST}:${PORT}${JANUS_ENDPOINT}`;

type JanusBasicResponse = {
    janus: string;
    transaction: string;
};
type JanusSessionResponse = JanusBasicResponse & {
    data: {
        id: number;
    };
};
type JanusAttachmentResponse = JanusBasicResponse & { 
    session_id: number;
    data: {
        id: number;
    };
};
type JanusPluginResponse = JanusBasicResponse & {
    session_id: number;
    sender: number;
    plugindata: {
        plugin: string;
        data: {
            [key: string]: any;
        };
    }
};

export default class JanusRestApiAdapter {
    private token: string;
    private sessionId: number;
    private attachmentId: number;

    constructor (token: string) {
        this.token = token;
    }

    sendApiRequest = async (
        address: string,
        request: any,
    ) => {
        const transaction = `transaction${generateRandomInteger()}`;

        request.transaction = transaction;

        if (this.token) {
            request.token = this.token;
        }

        const response = await axios.post(
            address,
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
    }

    createNewSession = async () => {
        const sessionData = await this.sendApiRequest(
            API_ADDRESS,
            { janus: 'create' },
        ) as JanusSessionResponse;

        this.sessionId = sessionData.data.id;
    }

    attachToPlugin = async (plugin: string) => {
        const attachmentData = await this.sendApiRequest(
            `${API_ADDRESS}/${this.sessionId}`,
            {
                janus: 'attach',
                plugin,
            },
        ) as JanusAttachmentResponse;

        this.attachmentId = attachmentData.data.id;
    }

    createRoom = async ({
        room,
        adminPassword,
        isPrivate,
        allowedEntryTokens,
    }: {
        room?: number,
        adminPassword?: string,
        isPrivate?: boolean,
        allowedEntryTokens?: string[],
    }) => {
        const body: any = {
            request: 'create',
        };

        if (room) {
            body.room = room;
        }
        if (adminPassword) {
            body.secret = adminPassword;
        }
        if (allowedEntryTokens) {
            body.allowed = allowedEntryTokens;
        }
        body.is_private = isPrivate ? true : false;

        const roomCreationResponse = await this.sendApiRequest(
            `${API_ADDRESS}/${this.sessionId}/${this.attachmentId}`,
            {
                janus: 'message',
                body,
            },
        ) as JanusPluginResponse;

        return roomCreationResponse.plugindata.data.room;
    }

    connect = async () => {
        await this.createNewSession();
        await this.attachToPlugin('janus.plugin.videoroom'); 
    }

    init = async () => {
        await this.connect();
    }
};