import { StatusCodes } from 'http-status-codes';


export default class JanusError extends Error {
    code: StatusCodes;
    
    constructor (message: string) {
        super(message);

        this.code = StatusCodes.CONFLICT;
    }
}