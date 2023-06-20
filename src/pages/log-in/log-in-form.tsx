import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-router-dom';
import classNames from 'classnames';

import TextButton from '../../components/text-button/text-button';
import TextInput from '../../components/text-input/text-input';

import ROUTES from '../../consts/routes';

import classes from './log-in-form.module.css';
import DecoratorImage from '../../images/decorator.svg';


const LogInForm = ({
    className,
}) => {
    const { t } = useTranslation();
    const [ rememberMe, setRememberMe ] = useState(false);

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
                <label
                    className={classes.label}
                    htmlFor="remember"
                >
                    <input
                        id="remember"
                        className={classes.checkbox}
                        type="checkbox"
                        name="remember"
                        checked={rememberMe}
                        onChange={() => setRememberMe(state => !state)}
                    />
                    {t('logIn.rememberMe')}
                </label>
                <a href={ROUTES.RESET_PASSWORD.PATH}>{t('links.forgotPassword')}</a>
            </section>
            <input
                className={classes.submitButton}
                type="submit"
                value={t('buttons.logIn')}
            />
            <TextButton
                className={classes.joinButton}
                text={t('buttons.signUp')}
            />
        </Form>
    );
};

export default LogInForm;