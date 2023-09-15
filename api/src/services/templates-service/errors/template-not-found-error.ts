import NotFoundError from '../../../generic/not-found-error';


export default class TemplateNotFoundError extends NotFoundError {
    constructor() {
        super('Template not found');
    }
}