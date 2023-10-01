import BussinessLogicError from '../../../generic/business-logic-error';


export default class RoomIsNotAssociatedWithTheProjectError extends BussinessLogicError {   
    constructor() {
        super('Room is not associated with the project found.');
    }
}