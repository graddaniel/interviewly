import { generatePath, redirect } from 'react-router-dom';
import { APP_FORMS_ROUTES } from '../../../src/consts/routes';
import ResearchService from '../../services/research-service';


export default async function AppAction({
    request,
}) {
    console.log("Creating project");

    const newResearchUuid = await ResearchService.createResearch('New research'); //TODO add internationalization

    return redirect(generatePath(APP_FORMS_ROUTES.EDIT_PROJECT.PATH, { projectId: newResearchUuid }));
}