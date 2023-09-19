import React from 'react';

import { useLoaderHandler } from '../../../hooks/use-handlers';

import classes from './complete-survey.module.css';


const SurveyCompleted = () => {
    useLoaderHandler();

    const lastSurveyUuid = localStorage.getItem('lastSurveyUuid');

    return (
        <section className={classes.page}>
            {lastSurveyUuid}
        </section>
    );
};

export default SurveyCompleted;