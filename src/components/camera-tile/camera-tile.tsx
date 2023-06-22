import React from 'react';
import classNames from 'classnames';

import classes from './camera-tile.module.css';

import PlayIcon from '../../../images/play-icon.svg';
import RecordIcon from '../../../images/record-icon.svg';


const CameraTile = ({
    className,
    onClick,
}) => {
    return (
        <div
            className={classNames(classes.tile, className)}
            onClick={onClick}
        >
            <div className={classes.camera}>
                <div className={classes.lens}></div>
            </div>
            <div className={classes.buttons}>
                <img className={classes.icon} src={PlayIcon}/>
                <img src={RecordIcon} />
            </div>
        </div>
    );
};

export default CameraTile;