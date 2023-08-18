import React from 'react';

import IconButton from '../icon-button/icon-button';

import classes from './survey-tile.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import Pill from '../pill/pill';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import capitalizeFirstLetter from '../../utils/capitalize-first-letter';


type SurveyTileProps = {
    className?: string;
    name: string;
    onClick: () => void;
    status?: string;
    selected?: boolean;
    disabled?: boolean;
};

const SurveyTile = ({
    className,
    name,
    onClick,
    status,
    selected,
    disabled,
}: SurveyTileProps) => {
    const { t } = useTranslation();

    return (
        <div className={
            classNames(
                classes.tile,
                selected && classes.selectedTile,
                disabled && classes.disabledTile,
                className,
            )}
            onClick={onClick}
        >
            <IconButton
                className={classes.icon}
                icon={FoldersIconBlack}
                onClick={() => {}}
                disabled={disabled}
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