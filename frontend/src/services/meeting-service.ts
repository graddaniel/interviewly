import axios from 'axios';

import { API_HOST } from 'config/current';


export default class MeetingService {
    static getAllMeetings = async ({
        sort,
        limit
    }: {
        sort?: string,
        limit?: number,
    } = {}) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const searchParams = new URLSearchParams();
        if (sort) {
            searchParams.set('sort', sort);
        }
        if (limit) {
            searchParams.set('limit', ""+limit);
        }
        const queryString = searchParams.toString();

        const response = await axios.get(`${API_HOST}/meetings${queryString ? '?'+queryString : queryString}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getOneMeetingRoom = async (
        meetingId: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/meetings/${meetingId}/room`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static closeMeeting = async (
        meetingId: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.delete(`${API_HOST}/meetings/${meetingId}/room`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}
