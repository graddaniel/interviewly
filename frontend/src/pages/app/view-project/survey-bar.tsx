import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

import IconButton from '../../../components/icon-button/icon-button';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './survey-bar.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import { useTranslation } from 'react-i18next';


type SurveyBarProps = {
    startDate: Date,
    endDate: Date,
    uuid: string,
    url?: string,
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
    uuid,
    url,
    hasFinished,
}: SurveyBarProps) => {
    const { t, i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const startDate = moment(startDateRaw).locale(resolvedLanguage as string);
    const endDate = moment(endDateRaw).locale(resolvedLanguage as string);
    const status = getSurveyStatus(endDate, hasFinished);

    const handleClick = () => {
        if (!url) {
            return;
        }

        localStorage.setItem('lastSurveyUuid', uuid);
        window.open(url, '_self');
    };

    return (
        <div className={classes.surveyBar}>
            <IconButton
                className={classNames(classes.iconButton, !url && classes.disableClick)}
                icon={FoldersIconBlack}
                onClick={handleClick}
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