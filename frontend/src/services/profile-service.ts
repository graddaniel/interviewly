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

    static cvUploaded = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        return axios.put(`${API_HOST}/accounts/profile/cv`, {}, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });
    }

    static uploadCVFile = async (
        uploadUrl: string,
        file,
    ) => {
        return axios.put(uploadUrl, file, {
            headers: {
                'content-type': file.type,
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