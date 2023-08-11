import ProjectService from "../../services/project-service";

export default async function LibraryEditorAction ({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());

    console.log(formData);

    const newSurvey = {
        name: formData.surveyTitle,
        languages: JSON.parse(formData.languages),
        questions: JSON.parse(formData.questions),
    };

    console.log(newSurvey);

    ProjectService.addSurvey(0, newSurvey)

    return null;
}