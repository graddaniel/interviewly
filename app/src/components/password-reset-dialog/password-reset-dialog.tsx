import React, { useCallback } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import Dialog from '../../components/dialog/dialog';
import TextButton from '../../components/text-button/text-button';
import SubmitButton from '../submit-button/submit-button';

import ROUTES from '../../consts/routes';

import classes from './password-reset-dialog.module.css';
import InterviewlyLogo from '../../../images/logo.svg';
import TextInput from '../text-input/text-input';


const PasswordResetDialog = ({
    isOpen,
    onClose,
    showConfirmation,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToHomePage = useCallback(() => navigate(ROUTES.HOME.PATH), []);

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <Form
                method="post"
                className={classNames(
                    classes.content,
                    showConfirmation
                        ? classes.small
                        : classes.regular
                )}
            >
                {!showConfirmation && (
                    <>
                        <input type="hidden" value="resetPassword" name="actionType" />
                        <img src={InterviewlyLogo} className={classes.logo}/>
                        <article className={classes.article}>
                            <h1 className={classes.header}>
                                {t('passwordReset.request.header')}
                            </h1>
                            <p className={classes.text}>
                                {t('passwordReset.request.subheader')}
                            </p>
                        </article>
        
                        <TextInput
                            className={classes.input}
                            name="email"
                            placeholder={t('inputs.email')}
                            centerText={true}
                        />
                        <SubmitButton
                            text={t('passwordReset.request.submitButton')}
                        />
                    </>
                )}
                {showConfirmation && (
                    <>
                        <img src={InterviewlyLogo} className={classes.logo}/>
                        <article className={classes.article}>
                            <h1 className={classes.header}>
                                {t('passwordReset.confirmation.header')}
                            </h1>
                            <p className={classes.text}>
                                {t('passwordReset.confirmation.subheader')}
                            </p>
                        </article>
                        <TextButton
                            text={t('passwordReset.confirmation.submitButton')}
                            onClick={goToHomePage}
                        />
                    </>
                )}
            </Form>
        </Dialog>
    );
};

export default PasswordResetDialog;