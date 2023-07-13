import React from 'react';
import classNames from 'classnames';
import { ResearchTypes } from 'shared';

import classes from './methodology-tile.module.css';
import ChatIconPurple from '~/images/chat-icon-purple.svg';
import PeopleIconPurple from '~/images/people-icon-purple.svg';
import EarthIconPurple from '~/images/earth-icon-purple.svg';
import ElementsIconPurple from '~/images/elements-icon-purple.svg';
import QuestionaireIconPurple from '~/images/respondent-icon.svg';

const METHODOLOGIES = {
    [ResearchTypes.Methodology.Interview]: {
        title: 'Interviews',
        text: 'I want to transfer data for statistical purposes.',
        icon: ChatIconPurple,
    },
    [ResearchTypes.Methodology.FocusGroups]: {
        title: 'Focus Groups',
        text: 'I want to transfer data for statistical purposes.',
        icon: PeopleIconPurple,
    },
    [ResearchTypes.Methodology.OnlineCommunities]: {
        title: 'Online Communities',
        text: 'I want to transfer data for statistical purposes.',
        icon: EarthIconPurple,
    },
    [ResearchTypes.Methodology.UXInterviews]: {
        title: 'UX Interviews',
        text: 'I want to transfer data for statistical purposes.',
        icon: ElementsIconPurple,
    },
    [ResearchTypes.Methodology.ProductTests]: {
        title: 'Product tests',
        text: 'I want to transfer data for statistical purposes.',
        icon: QuestionaireIconPurple,
    }
};

type MethodologyTileProps = {
    methodology: ResearchTypes.Methodology;
    onClick?: () => void;
    selected: boolean;
    mini?: boolean;
};

const MethodologyTile = ({
    methodology,
    onClick,
    selected,
    mini,
}: MethodologyTileProps) => {
    const handleTileClick = (e) => {
        e.preventDefault();
        onClick && onClick();
    };

    return (
        mini ? (
            <button
                type="button"
                className={classNames(classes.miniTile, selected ? classes.selected : '')}
                onClick={handleTileClick}
            >
                <div className={classes.iconWrapper}>
                    <img className={classes.icon} src={METHODOLOGIES[methodology].icon} />
                </div>
                <span className={classes.title}>{METHODOLOGIES[methodology].title}</span>
            </button>
        ) : (
            <button
                type="button"
                className={classNames(classes.tile, selected ? classes.selected : '')}
                onClick={handleTileClick}
            >
                <span className={classes.title}>{METHODOLOGIES[methodology].title}</span>
                <div className={classes.iconWrapper}>
                    <img className={classes.icon} src={METHODOLOGIES[methodology].icon} />
                </div>
                <span className={classes.text}>{METHODOLOGIES[methodology].text}</span>
            </button>
        )
    );
};

export default MethodologyTile;