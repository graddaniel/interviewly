import React from 'react';
import classNames from 'classnames';
import { ResearchTypes } from 'shared';
import { useTranslation } from 'react-i18next';

import classes from './methodology-tile.module.css';
import ChatIconPurple from 'images/chat-icon-purple.svg';
import PeopleIconPurple from 'images/people-icon-purple.svg';
import EarthIconPurple from 'images/earth-icon-purple.svg';
import ElementsIconPurple from 'images/elements-icon-purple.svg';
import QuestionaireIconPurple from 'images/respondent-icon.svg';

type MethodologyTileProps = {
    className?: string;
    methodology: ResearchTypes.Methodology;
    onClick?: () => void;
    selected: boolean;
    mini?: boolean;
};

const MethodologyTile = ({
    className,
    methodology,
    onClick,
    selected,
    mini,
}: MethodologyTileProps) => {
    const { t } = useTranslation();

    const METHODOLOGIES = {
        [ResearchTypes.Methodology.Interview]: {
            title: t('methodologies.interviews.title'),
            text: t('methodologies.interviews.text'),
            icon: ChatIconPurple,
        },
        [ResearchTypes.Methodology.FocusGroups]: {
            title: t('methodologies.focusGroups.title'),
            text: t('methodologies.focusGroups.text'),
            icon: PeopleIconPurple,
        },
        [ResearchTypes.Methodology.OnlineCommunities]: {
            title: t('methodologies.onlineCommunities.title'),
            text: t('methodologies.onlineCommunities.text'),
            icon: EarthIconPurple,
        },
        [ResearchTypes.Methodology.UXInterviews]: {
            title: t('methodologies.uxInterviews.title'),
            text: t('methodologies.uxInterviews.text'),
            icon: ElementsIconPurple,
        },
        [ResearchTypes.Methodology.ProductTests]: {
            title: t('methodologies.productTests.title'),
            text: t('methodologies.productTests.text'),
            icon: QuestionaireIconPurple,
        }
    };

    const handleTileClick = (e) => {
        e.preventDefault();
        onClick && onClick();
    };

    return (
        mini ? (
            <button
                type="button"
                className={classNames(
                    classes.miniTile,
                    className,
                    selected ? classes.selected : ''
                )}
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