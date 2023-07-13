import ResearchService from '../../services/research-service';


const EditProjectLoader = async ({
    params,
}) => {
    const { projectId } = params;

    return ResearchService.getResearch(projectId);
};

export default EditProjectLoader;