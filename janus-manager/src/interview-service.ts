import type JanusRestApiAdapter from './janus-rest-api-adapter';
import type JanusAdminRestApiAdapter from './janus-admin-rest-api-adapter';
import { v4 as uuidv4 } from 'uuid';

export default class InterviewService {
    private adminApiAdapter: JanusAdminRestApiAdapter;
    private restApiAdapter: JanusRestApiAdapter;

    constructor ({
        adminApiAdapter,
        restApiAdapter,
    }: {
        adminApiAdapter: JanusAdminRestApiAdapter;
        restApiAdapter: JanusRestApiAdapter;
    }) {
        this.adminApiAdapter = adminApiAdapter;
        this.restApiAdapter = restApiAdapter;
    }

    createInterview = async () => {
        const authToken = `auth-${uuidv4()}`;

        await this.adminApiAdapter.addToken(authToken);
        const tokensList = await this.adminApiAdapter.listTokens();
        if (!tokensList.includes(authToken)) {
            throw new Error('Failed to create Auth token.');
        }

        const entryToken = `token-${uuidv4()}`;

        const createdRoom = await this.restApiAdapter.createRoom({
            allowedEntryTokens: [ entryToken ],
        });
        
        return {
            room: createdRoom,
            authToken,
            userToken: entryToken,
        };
    }
}