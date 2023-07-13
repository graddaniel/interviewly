import ResearchService from "../../services/research-service";

export default async function LibraryEditorAction ({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());

    console.log(formData);

    const newSurvey = {
        name: formData.templateName,
        languages: JSON.parse(formData.languages),
        questions: JSON.parse(formData.questions),
    };

    console.log(newSurvey);

    ResearchService.addSurvey(0, newSurvey)

    return null;
}