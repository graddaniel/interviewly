
import axios from "axios";
import config from 'config';
import 'dotenv/config';

const username = process.env.LS_USER as string;
const password = process.env.LS_PASSWORD as string;

type LimesurveyConfig = {
    apiUrl: string;
};

export default class LimeSurveyAdapter {
    private limeSurveyAPIUrl: string;
    private username: string;
    private password: string;
    private sessionKey: string;

    constructor() {
        const limesurveyConfig = config.get('limesurvey') as LimesurveyConfig;
        this.limeSurveyAPIUrl = limesurveyConfig.apiUrl;
        this.username = username;
        this.password = password;
    }

    private _generateOptions = () => {
        return {
            url: this.limeSurveyAPIUrl,
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
        };
    }

    private _sendRequest = async (
        method: string,
        params: (string | number)[],
    ) => {
        const options: any = this._generateOptions();
        options.data = JSON.stringify({ method, params, id:1} );

        const result = await axios(options);
        console.log(JSON.stringify(result.data.result))
    
        return result.data.result;
    }

    createSessionKey = async () => {
        const key = await this._sendRequest('get_session_key', [this.username, this.password]);

        this.sessionKey = key;

        return key;
    }

    releaseSessionKey = async () => {
        return this._sendRequest('release_session_key', [this.sessionKey]);
    }

    addSurvey = async (
        desiredId: number,
        title: string,
        language: string,
    ) => {
        return this._sendRequest('add_survey', [this.sessionKey, desiredId, title, language]);
    }

    addLanguage = async (
        surveyId: number,
        languageCode: string,
    ) => {
        return this._sendRequest('add_language', [this.sessionKey, surveyId, languageCode]);
    }

    addGroup = async (
        surveyId: number,
        groupName: string,
    ) => {
        return this._sendRequest('add_group', [this.sessionKey, surveyId, groupName]);
    }

    questionImport = async (
        surveyId: number,
        groupId: number,
        base64lsqQuestion: string,
        mandatory: string,
    ) => {
        return this._sendRequest('import_question', [this.sessionKey, surveyId, groupId, base64lsqQuestion, 'lsq', mandatory]);
    }
}