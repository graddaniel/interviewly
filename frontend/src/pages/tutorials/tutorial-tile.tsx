import React from 'react';
import classNames from 'classnames';

import classes from './tutorial-tile.module.css';

import InterviewlyUserIcon from '../../../images/interviewly-user-icon.png';
import YoutubeIcon from '../../../images/youtube-icon.svg';
import EyeIcon from '../../../images/eye-icon.svg';


type TutorialTileProps = {
    title: string;
    date: string;
    imageUrl: string;
    onClick: () => void;
    horizontalFlow?: boolean;
    viewsCount?: number;
};

const TutorialTile = ({
    title,
    date,
    imageUrl,
    onClick,
    horizontalFlow,
    viewsCount,
}: TutorialTileProps) => {
    return (
        <div className={horizontalFlow ? classes.horizontalTile : ''}>
            <div
                style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : '',
                }}
                className={classNames(
                    classes.thumbnail,
                    horizontalFlow ? classes.thumbnailHorizontal : '',
                )}
                onClick={onClick}
            >
                <img
                    className={classes.youtubeIcon}
                    src={YoutubeIcon}
                />
            </div>
            <h5 className={classNames(
                classes.title,
                horizontalFlow ? classes.titleHorizontal : '',
            )}>{title}</h5>
            {horizontalFlow && (
                <div className={classes.stats}>
                    <img className={classes.interviewlyIconHorizontal} src={InterviewlyUserIcon} />
                    <span className={classes.authorNameHorizontal}>Interviewly</span>
                    <span className={classes.date}>{date}</span>
                    <span className={classes.viewsHorizontal}>
                        <img className={classes.eyeIcon} src={EyeIcon}/>
                        {viewsCount} views
                    </span>
                </div>
            )}
            {!horizontalFlow && (<>
                <div className={classes.author}>
                    <img className={classes.interviewlyIcon} src={InterviewlyUserIcon} />
                    <span className={classes.authorName}>Interviewly</span>
                    <span className={classes.views}>
                        <img className={classes.eyeIcon} src={EyeIcon}/>
                        {viewsCount} views
                    </span>
                </div>
            </>)}
        </div>
    );
};

export default TutorialTile;