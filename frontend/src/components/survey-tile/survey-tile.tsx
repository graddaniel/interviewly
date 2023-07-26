import React from 'react';

import IconButton from '../icon-button/icon-button';

import classes from './survey-tile.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';


type SurveyTileProps = {
    name: string;
    onClick: () => void;
};

const SurveyTile = ({
    name,
    onClick,
}: SurveyTileProps) => {
    return (
        <div className={classes.tile} onClick={onClick}>
            <IconButton
                className={classes.icon}
                icon={FoldersIconBlack}
                onClick={() => {}}
            />
            <span className={classes.name}>{name}</span>
        </div>
    );
};

export default SurveyTile;