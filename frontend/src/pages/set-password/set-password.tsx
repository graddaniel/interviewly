import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData, useNavigate, useRouteError } from 'react-router-dom';

import TextButton from '../../components/text-button/text-button';
import ROUTES from '../../consts/routes';

import classes from './set-password.module.css';
import Logo from 'images/logo.svg';
import TextInput from '../../components/text-input/text-input';
import SubmitButton from '../../components/submit-button/submit-button';
import useErrorHandler from '../../hooks/use-error-handler';
import useSuccessFeedback from '../../hooks/use-success-feedback';

const SetPasswordPage = () => {
    const { t } = useTranslation();
    const actionData = useActionData() as any;
    useErrorHandler(useRouteError());
    useSuccessFeedback(actionData, t('setPassword.success'));

    const errors = actionData?.errors || {};

    return (
        <section className={classes.container}>
            <Form className={classes.changePassword} method="post">
                <h6 className={classes.subtitle}>
                    {t('setPassword.subtitle')}
                </h6>
                <div>
                    <TextInput
                        name="password"
                        type="password"
                        placeholder={t('setPassword.newPassword')}
                        error={errors.password}
                    />
                    <TextInput
                        name="repeatPassword"
                        type="password"
                        placeholder={t('setPassword.repeatPassword')}
                        error={errors.repeatPassword}
                    />
                </div>
                <SubmitButton
                    className={classes.changePasswordButton}
                    text={t('buttons.save')}
                />
            </Form>
        </section>
    );
};

export default SetPasswordPage;