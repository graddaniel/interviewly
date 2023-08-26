import axios from "axios";
import config from "config";

import { generateRandomInteger } from "../../utils";
import JanusError from './errors/janus-error';


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

type SessionAndHandle = {
    sessionId: number;
    pluginHandle: number;
}

export default class JanusRestApiAdapter {
    apiUrl: string;
    recordingsDirectory: string;

    constructor () {
        this.apiUrl = config.get('janus.apiUrl');
        this.recordingsDirectory = config.get('janus.recordingsDirectory');
    }

    sendApiRequest = async (
        address: string,
        request: any,
        token?: string,
    ) => {
        const transaction = `transaction${generateRandomInteger()}`;

        request.transaction = transaction;

        if (token) {
            request.token = token;
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

    createSession = async (): Promise<number> => {
        const response = await this.sendApiRequest(
            this.apiUrl,
            { janus: 'create' },
        ) as JanusSessionResponse;

        return response.data.id;
    }

    destroySession = async (
        sessionId: number,
    ) => {
        await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}`,
            { janus: 'destroy' },
        ) as JanusSessionResponse;
    }

    attachToPlugin = async (
        sessionId: number,
        plugin: string,
    ): Promise<number> => {
        const response = await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}`,
            {
                janus: 'attach',
                plugin,
            },
        ) as JanusAttachmentResponse;

        return response.data.id;
    }

    session = async (
        fn: (args: any) => Promise<any>,
        args: any = {},
    ) => {
        const sessionId = await this.createSession();
        const pluginHandle = await this.attachToPlugin(sessionId, 'janus.plugin.videoroom');

        const result = await fn({
            ...args,
            sessionId,
            pluginHandle,
        });

        await this.destroySession(sessionId);

        return result;
    }

    createRoom = async ({
        sessionId,
        pluginHandle,
        roomId,
        secret, // to edit/destroy the room
        isPrivate,
        allowedEntryTokens,
    }: {
        roomId?: number | string,
        secret?: string,
        isPrivate?: boolean,
        allowedEntryTokens?: string[],
    } & SessionAndHandle) => {
        const body: any = {
            request: 'create',
        };

        if (roomId) {
            body.room = roomId;
        }
        if (secret) {
            body.secret = secret;
        }
        if (allowedEntryTokens) {
            body.allowed = allowedEntryTokens;
        }
        body.publishers = config.get('janus.maxInterviewPublishers')
        body.is_private = isPrivate ? true : false;
        body.rec_dir = `${this.recordingsDirectory}/${roomId}`;

        const roomCreationResponse = await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}/${pluginHandle}`,
            {
                janus: 'message',
                body,
            },
        ) as JanusPluginResponse;

        return roomCreationResponse.plugindata.data.room;
    }

    roomExists = async ({
        sessionId,
        pluginHandle,
        roomId,
    }: {
        roomId: number | string,
    } & SessionAndHandle) => {
        const body: any = {
            request: 'exists',
        };

        body.room = roomId;

        const roomCreationResponse = await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}/${pluginHandle}`,
            {
                janus: 'message',
                body,
            },
        ) as JanusPluginResponse;

        return roomCreationResponse.plugindata.data.exists;
    }

    destroyRoom = async ({
        sessionId,
        pluginHandle,
        roomId,
        secret, // to edit/destroy the room
    }: {
        roomId: number | string,
        secret?: string,
    } & SessionAndHandle) => {
        const body: any = {
            request: 'destroy',
        };

        body.room = roomId;
        if (secret) {
            body.secret = secret;
        }

        const roomCreationResponse = await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}/${pluginHandle}`,
            {
                janus: 'message',
                body,
            },
        ) as JanusPluginResponse;

        return roomCreationResponse.plugindata.data.room;
    }

    listRooms = async ({
        sessionId,
        pluginHandle,
    }: SessionAndHandle) => {
        const body: any = {
            request: 'list',
        };

        const roomCreationResponse = await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}/${pluginHandle}`,
            {
                janus: 'message',
                body,
            },
        ) as JanusPluginResponse;

        return roomCreationResponse.plugindata.data.list;
    }

    listRoomParticipants = async ({
        sessionId,
        pluginHandle,
        roomId,
    }: {
        roomId: number | string,
    } & SessionAndHandle) => {
        const body: any = {
            request: 'listparticipants',
        };

        body.room = roomId;

        const roomCreationResponse = await this.sendApiRequest(
            `${this.apiUrl}/${sessionId}/${pluginHandle}`,
            {
                janus: 'message',
                body,
            },
        ) as JanusPluginResponse;

        return roomCreationResponse.plugindata.data.participants;
    }
};