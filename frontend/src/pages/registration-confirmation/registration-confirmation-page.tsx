import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';

import TextButton from '../../components/text-button/text-button';
import ROUTES from '../..//consts/routes';

import classes from './registration-confirmation-page.module.css';
import Logo from 'images/logo.svg';
import { useLoaderHandler } from '../../hooks/use-handlers';

const RegistrationConfirmationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const result = useLoaderHandler();

    if (!result.success) {
        return <Navigate to={ROUTES.LOG_IN.PATH}/>
    }

    return (
        <section className={classes.container}>
            <div className={classes.wrapper}>
                <img src={Logo} />
                <h1 className={classes.header}>{t('registrationConfirmation.header')}</h1>
                <p className={classes.subheader}>{t('registrationConfirmation.subheader')}</p>
                <TextButton
                    onClick={() => navigate(ROUTES.LOG_IN.PATH)}
                    text={t('buttons.logIn')}
                />
            </div>
        </section>
    );
};

export default RegistrationConfirmationPage;