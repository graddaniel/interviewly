import BussinessLogicError from '../../../generic/business-logic-error';


export default class BulletinBoardIsNotAssociatedWithTheProjectError extends BussinessLogicError {   
    constructor() {
        super('Bulletin board is not associated with the project found.');
    }
}