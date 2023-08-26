import { redirect } from "react-router-dom";
import { APP_ROUTES } from "../../consts/routes";
import MeetingService from "../../services/meeting-service";

export default async function MeetingAction ({
    params,
}) {
    const { meetingId } = params;

    try {
        const closedRoomId = await MeetingService.closeMeeting(meetingId);
        console.log(closedRoomId);
    } catch (error) {
        return {
            success: false,
            errors: {
                generic: error,
            },
        };
    }

    return redirect(APP_ROUTES.CALENDAR.PATH);
}