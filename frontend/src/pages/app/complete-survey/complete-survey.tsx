import React from 'react';

import classes from './complete-survey.module.css';


const SurveyCompleted = () => {
    const lastSurveyUuid = localStorage.getItem('lastSurveyUuid');

    return (
        <section className={classes.page}>
            {lastSurveyUuid}
        </section>
    );
};

export default SurveyCompleted;