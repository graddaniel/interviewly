import MeetingService from "../../services/meeting-service";


export default async function CalendarLoader () {
    const meetings = await MeetingService.getAllMeetings();

    return meetings;
}