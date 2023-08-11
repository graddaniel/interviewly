import ProjectService from '../../services/project-service';


const EditProjectLoader = async ({
    params,
}) => {
    const { projectId } = params;

    return ProjectService.getProject(projectId);
};

export default EditProjectLoader;