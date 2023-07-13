import ResearchService from '../../services/research-service';


const ProjectsLoader = async ({
}) => {
    return ResearchService.getAllResearch();
};

export default ProjectsLoader;