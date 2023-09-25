import { Op } from "sequelize";

import ProjectsService from "../services/projects-service/projects-service";

export default function SendUpcomingProjectsEmailReminders (
    projectsService: ProjectsService
) {
    const now = new Date();
    const inAnHour = new Date(now);
    inAnHour.setHours(inAnHour.getHours() + 1);

    const upcomingProjects = projectsService.getAllProjects({
        startDate: {
            [Op.between]: [now, inAnHour],
        }
    });

    console.log(upcomingProjects)
}