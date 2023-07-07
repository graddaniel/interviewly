import React from 'react';
import moment from 'moment';
import classNames from 'classnames';

import IconButton from '../../../components/icon-button/icon-button';

import classes from './project-bar.module.css'
import PaperSheetsIconBlack from '~/images/paper-sheets-icon-black.svg';
import MetricsIconBlack from '~/images/metrics-icon-black.svg';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';


const ProjectBar = ({
    avatarUrl,
    title,
    type,
    startDate,
    endDate,
    status,
}) => {
    const formattedStartDate = moment(startDate).format('l');
    const formattedEndDate = moment(endDate).format('l');

    return (
        <section className={classes.projectBar}>
            <img className={classes.avatar} src={avatarUrl}/>
            <IconButton
                className={classes.copyButton}
                icon={PaperSheetsIconBlack}
                onClick={() => console.log("TODO copy project")}
            />
            <IconButton
                className={classes.projectButton}
                icon={MetricsIconBlack}
                onClick={() => console.log("TODO idk what does this do")}
            />
            <span className={classes.title}>
                {title}
            </span>
            <span className={classes.type}>
                {type}
            </span>
            <div className={classes.dates}>
                <span>{formattedStartDate}</span>
                <span className={classes.hyphen}>-</span>
                <span>{formattedEndDate}</span>
            </div>
            <div className={classNames(classes.status, classes[status])}>
                {capitalizeFirstLetter(status)}
            </div>
        </section>
    );
};

export default ProjectBar;