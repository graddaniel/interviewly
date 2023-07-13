import axios from 'axios';

const API_HOST = 'http://localhost:7081';

export default class ResearchService {
    static createResearch = async (title: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.post(`${API_HOST}/research`, {
            title,
        }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getResearch = async (uuid: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/research/${uuid}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getAllResearch = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/research`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static updateResearch = async (
        projectId: string,
        formData
    ) => {
        const bodyFormData = new FormData();

        for (const [key, value] of Object.entries(formData)) {
            switch(key) {
                case 'step':
                case 'title':
                case 'description':
                case 'methodology':
                case 'participantsCount':
                case 'reserveParticipantsCount':
                case 'meetingDuration':
                case 'participantsPaymentCurrency':
                case 'participantsPaymentValue':
                    bodyFormData.append(key, value as string);
                    break;
                case '18-25':
                case '26-32':
                case '33-39':
                case '40-46':
                case 'male':
                case 'female':
                case 'automotive':
                case 'music':
                case 'painting':
                case 'sports':
                case 'languagesTest':
                case 'recording':
                case 'screening':
                    bodyFormData.append(key, value === 'on' ? 'true' : 'false');
                    break;
                case 'avatarFile':
                case 'respondentsFile':
                    const files = (document.getElementById(key) as HTMLInputElement).files;
                    if (!files) {
                        console.error(`${key} is missing the file data`)
                        break;
                    }

                    bodyFormData.append(key, files[0]);
                    break;
                default:
                    console.log(`Unrecognized form field: ${key}`);
            }
        }

        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        return axios.patch(`${API_HOST}/research/${projectId}`, bodyFormData, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `bearer ${accessToken}`
            },
        });
    }

    //TODO temp implementation; ultimately it will use a template obtained from the DB
    static addSurvey = async (projectId, surveyData) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        return axios.post(`${API_HOST}/research/${projectId}/survey`, surveyData, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `bearer ${accessToken}`
            },
        });
    }
}