import { AccountTypes } from "shared";
import { AccountModel, CompanyModel, MeetingModel, ProjectModel, RecruiterProfileModel, RespondentProfileModel } from "../../models";

type MeetingsQuery = {
    from?: Date;
    to?: Date;
}

export default class MeetingsService {
    constructor() {}

    //TODO query
    getMeetings = async (
        userUuid: string,
        accountType: AccountTypes.Type,
    ) => {
        const meetings = accountType === AccountTypes.Type.RECRUITER
            ? await this.getAllRecruiterMeetings(userUuid)
            : await this.getAllRespondentMeetings(userUuid);

        return meetings;
    }

    getAllRecruiterMeetings = async (
        userUuid: string,
    ): Promise<ProjectModel[]> => {
        const accounts = await AccountModel.findAll({
            attributes: ['uuid'],
            where: {
                uuid: userUuid,
            },
            include: [{
                attributes: ['CompanyId'],
                association: AccountModel.associations.RecruiterProfileModel,
                include: [{
                    attributes: ['id'],
                    association: RecruiterProfileModel.associations.CompanyModel,
                    include: [{
                        attributes: ['id', 'meetingDuration'],
                        association: CompanyModel.associations.ProjectModel,
                        include: [{
                            attributes: ['uuid', 'date'],
                            association: ProjectModel.associations.MeetingModel,
                        }],
                    }],
                }]
            }],
        });

        //@ts-ignore
        const projectsModels = accounts[0].RecruiterProfile.Company.Projects;
        const nestedMeetings = projectsModels.map(projectModel => {
            const project = projectModel.toJSON();

            const {
                Meetings,
                meetingDuration: duration,
                ...projectData
            } = project;

            return Meetings.map(m => ({
                ...m,
                duration,
            }));
        });
        const meetings = nestedMeetings.flat();

        return meetings;
    }

    getAllRespondentMeetings = async (
        userUuid: string,
    ): Promise<ProjectModel[]> => {
        const accounts = await AccountModel.findAll({
            attributes: ['uuid'],
            where: {
                uuid: userUuid,
            },
            include: [{
                association: AccountModel.associations.RespondentProfileModel,
                attributes: ['id'],
                include: [{
                    attributes: ['uuid', 'date'],
                    association: RespondentProfileModel.associations.MeetingModel,
                    include: [{
                        association: MeetingModel.associations.ProjectModel,
                        attributes: ['meetingDuration'],
                    }],
                }]
            }],
        });

        //@ts-ignore
        const meetingsModels = accounts[0].RespondentProfile.Meetings;
        const meetings = meetingsModels.map(meetingModel => {
            const {
                Project,
                ...meetingData
            } = meetingModel.toJSON();

            return {
                ...meetingData,
                duration: Project.meetingDuration,
            };
        })

        return meetings; 
    }
}