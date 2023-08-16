import TemplateService from "../../services/template-service";


export default async function TemplateLibraryLoader () {
    return await TemplateService.getAllTemplates();
}