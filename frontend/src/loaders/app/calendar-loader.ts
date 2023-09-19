import MeetingService from "../../services/meeting-service";


export default async function CalendarLoader () {
    try {
        const meetings = await MeetingService.getAllMeetings();

        return {
            success: true,
            data: {
                meetings,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}