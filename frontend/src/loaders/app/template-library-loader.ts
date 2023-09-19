import TemplateService from "../../services/template-service";


export default async function TemplateLibraryLoader () {
    try {
        const templates = await TemplateService.getAllTemplates();
        
        return {
            success: true,
            data: {
                templates,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}