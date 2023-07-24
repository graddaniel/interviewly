import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData, useHref, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import TextButton from '../../components/text-button/text-button';
import TextInput from '../../components/text-input/text-input';
import Checkbox from '../../components/checkbox/checkbox';
import SubmitButton from '../../components/submit-button/submit-button';
import classes from './log-in-form.module.css';
import { FORMS_ROUTES } from '../../consts/routes';

import Decorator from '../../components/decorator/decorator';


const LogInForm = ({
    className,
    openPasswordResetDialog,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const joinUrl = useHref(FORMS_ROUTES.JOIN.PATH);
    const actionData = useActionData() as { [k: string]: any };

    const goToJoin = useCallback(() => navigate(FORMS_ROUTES.JOIN.PATH), []);

    const {
        email: emailError,
        password: passwordError,
        generic: genericError,
    } = actionData?.errors || {};

    return (
        <Form method="post" className={classNames(classes.form, className)}>
            <input type="hidden" value="logIn" name="actionType" />
            <h1 className={classes.title}>{t('buttons.logIn')}</h1>
            <Decorator />
            <TextInput
                type="text"
                name="email"
                placeholder={t('inputs.email')}
                error={emailError}
            />
            <TextInput
                type="password"
                name="password"
                placeholder={t('inputs.password')}
                error={passwordError}
            />
            <section className={classes.miscControls}>
                <Checkbox
                    name="remember"
                    label={t('logIn.rememberMe')}
                />
                <span
                    className={classes.passwordReset}
                    onClick={openPasswordResetDialog}
                >
                    {t('links.forgotPassword')}
                </span>
            </section>
            <p className={classes.errorMessage}>
                {genericError ? genericError : ''}
            </p>
            <div className={classes.buttons}>
                <SubmitButton
                    text={t('buttons.logIn')}
                />
                <TextButton
                    className={classes.joinButton}
                    text={t('buttons.signUp')}
                    onClick={goToJoin}
                />
                <p className={classes.joinText}>
                    {t('logIn.joinText')}
                    <br/>
                    <a
                        className={classes.joinLink}
                        href={joinUrl}
                    >
                        {t('buttons.signUp')}
                    </a>
                </p>
            </div>
        </Form>
    );
};

export default LogInForm;