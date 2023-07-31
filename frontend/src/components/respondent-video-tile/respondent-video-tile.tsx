import React from 'react';
import classNames from 'classnames';

import classes from './respondent-video-tile.module.css';
import PlayIconBlack from 'images/play-icon-black.svg';
import PlayIconNarrow from 'images/play-icon-narrow.svg';


type RespondentVideoTileProps = {
    className?: string;
    coverUrl: string;
};

const RespondentVideoTile = ({
    className,
    coverUrl,
}: RespondentVideoTileProps) => {
    return (
        <div className={classNames(classes.respondentVideoTile, className)}>
            <div className={classes.header}>
                <img className={classes.icon} src={PlayIconBlack} />
                <span className={classes.title}>Respondent Video</span>
            </div>
            <div className={classes.cover} style={{ backgroundImage: `url(${coverUrl})` }}>
                <div className={classes.playButton}>
                    <img className={classes.playIcon} src={PlayIconNarrow} />
                </div>
            </div>
        </div>
    );
};

export default RespondentVideoTile;