import React from 'react';

import IconButton from '../icon-button/icon-button';

import classes from './survey-tile.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import Pill from '../pill/pill';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import capitalizeFirstLetter from '../../utils/capitalize-first-letter';


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
    const { t } = useTranslation();

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
                    text={status === 'finished'
                        ? t('surveyStatuses.seeResultsLabel')
                        : capitalizeFirstLetter(t(`surveyStatuses.${status}`))
                    }
                />
            )}
        </div>
    );
};

export default SurveyTile;