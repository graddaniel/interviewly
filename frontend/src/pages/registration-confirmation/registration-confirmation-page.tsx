import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import TextButton from '../../components/text-button/text-button';
import ROUTES from '../..//consts/routes';

import classes from './registration-confirmation-page.module.css';
import Logo from 'images/logo.svg';

const RegistrationConfirmationPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

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