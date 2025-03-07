import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import classes from './language-button.module.css';


const LanguageButton = ({
    className,
    languageText,
    languageCode,
    icon,
    onClick,
}) => {
    const { i18n } = useTranslation();

    const selectLanguage = useCallback(() => {
        i18n.changeLanguage(languageCode);

        onClick();
    }, []);

    return (
        <button
            className={classNames(classes.button, className)}
            onClick={selectLanguage}
        >
            <span className={classes.text}>{languageText}</span>
            <img src={icon} />
        </button>
    );
};

export default LanguageButton;