import { StatusCodes } from 'http-status-codes';
import BussinessLogicError from '../../../generic/business-logic-error';


export default class RespondentDoesNotParticipateInSurveyError extends BussinessLogicError {
    statusCode: StatusCodes;

    constructor() {
        super('The respondent does not participate in the survey.');
    }
}