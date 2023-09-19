import MeetingService from "../../services/meeting-service";


export default async function MeetingLoader({
    params,
}) {
    const { meetingId } = params;

    try {
        const room = await MeetingService.getOneMeetingRoom(meetingId);

        return {
            success: true,
            data: {
                room,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}