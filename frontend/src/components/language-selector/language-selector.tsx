import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './language-selector.module.css';

import ThreeDotsIcon from '../../../images/three-dots-icon.svg';
import languageCodeToFlagIcon from '../../utils/language-code-to-flag-icon';


const LanguageSelector = ({
    onClick,
}) => {
    const { t, i18n } = useTranslation();

    const { resolvedLanguage } = i18n;

    return (
        <div className={classes.languageSelector}>
            <span className={classes.currentLanguageText}>{t('currentLanguage')}</span>
            <div
                className={classes.controls}
                onClick={onClick}
            >
                <img
                    className={classes.currentLanguageIcon}
                    src={languageCodeToFlagIcon(resolvedLanguage || '')}
                />
                <button
                    className={classes.button}
                >
                    <img src={ThreeDotsIcon} />
                </button>
            </div>
        </div>
        
    );
}

export default LanguageSelector;