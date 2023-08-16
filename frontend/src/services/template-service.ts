import axios from 'axios';

import { API_HOST } from 'config/current';


export default class TemplateService {
    static createTemplate = async (template: any) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.post(`${API_HOST}/templates`, template, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getTemplate = async (templateUuid: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/templates/${templateUuid}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;
        console.log(data)
        return data;
    }

    static getAllTemplates = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/templates`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static updateTemplate = async (
        templateId: string,
        newTemplateData: any,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.patch(`${API_HOST}/templates/${templateId}`, newTemplateData, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}