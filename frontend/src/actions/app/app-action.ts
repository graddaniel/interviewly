import { generatePath, redirect } from 'react-router-dom';
import { t } from "i18next";

import { APP_FORMS_ROUTES } from '../../../src/consts/routes';
import ProjectService from '../../services/project-service';


export default async function AppAction() {
    try {
        const newProjectUuid = await ProjectService.createProject(t('projects.newProjectName'));
    
        return redirect(generatePath(APP_FORMS_ROUTES.EDIT_PROJECT.PATH, { projectId: newProjectUuid }));
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}