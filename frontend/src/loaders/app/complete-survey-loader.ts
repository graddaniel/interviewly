import { generatePath, redirect } from "react-router-dom";
import SurveyService from "../../services/survey-service";
import { APP_ROUTES } from "../../consts/routes";


export default async function CompleteSurveyLoader() {
    const lastSurveyUuid = localStorage.getItem('lastSurveyUuid');

    if (!lastSurveyUuid) {
        console.error('Missing lastSurveyUuid');
        return;
    }

    try {
        const projectUuid = await SurveyService.completeSurvey(lastSurveyUuid);
        
        localStorage.removeItem('lastSurveyUuid');    
    
        return redirect(
            projectUuid
                ? generatePath(APP_ROUTES.VIEW_PROJECT.PATH, { projectId: projectUuid })
                : APP_ROUTES.PROJECTS.PATH
            );
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

}