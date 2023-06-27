import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LimeSurveyAdapter from '../services/lime-survey-adapter';

const limeSurveyAdapter = new LimeSurveyAdapter();

const SurverysList = () => {
    const navigate = useNavigate();

    const [ surveys, setSurveys ] = useState([]);

    const getSurveys = useCallback(async () => {
        const surveysList = await limeSurveyAdapter.surveyList();

        setSurveys(surveysList);
    }, []);

    const addSurvey = useCallback(async () => {
        const title = prompt("Enter survey title:", "");
        if (!title) {
            return;
        }

        await limeSurveyAdapter.surveyAdd(1, title);

        getSurveys();
    }, []);

    const deleteSurvey = useCallback(async (id) => {
        const confirmed = confirm("delete?");

        if (confirmed) {
            await limeSurveyAdapter.surveyDelete(id);

            getSurveys();
        }
    }, []);

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <main>
            <ul>
                {surveys.map((survey: any) => (
                    <li key={survey.sid}>
                        {JSON.stringify(survey)}
                        <Button onClick={() => deleteSurvey(survey.sid)}>
                            Delete
                        </Button>
                        <Button onClick={() => navigate(`${survey.sid}/groups`)}>
                            Show groups
                        </Button>
                    </li>
                ))}
            </ul>
            <Button onClick={addSurvey}>
                Add survey
            </Button>
        </main>
    );
}

export default SurverysList;