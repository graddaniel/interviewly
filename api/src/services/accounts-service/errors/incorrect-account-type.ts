import { AccountTypes } from 'shared';

import BussinessLogicError from '../../../generic/business-logic-error';

export default class IncorrectAccountType extends BussinessLogicError {   
    constructor(type: AccountTypes.Type) {
        super(`Incorrect account type: ${type}`);
    }
}