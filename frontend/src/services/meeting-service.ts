import axios from 'axios';

import { API_HOST } from 'config/current';


export default class MeetingService {
    static getMeeting = async (meetingId: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/meetings/${meetingId}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}
