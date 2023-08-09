import React from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import Pill from '../../../components/pill/pill';

import classes from './bulletin-board-tile.module.css';
import classNames from 'classnames';


type BulletinBoardTileProps = {
    className?: string;
    startDate: Date;
    endDate: Date;
    membersCount: number;
    onClick: () => void;
};

const BulletinBoardTile = ({
    className,
    startDate,
    endDate,
    membersCount,
    onClick,
}: BulletinBoardTileProps) => {
    const { i18n, t } = useTranslation();
    const { resolvedLanguage } = i18n;

    const start = moment(startDate).locale(resolvedLanguage as string);
    const end = moment(endDate).locale(resolvedLanguage as string);

    return (
        <div className={classNames(classes.tile, className)} onClick={onClick}>
            <span className={classes.title}>Bulletin Board</span>
            <Pill
                className={classes.pill}
                text={`${membersCount} ${t('viewProject.methodology.onlineCommunity.membersLabel')}`}
            />
            <div className={classes.date}>
                <span className={classes.datePart}>{start.format('D MMMM')}</span>
                <span className={classes.datePart}>{start.format('h:mm a')}</span>
            </div>
            <div className={classes.date}>
                <span className={classes.datePart}>{end.format('D MMMM')}</span>
                <span className={classes.datePart}>{end.format('h:mm a')}</span>
            </div>
        </div>
    );
};

export default BulletinBoardTile;