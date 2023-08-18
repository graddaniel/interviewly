import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import IconButton from '../../../components/icon-button/icon-button';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './survey-bar.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import { useTranslation } from 'react-i18next';


type SurveyBarProps = {
    startDate: Date,
    endDate: Date,
    url: string,
    hasFinished: boolean,
};

function getSurveyStatus(
    endDate: moment.Moment,
    hasFinished: boolean,
) {
    if (hasFinished) {
        return 'filled';
    }

    if (moment().isAfter(endDate)) {
        return 'ended';
    }

    return 'pending';
}

const SurveyBar = ({
    startDate: startDateRaw,
    endDate: endDateRaw,
    url,
    hasFinished,
}: SurveyBarProps) => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const startDate = moment(startDateRaw).locale(resolvedLanguage as string);
    const endDate = moment(endDateRaw).locale(resolvedLanguage as string);
    const status = getSurveyStatus(endDate, hasFinished);

    return (
        <div className={classes.surveyBar}>
            <IconButton
                className={classes.iconButton}
                icon={FoldersIconBlack}
                onClick={() => window.open(url, '_blank')}
            />
            <div className={classes.startDate}>
                <span>{startDate.format('D MMMM')}</span>
                <span>{startDate.format('h:mm a')}</span>
            </div>
            <div className={classes.endDate}>
                <span>{endDate.format('D MMMM')}</span>
                <span>{endDate.format('h:mm a')}</span>
            </div>
            <div className={
                classNames(
                    classes.status,
                    classes[status],
                )
            }>
                {capitalizeFirstLetter(
                    t(`viewProject.respondentPage.surveysStatuses.${status}`)
                )}
            </div>
        </div>
    );
};

export default SurveyBar;