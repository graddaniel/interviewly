import React from 'react';
import classNames from 'classnames';
import { useLoaderData } from 'react-router-dom';

import classes from './attached-surveys.module.css';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import moment from 'moment';

function isSurveyActive(
    startDateString: string,
    endDateString: string,
) {
    const startDate = moment(startDateString);
    const endDate = moment(endDateString);

    return moment().isAfter(startDate) && moment().isBefore(endDate);
}

const AttachedSurveysStep = () => {
    const loaderData = useLoaderData() as any;

    const surveys = loaderData?.project?.surveys;

    console.log(surveys)

    return (
        <section className={classes.surveysStep}>
            {surveys.map(survey => (
                <SurveyTile
                    key={survey.uuid}
                    className={classNames(
                        classes.regularCursor,
                    )}
                    disabled={!isSurveyActive(survey.startDate, survey.endDate)}
                    name={survey.name}
                    onClick={() => {}}
                />
            ))}
        </section>
    );
};

export default AttachedSurveysStep;