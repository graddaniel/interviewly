import axios from 'axios';

import { API_HOST } from 'config/current';


export default class BulletinBoardService {
    static createRoom = async (
        projectUuid: string,
        bulletinBoardUuid: string,
        roomName: string,
        respondentUuids: string[],
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.post(
            `${API_HOST}/projects/${projectUuid}/bulletinBoards/${bulletinBoardUuid}/rooms`, {
                roomName,
                respondentUuids,
            }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getRoom = async (
        projectUuid: string,
        roomId: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(
            `${API_HOST}/projects/${projectUuid}/bulletinBoardRooms/${roomId}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
    
    static createThread = async (
        projectUuid: string,
        roomUuid: string,
        message: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.post(
            `${API_HOST}/projects/${projectUuid}/bulletinBoardRooms/${roomUuid}/threads`, {
                message,
            }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static postResponse = async (
        projectUuid: string,
        threadUuid: string,
        message: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.post(
            `${API_HOST}/projects/${projectUuid}/bulletinBoardThreads/${threadUuid}`, {
                message,
            }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}