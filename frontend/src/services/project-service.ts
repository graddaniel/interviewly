import axios from 'axios';
import readXlsxFile from 'read-excel-file'
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

    static getProjects = async (userUuid?: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const searchParams = new URLSearchParams();
        if (userUuid) {
            searchParams.set('userUuid', userUuid);
        }
        const queryString = searchParams.toString();

        const response = await axios.get(`${API_HOST}/projects${queryString ? '?'+queryString : ''}`, {
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
                    if (!value) {
                        break;
                    }

                    const avatarFiles = (document.getElementById(key) as HTMLInputElement).files;
                    if (!avatarFiles) {
                        console.error(`${key} is missing the file data`)
                        break;
                    }

                    bodyFormData.append(key, avatarFiles[0]);
                    break;
                case 'respondentsFile':
                    if (!value) {
                        break;
                    }

                    const respondentsFiles = (document.getElementById(key) as HTMLInputElement).files;

                    console.log("files", respondentsFiles)
                    if (!respondentsFiles) {
                        console.error(`${key} is missing the file data`)
                        break;
                    }
                    const fileData = await readXlsxFile(respondentsFiles[0]) as any;

                    const respondents = fileData.slice(1).map(row => ({
                        email: row[0],
                        language: row[1],
                        gender: row[2],
                    }));

                    bodyFormData.append('respondents', JSON.stringify(respondents));
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

    static markProjectAsPaid = async (projectUuid: string) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        return axios.patch(`${API_HOST}/projects/${projectUuid}/status`, {
        }, {
            headers: {
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

    static getProjectRespondent = async (
        projectUuid: string,
        respondentUuid: string,    
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(
            `${API_HOST}/projects/${projectUuid}/respondents/${respondentUuid}`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static scheduleProjectMeeting = async (
        projectUuid: string,
        respondentUuid: string,
        meetingDate: number,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.put(
            `${API_HOST}/projects/${projectUuid}/respondents/${respondentUuid}/meetings`,
            { meetingDate }, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }

    static getProjectMeetings = async (
        projectUuid: string,
    ) => {
        const accessToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

        const response = await axios.get(
            `${API_HOST}/projects/${projectUuid}/meetings`, {
            headers: {
                'authorization': `bearer ${accessToken}`
            },
        });

        const { data } = response;

        return data;
    }
}