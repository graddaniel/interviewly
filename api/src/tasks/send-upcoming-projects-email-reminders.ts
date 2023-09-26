import { Op } from "sequelize";
import config from "config";
import { t } from "i18next";

import RespondentProfileModel from "../models/respondent-profile";
import ProjectModel from "../models/project";
import MQAdapter from "../services/mq-adapter";
import { MeetingModel } from "../models";
import { ProjectTypes } from "shared";

const emailNotificationsQueueName: string
    = config.get('rabbitMq.emailNotificationsQueueName');

export default async function sendUpcomingProjectsEmailReminders (
    mqAdapter: MQAdapter,
) {
    const upcomingMeetings = await getUpcomingMeetings();

    const emailsData = await prepareEmailData(upcomingMeetings);

    //TODO check language
    emailsData.forEach(({
        name,
        email,
        companyName,
        projectName,
    }) => {
        mqAdapter.send(emailNotificationsQueueName, JSON.stringify({
            recipient: email,
            subject: t('email.upcomingMeetingReminder.subject', { lng: 'en', projectName }),
            template: 'upcoming-meeting-reminder',
            context: {
                welcomeMessage: t('email.upcomingMeetingReminder.welcomeMessage', { lng: 'en', name }),
                firstParagraph: t('email.upcomingMeetingReminder.paragraphs.first', { lng: 'en', companyName }),
                secondParagraph: t('email.upcomingMeetingReminder.paragraphs.second', { lng: 'en' }),
                thirdParagraph: t('email.upcomingMeetingReminder.paragraphs.third', { lng: 'en' }),
                signature: t('email.upcomingMeetingReminder.signature', { lng: 'en' }),
            },
        }));
    })
}

async function getUpcomingMeetings () {
    const now = new Date();
    const inAnHour = new Date(now);
    inAnHour.setHours(inAnHour.getHours() + 1);

    const upcomingMeetings = await MeetingModel.findAll({
        attributes: ['date', 'ProjectId'],
        where: {
            date: {
                [Op.between]: [now, inAnHour],
            },
        },
        include: [{
            association: MeetingModel.associations.ProjectModel,
            attributes: ['startDate', 'status', 'title', 'CompanyId', 'id'],
            where: {
                status: ProjectTypes.Status.InProgress,
            },
            include: [{
                association: ProjectModel.associations.RespondentProfileModel,
            }, {
                association: ProjectModel.associations.CompanyModel,
            }]
        }, {
            association: MeetingModel.associations.RespondentProfileModel,
            include: [{
                association: RespondentProfileModel.associations.AccountModel,
            }]
        }],

    });

    return upcomingMeetings;
}

async function prepareEmailData(upcomingMeetings: MeetingModel[]) {
    const emailData = upcomingMeetings.map(meeting => {
        const project = meeting.Project;
        const respondents = meeting.RespondentProfiles;

        return respondents.map(respondent => ({
            name: respondent.name,
            email: respondent.Account.email,
            companyName: project.Company.name,
            projectName: project.title
        }));
    });

    return emailData.flat();
}