import { generatePath, redirect } from 'react-router-dom';
import { APP_FORMS_ROUTES } from '../../../src/consts/routes';


export default function AppAction({
    request,
}) {
    console.log("Creating project");

    const projectId = 1;

    return redirect(generatePath(APP_FORMS_ROUTES.EDIT_PROJECT.PATH, { projectId }));
}