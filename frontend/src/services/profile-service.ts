import axios from 'axios';

import { API_HOST } from 'config/current';


export default class ProfileService {
    static getProfile = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/accounts/profile`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static updateProfile = async (profileData) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.patch(`${API_HOST}/accounts/profile`, profileData, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static uploadCV = async (
        uploadUrl: string,
        file,
    ) => {
        await axios.put(uploadUrl, file, {
            headers: {
                'content-type': file.type,
            },
        });

        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        await axios.put(`${API_HOST}/accounts/profile/cv`, {}, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });
    }

    static getCVUploadUrl = async (): Promise<string> => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/accounts/profile/cv/uploadLink`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}