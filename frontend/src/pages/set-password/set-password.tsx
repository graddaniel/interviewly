import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';

import classes from './set-password.module.css';
import TextInput from '../../components/text-input/text-input';
import SubmitButton from '../../components/submit-button/submit-button';
import { useActionHandler } from '../../hooks/use-handlers';

const SetPasswordPage = () => {
    const { t } = useTranslation();
    const actionData = useActionHandler(t('setPassword.success'));

    const errors = actionData?.errors ?? {};

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