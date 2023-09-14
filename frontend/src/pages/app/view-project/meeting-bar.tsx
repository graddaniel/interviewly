import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { ProjectTypes } from 'shared';

import IconButton from '../../../components/icon-button/icon-button';

import classes from './meeting-bar.module.css';
import PaperSheetsIconBlack from 'images/paper-sheets-icon-black.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import { APP_FORMS_ROUTES } from '../../../consts/routes';


type MeetingBarProps = {
    date: Date,
    duration: ProjectTypes.Duration,
    uuid: string,
};

const MeetingBar = ({
    date,
    duration,
    uuid,
}: MeetingBarProps) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { resolvedLanguage } = i18n;

    const momentDate = moment(date).locale(resolvedLanguage as string);

    return (
        <div className={classes.meetingBar}>
            <IconButton
                className={classNames(classes.iconButton)}
                icon={PaperSheetsIconBlack}
                onClick={() => navigate(generatePath(
                    APP_FORMS_ROUTES.MEETING.PATH, { meetingId: uuid }
                ))}
            />
            <div className={classes.date}>
                <span>{momentDate.format('D MMMM')}</span>
                <span>{momentDate.format('h:mm a')}</span>
            </div>
            <div className={classes.duration}>
                {duration} min
            </div>
        </div>
    );
};

export default MeetingBar;