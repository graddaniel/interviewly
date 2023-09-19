import React from 'react';
import classNames from 'classnames';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import classes from './attached-surveys.module.css';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import moment from 'moment';
import { APP_ROUTES } from '../../../consts/routes';
import { useLoaderHandler } from '../../../hooks/use-handlers';

function isSurveyActive(
    startDateString: string,
    endDateString: string,
) {
    const startDate = moment(startDateString);
    const endDate = moment(endDateString);

    return moment().isAfter(startDate) && moment().isBefore(endDate);
}

const AttachedSurveysStep = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { data } = useLoaderHandler();

    if (!data) {
        return null;
    }

    const surveys = data.project?.surveys;

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
                    onClick={() => navigate(
                        generatePath(APP_ROUTES.PROJECT_SURVEY.PATH, {
                            projectId,
                            surveyId: survey.uuid,
                        }))}
                />
            ))}
        </section>
    );
};

export default AttachedSurveysStep;