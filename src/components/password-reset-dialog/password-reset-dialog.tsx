import React from 'react';
import { useTranslation } from 'react-i18next';

import Dialog from '../../components/dialog/dialog';
import TextButton from '../../components/text-button/text-button';

import classes from './password-reset-dialog.module.css';
import InterviewlyLogo from '../../images/logo.svg';
import TextInput from '../text-input/text-input';


const PasswordResetDialog = ({
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
                <article className={classes.article}>
                    <h1 className={classes.header}>
                        {t('passwordReset.header')}
                    </h1>
                    <p className={classes.text}>
                        {t('passwordReset.subheader')}
                    </p>
                </article>

                <TextInput
                    className={classes.input}
                    name="email"
                    placeholder={t('inputs.email')}
                    centerText={true}
                />
                <TextButton
                    onClick={() => console.log('TODO request new password')}
                    text={t('passwordReset.submitButton')}
                />
            </main>
        </Dialog>
    );
};

export default PasswordResetDialog;