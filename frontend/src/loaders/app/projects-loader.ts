import ProjectService from '../../services/project-service';


const ProjectsLoader = async ({
}) => {
    try {
        const projects = await ProjectService.getProjects();

        return {
            success: true,
            projects,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

export default ProjectsLoader;