import { redirect } from "react-router-dom";
import { APP_ROUTES } from "../../consts/routes";
import TemplateService from "../../services/template-service";
import TemplateValidator from "../../validators/template-validator";

export default async function NewTemplateAction ({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());

    const newTemplate = {
        name: formData.templateName,
        languages: JSON.parse(formData.languages),
        questions: JSON.parse(formData.questions),
        surveyType: formData.surveyType,
    };

    try {
        await TemplateValidator.validateTemplate(newTemplate);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await TemplateService.createTemplate(newTemplate)
    } catch (error) {
        return {
            success: false,
            error,
        };
    }

    return redirect(APP_ROUTES.LIBRARY.PATH);
}