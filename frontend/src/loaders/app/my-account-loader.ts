import { getAuth } from "../../hooks/useAuth";
import MeetingService from "../../services/meeting-service";
import ProfileService from "../../services/profile-service";

export default async function MyAccountLoader({

}) {
    const auth = getAuth();
    if (!auth.currentUser) {
        return null;
    }

    const upcomingMeeting = await MeetingService.getAllMeetings({
        sort: 'date',
        limit: 1,
    });

    const profile = await ProfileService.getProfile(auth.currentUser?.uuid);

    return {
        upcomingMeeting: upcomingMeeting.length > 0 ? upcomingMeeting[0] : {},
        profile,
    };
}