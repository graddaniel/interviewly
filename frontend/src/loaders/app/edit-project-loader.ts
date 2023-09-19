import ProjectService from '../../services/project-service';


const EditProjectLoader = async ({
    params,
}) => {
    const { projectId } = params;

    try {
        const project = await ProjectService.getProject(projectId);
        
        return {
            success: true,
            data: {
                project,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }

};

export default EditProjectLoader;