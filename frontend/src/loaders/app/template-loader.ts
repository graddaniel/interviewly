import TemplateService from "../../services/template-service";


export default async function TemplateLoader ({
    params,
}) {
    const { templateId } = params;

    try {
        const templateInfo = await TemplateService.getTemplate(templateId);

        return {
            success: true,
            data: {
                templateInfo,
            },
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}