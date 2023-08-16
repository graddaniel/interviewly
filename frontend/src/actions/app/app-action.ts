import { generatePath, redirect } from 'react-router-dom';
import { APP_FORMS_ROUTES } from '../../../src/consts/routes';
import ProjectService from '../../services/project-service';


export default async function AppAction({
    request,
}) {
    const newProjectUuid = await ProjectService.createProject('New project'); //TODO add internationalization

    return redirect(generatePath(APP_FORMS_ROUTES.EDIT_PROJECT.PATH, { projectId: newProjectUuid }));
}