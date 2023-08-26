import MeetingService from "../../services/meeting-service";


export default async function MeetingLoader({
    params,
}) {
    const { meetingId } = params;

    const room = await MeetingService.getOneMeetingRoom(meetingId);

    return room;
}