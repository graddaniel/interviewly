import axios from 'axios';
import { ProjectTypes } from 'shared';

import { API_HOST } from 'config/current';


export default class ProjectService {
    static createProject = async (title: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.post(`${API_HOST}/projects`, {
            title,
        }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getProject = async (uuid: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/projects/${uuid}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getAllProjects = async () => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(`${API_HOST}/projects`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static updateProject = async (
        projectId: string,
        formData
    ) => {
        const bodyFormData = new FormData();

        const formDataObject = Object.entries(formData);

        const step = parseInt(formData.step, 10);
        for (const [key, value] of formDataObject) {
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
                case 'otherRequirements':
                case 'startDate':
                case 'endDate':
                    bodyFormData.append(key, value as string);
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
                case 'addLanguageTest':
                case 'addScreeningSurvey':
                case 'requireCandidateRecording':
                case 'transcriptionNeeded':
                case 'moderatorNeeded':
                    // skip and handle below;
                    // false values are not present in the bodyFormData 
                    break;
                default:
                    console.log(`Unrecognized form field: ${key}`);
            }
        }

        if (step === ProjectTypes.EditSteps.Respondents) {
            for (const boolParamName of [
                'addLanguageTest',
                'addScreeningSurvey',
                'requireCandidateRecording'
            ]) {
                const booleanValue =
                    formDataObject.find(e => e[0] === boolParamName)
                    ? 'true'
                    : 'false';
                bodyFormData.append(boolParamName, booleanValue);
            }
        } else if (step === ProjectTypes.EditSteps.Details) {
            for (const boolParamName of [
                'transcriptionNeeded',
                'moderatorNeeded',
            ]) {
                const booleanValue =
                    formDataObject.find(e => e[0] === boolParamName)
                    ? 'true'
                    : 'false';
                bodyFormData.append(boolParamName, booleanValue);
            }
        }

        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        return axios.patch(`${API_HOST}/projects/${projectId}`, bodyFormData, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': `bearer ${accessToken}`
            },
        });
    }

    static addSurvey = async (
        projectUuid: string,
        templateUuid: string,
        startDate: Date,
        endDate: Date,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        return axios.post(`${API_HOST}/projects/${projectUuid}/surveys`, {
            templateUuid,
            startDate,
            endDate,
        }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });
    }
}