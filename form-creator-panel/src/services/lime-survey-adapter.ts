import axios from 'axios';


const USERNAME = "testUser";
const PASSWORD = "Pass1234567890";
const API_URL = "http://127.0.0.1/limesurvey/index.php/admin/remotecontrol";


export default class LimeSurveyAdapter {
    private static sessionKey: string;

    constructor() {
        console.log("Survery service ctor")
    }

    private _sendRequest = async (
        method: string,
        params: any[],
        useSessionKey = true) => {
        const response = await axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: JSON.stringify({
                method,
                params: useSessionKey ? [LimeSurveyAdapter.sessionKey, ...params] : params,
                id:1
            }),
            url: API_URL,
        });

        console.log("Received response: ", response);
        const { result } = response.data;

        const { status } = result;
        if (status === "Invalid session key") {
            await this.getSessionKey();

            return await this._sendRequest(method, params);
        } else if (status === 'OK') {
            //do nothing
        } else if (status) {
            throw new Error(status);
        }

        return result;
    }
    
    getSessionKey = async () => {
        const sessionKey = await this._sendRequest('get_session_key', [USERNAME, PASSWORD], false);

        LimeSurveyAdapter.sessionKey = sessionKey;

        return sessionKey;
    }

    surveyAdd = async (desiredSurveyId, title, language = 'en') => //more params
        this._sendRequest('add_survey', [desiredSurveyId, title, language]);
    surveyDelete = async (surveyId) =>
        this._sendRequest('delete_survey', [surveyId]);
    surveyList = async (username = null) =>
        this._sendRequest('list_surveys', [username]);
    surveyActivate = async (surveyId) =>
        this._sendRequest('activate_survey', [surveyId]);
    //survey copy
    //survey import
    //    surveyGetProperties = async () => {}
    //setSurveyProperties

    groupAdd = async (surveyId, title) => //description
        this._sendRequest('add_group', [surveyId, title]);
    groupDelete = async (surveyId, groupId) =>
        this._sendRequest('delete_group', [surveyId, groupId]);
    groupList = async (surveyId) => { //language
        try {
            return await this._sendRequest('list_groups', [surveyId]);
        } catch (error) {
            if (error.message === 'No groups found') {
                return [];
            }

            throw error;
        }
    };
    surveyGroupList = async (useUsername) => //language
        this._sendRequest('list_survey_groups', [useUsername ? USERNAME : null]);
    //get_group_properties
    //set_group_properties
    //import_group

    questionsList = async (surveyId: number) =>
        this._sendRequest('list_questions', [surveyId]);
    questionImport = async (surveyId: number, groupId: number, base64lsqQuestion, mandatory) => 
        this._sendRequest('import_question', [surveyId, groupId, base64lsqQuestion, 'lsq', mandatory]);
    questionDelete = async (questionId: number) =>
        this._sendRequest('delete_question', [questionId]);
}

/*
TODO

add_language
delete_language
get_language_properties
set_language_properties

add_participants
cpd_importParticipants
delete_participants
invite_participants
list_participants
mail_registered_participants
remind_participants
get_participant_properties
set_participant_properties

delete_question
get_question_properties
list_questions
import_question
set_question_properties

add_quota
delete_quota
get_quota_properties
list_quotas
set_quota_properties

add_response
delete_response
export_responses
export_responses_by_token
get_response_ids
update_response

get_available_site_settings
get_site_settings
export_statistics
export_timeline
get_fieldmap
activate_tokens
get_summary
get_session_key
release_session_key
list_users
get_uploaded_files
upload_file
*/