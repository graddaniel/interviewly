import moment from "moment";
import { t } from "i18next";

import ProjectService from "../../services/project-service";


export default async function ProjectRespondentAction({
    request,
    params,
}) {
    const {
        meetingDateAndTime: meetingDateString,
    } = Object.fromEntries(await request.formData());

    const meetingDate = parseInt(meetingDateString, 10);

    const {
        projectId: projectUuid,
        respondentId: respondentAccountUuid,
    } = params;
    
    if(moment().isAfter(new Date(meetingDate))) {
        return {
            success: false,
            errors: {
                meetingDate: t('validation.projectRespondent.meetingDateError'),
            },
        };
    }

    try {
        await ProjectService.scheduleProjectMeeting(
            projectUuid,
            respondentAccountUuid,
            meetingDate,
        );
    } catch (error) {
        return {
            success: false,
            errors: {
                generic: error,
            },
        };
    }

    return {
        success: true,
    };
}