import TemplateService from "../../services/template-service";


export default async function TemplateLoader ({
    params,
}) {
    const { templateId } = params;

    return await TemplateService.getTemplate(templateId);
}