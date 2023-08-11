import ProjectService from '../../services/project-service';


const ProjectsLoader = async ({
}) => {
    return ProjectService.getAllProjects();
};

export default ProjectsLoader;