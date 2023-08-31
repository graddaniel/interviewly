import { redirect } from "react-router-dom";
import { APP_ROUTES } from "../../consts/routes";
import MeetingService from "../../services/meeting-service";
import { getAuth } from "../../hooks/useAuth";
import { ProfileTypes } from "shared";

export default async function MeetingAction ({
    params,
}) {
    const auth = getAuth();

    if (auth.currentUser?.role !== ProfileTypes.Role.Admin
        && auth.currentUser?.role !== ProfileTypes.Role.Moderator) {
        return redirect(APP_ROUTES.CALENDAR.PATH);
    }

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