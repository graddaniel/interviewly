import BussinessLogicError from '../../../generic/business-logic-error';


export default class ThreadIsNotAssociatedWithTheProjectError extends BussinessLogicError {   
    constructor() {
        super('Thread is not associated with the project found.');
    }
}