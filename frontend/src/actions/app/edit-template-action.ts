import { redirect } from "react-router-dom";
import TemplateService from "../../services/template-service";
import { APP_ROUTES } from "../../consts/routes";
import TemplateValidator from "../../validators/template-validator";

export default async function EditTemplateAction ({
    request,
    params,
}) {
    const formData = Object.fromEntries(await request.formData());

    const { templateId } = params;

    const editedTemplateData = {
        name: formData.templateName,
        languages: JSON.parse(formData.languages),
        questions: JSON.parse(formData.questions),
        surveyType: formData.surveyType,
    };

    try {
        await TemplateValidator.validateTemplate(editedTemplateData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await TemplateService.updateTemplate(templateId, editedTemplateData)
    } catch (error) {
        return {
            success: false,
            errors: {
                generic: error,
            },
        };
    }

    return redirect(APP_ROUTES.LIBRARY.PATH);
}