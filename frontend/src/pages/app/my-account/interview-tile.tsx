import React from 'react';
import moment from 'moment';

import classes from './interview-tile.module.css';


const InterviewTile = ({
    duration,
    date,
}) => {
    const day = moment(date).format('dddd D MMMM');;
    const time = moment(date).format('LT');

    return (
        <section className={classes.interviewTile}>
            <div className={classes.duration}>
                {duration}
            </div>
            <div className={classes.date}>
                <span>{day}</span>
                <span>{time}</span>
            </div>
        </section>
    );
};

export default InterviewTile;