import ProjectService from '../../services/project-service';


const ProjectsLoader = async ({
}) => {
    return ProjectService.getProjects();
};

export default ProjectsLoader;