import React from 'react';
import moment from 'moment';

import classes from './interview-tile.module.css';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { APP_FORMS_ROUTES } from '../../../consts/routes';


type InterviewTileProps = {
    uuid: string;
    duration: string;
    date: Date;
};

const InterviewTile = ({
    uuid,
    duration,
    date,
}: InterviewTileProps) => {
    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;
    const navigate = useNavigate();

    //TODO use standardizeDate
    const momentDate = moment(date).locale(resolvedLanguage as string);
    const day = momentDate.format('dddd D MMMM');;
    const time = momentDate.format('LT');

    return (
        <section
            className={classes.interviewTile}
            onClick={() => navigate(generatePath(
                APP_FORMS_ROUTES.MEETING.PATH,
                { meetingId: uuid }
            ))}
        >
            <div className={classes.duration}>
                {duration} min
            </div>
            <div className={classes.date}>
                <span>{day}</span>
                <span>{time}</span>
            </div>
        </section>
    );
};

export default InterviewTile;