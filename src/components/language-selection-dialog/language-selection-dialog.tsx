import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import IconButton from '../icon-button/icon-button';
import LanguageButton from '../language-button/language-button';

import classes from './language-selection-dialog.module.css'
import CrossIcon from '../../images/cross-icon.svg';
import InterviewlyLogo from '../../images/logo.svg';
import languagesDefinitions from './languages-definitions';


const LANGUAGES = Object.entries(languagesDefinitions);

const LanguageSelectionDialog = ({
    isOpen,
    onClose,
}) => {
    const { t } = useTranslation();

    return (
        <section className={classNames(
            classes.dialog,
            isOpen ? classes.open : classes.closed,
        )}>
            <div className={classes.closeControl}>
                <IconButton
                    icon={CrossIcon}
                    onClick={onClose}
                    className={classes.closeControlButton}
                />
                <span className={classes.closeControlText}>
                    {t('buttons.resign')}
                </span>
            </div>
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
        </section>
    );
};

export default LanguageSelectionDialog;