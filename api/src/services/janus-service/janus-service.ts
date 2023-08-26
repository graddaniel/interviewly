import type JanusRestApiAdapter from './janus-rest-api-adapter';
import type JanusAdminRestApiAdapter from './janus-admin-rest-api-adapter';
import { v4 as generateUuidV4 } from 'uuid';


export default class JanusService {
    private restApiAdapter: JanusRestApiAdapter;
    private adminApiAdapter: JanusAdminRestApiAdapter;

    constructor (
        restApiAdapter: JanusRestApiAdapter,
        adminApiAdapter: JanusAdminRestApiAdapter,
    ) {
        this.restApiAdapter = restApiAdapter;
        this.adminApiAdapter = adminApiAdapter;
    }

    createRoom = async (
        roomId: string,
    ) => {
        // const authToken = `auth-${generateUuidV4()}`;

        // await this.adminApiAdapter.addToken(authToken);
        // const tokensList = await this.adminApiAdapter.listTokens();
        // if (!tokensList.includes(authToken)) {
        //     throw new Error('Failed to create Auth token.');
        // }

        //const entryToken = `token-${generateUuidV4()}`;

        const createdRoomId = await this.restApiAdapter.session(
            this.restApiAdapter.createRoom,
            {
                //allowedEntryTokens: [ entryToken ],
                roomId
            },
        );
        
        return {
            room: createdRoomId,
            // authToken,
            // userToken: entryToken,
        };
    }

    roomExists = async (
        roomId: number | string,
    ) => {
        const exists = await this.restApiAdapter.session(
            this.restApiAdapter.roomExists,
            {
                roomId
            },
        );
        
        return exists;
    }

    destroyRoom = async (
        roomId: number | string,
    ) => {
        const destroyedRoomId = await this.restApiAdapter.session(
            this.restApiAdapter.destroyRoom,
            {
                roomId
            },
        );
        
        return destroyedRoomId;
    }

    listRooms = async () => {
        const roomsList = await this.restApiAdapter.session(
            this.restApiAdapter.listRooms,
        );
        
        return roomsList;
    }

    listRoomParticipants = async (
        roomId: string | number,
    ) => {
        const roomParticipants = await this.restApiAdapter.session(
            this.restApiAdapter.listRoomParticipants,
            {
                roomId,
            }
        );
        
        return roomParticipants;
    }
}