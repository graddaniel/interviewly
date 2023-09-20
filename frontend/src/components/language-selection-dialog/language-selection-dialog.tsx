import React from 'react';
import { useTranslation } from 'react-i18next';

import LanguageButton from '../language-button/language-button';
import Dialog from '../dialog/dialog';

import classes from './language-selection-dialog.module.css'
import InterviewlyLogo from '../../../images/logo.svg';
import languageCodeToFlagIcon from '../../utils/language-code-to-flag-icon';


const languages = [
    "bg",
    "cs",
    "de",
    "el",
    "en",
    "es",
    "fr",
    "hu",
    "it",
    "nl",
    "pl",
    "pt",
    "ro",
    "ru",
    "sk",
    "sv",
    "uk"
];

const LanguageSelectionDialog = ({
    isOpen,
    onClose,
}) => {
    const { t } = useTranslation();

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <main className={classes.content}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>
                    {t('dialogs.languageSelection')}
                </h1>
                <article className={classes.languageButtons}>
                    {languages.map((languageCode) => (
                        <LanguageButton
                            className={classes.languageButton}
                            key={languageCode}
                            languageCode={languageCode}
                            languageText={t('currentLanguage', { lng: languageCode })}
                            icon={languageCodeToFlagIcon(languageCode)}
                            onClick={onClose}
                        />
                    ))}
                </article>
            </main>
        </Dialog>
    );
};

export default LanguageSelectionDialog;