import React from 'react';

import IconButton from '../icon-button/icon-button';

import classes from './survey-tile.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import Pill from '../pill/pill';
import classNames from 'classnames';


type SurveyTileProps = {
    name: string;
    onClick: () => void;
    status?: string;
};

const SurveyTile = ({
    name,
    onClick,
    status,
}: SurveyTileProps) => {
    return (
        <div className={classes.tile} onClick={onClick}>
            <IconButton
                className={classes.icon}
                icon={FoldersIconBlack}
                onClick={() => {}}
            />
            <span className={classes.name}>{name}</span>
            {status && (
                <Pill
                    className={classNames(classes.pill, classes[status.toLowerCase()])}
                    text={status === 'Finished' ? 'See results' : status}
                />
            )}
        </div>
    );
};

export default SurveyTile;