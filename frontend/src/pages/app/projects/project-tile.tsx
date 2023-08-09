import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { generatePath, useNavigate } from 'react-router-dom';

import IconButton from '../../../components/icon-button/icon-button';
import { APP_ROUTES } from '../../../../src/consts/routes';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './project-tile.module.css'
import PaperSheetsIconBlack from 'images/paper-sheets-icon-black.svg';
import MetricsIconBlack from 'images/metrics-icon-black.svg';
import { useTranslation } from 'react-i18next';


const ProjectTile = ({
    avatarUrl,
    title,
    type,
    startDate,
    endDate,
    status,
    uuid,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const formattedStartDate = moment(startDate).format('l');
    const formattedEndDate = moment(endDate).format('l');

    return (
        <section className={classes.projectTile}>
            <img className={classes.avatar} src={avatarUrl}/>
            <IconButton
                className={classes.copyButton}
                icon={PaperSheetsIconBlack}
                onClick={() => console.log("TODO copy project")}
            />
            <IconButton
                className={classes.projectButton}
                icon={MetricsIconBlack}
                onClick={() => navigate(generatePath(APP_ROUTES.VIEW_PROJECT.PATH, { projectId: uuid }))}
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
                {capitalizeFirstLetter(t(`projectStatuses.${status}`))}
            </div>
        </section>
    );
};

export default ProjectTile;