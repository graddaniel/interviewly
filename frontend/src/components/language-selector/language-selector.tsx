import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './language-selector.module.css';

import ThreeDotsIcon from '../../../images/three-dots-icon.svg';
import {
    PolishFlagIcon,
    BritishFlagIcon,
} from '../../../images/flag-icons';


const getFlagIconByLanguage = (language: string) => {
    switch (language) {
        case 'pl':
            return PolishFlagIcon;
        case 'en':
            return BritishFlagIcon;
        default:
            console.error("Unrecognized language", language);
            return null;
    }
}

const LanguageSelector = ({
    onClick,
}) => {
    const { t, i18n } = useTranslation();

    const { resolvedLanguage } = i18n;

    return (
        <div className={classes.languageSelector}>
            <span className={classes.currentLanguageText}>{t('currentLanguage')}</span>
            <img
                className={classes.currentLanguageIcon}
                src={getFlagIconByLanguage(resolvedLanguage || '')}
            />
            <button
                className={classes.button}
                onClick={onClick}
            >
                <img src={ThreeDotsIcon} />
            </button>
        </div>
        
    );
}

export default LanguageSelector;