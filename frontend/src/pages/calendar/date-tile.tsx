import React from 'react';

import classes from './date-tile.module.css';
import classNames from 'classnames';


type DateTileProps = {
    day: number;
    interviewsCount: number;
    selected: boolean;
    isToday: boolean;
    isThisMonth: boolean;
    onClick: () => void;
};

const DateTile = ({
    day,
    interviewsCount,
    selected,
    isToday,
    isThisMonth,
    onClick,
}: DateTileProps) => {
    return (
        <section
            className={classNames(
                classes.dateTile,
                isToday && classes.today,
                selected && classes.selected,
                !isThisMonth && classes.otherMonth,
            )}
            onClick={onClick}
        >
            <span className={classes.day}>{day}</span>
            {interviewsCount > 0 && (
                <div className={classNames(
                    classes.interviews,
                    selected && classes.highlightedInterviews
                )}>
                    {interviewsCount}
                </div>
            )}
        </section>
    );
};

export default DateTile;