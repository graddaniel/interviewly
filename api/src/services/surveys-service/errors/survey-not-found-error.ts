import NotFoundError from '../../../generic/not-found-error';


export default class SurveyNotFoundError extends NotFoundError {
    constructor() {
        super('Survey not found');
    }
}