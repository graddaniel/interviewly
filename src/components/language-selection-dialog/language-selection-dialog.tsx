import React from 'react';
import { useTranslation } from 'react-i18next';

import LanguageButton from '../language-button/language-button';
import Dialog from '../dialog/dialog';

import classes from './language-selection-dialog.module.css'
import InterviewlyLogo from '../../../images/logo.svg';
import languagesDefinitions from './languages-definitions';


const LANGUAGES = Object.entries(languagesDefinitions);

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
                    {LANGUAGES.map(([ code, languageDefinition ]) => (
                        <LanguageButton
                            className={classes.languageButton}
                            key={code}
                            languageCode={code}
                            languageText={languageDefinition.language}
                            icon={languageDefinition.icon}
                            onClick={onClose}
                        />
                    ))}
                </article>
            </main>
        </Dialog>
    );
};

export default LanguageSelectionDialog;