import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import classNames from 'classnames';

import TextButton from '../../components/text-button/text-button';
import TextInput from '../../components/text-input/text-input';
import Checkbox from '../../components/checkbox/checkbox';

import classes from './log-in-form.module.css';
import DecoratorImage from '../../images/decorator.svg';


const LogInForm = ({
    className,
    openPasswordResetDialog,
}) => {
    const { t } = useTranslation();

    return (
        <Form className={classNames(classes.form, className)}>
            <h1 className={classes.title}>{t('buttons.logIn')}</h1>
            <div className={classes.decorators}>
                <img src={DecoratorImage}/>
                <img src={DecoratorImage}/>
            </div>
            <TextInput
                type="text"
                name="email"
                placeholder={t('inputs.email')}
            />
            <TextInput
                type="password"
                name="password"
                placeholder={t('inputs.password')}
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
            <input
                className={classes.submitButton}
                type="submit"
                value={t('buttons.logIn')}
            />
            <TextButton
                className={classes.joinButton}
                text={t('buttons.signUp')}
                onClick={() => console.log('TODO log in')}
            />
        </Form>
    );
};

export default LogInForm;