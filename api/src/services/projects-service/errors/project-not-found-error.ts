import NotFoundError from '../../../generic/not-found-error';


export default class ProjectNotFoundError extends NotFoundError {
    constructor() {
        super('Project not found');
    }
}