import React, { useCallback, useRef, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next'

import { APP_ROUTES } from '../../../consts/routes';
import CloseControls from '../../../components/close-controls/close-controls';
import TextButton from '../../../components/text-button/text-button';
import EditProjectStepper from './edit-project-stepper';

import classes from './edit-project-page.module.css';
import InterviewlyLogo from '~/images/logo.svg';


enum STEPS {
    GENERAL = 0,
    METHODOLOGY = 1,
    RESPONDENTS = 2,
    DETAILS = 3,
    SUMMARY = 4,
};

const EditProjectPage = () => {
    const [ step, setStep ] = useState(0);
    const { t } = useTranslation();
    const formRef = useRef(null);
    const navigate = useNavigate();

    const goToMyAccount = useCallback(() => navigate(APP_ROUTES.MY_ACCOUNT.PATH), []);

    return (
        <Form method="post" className={classes.page} ref={formRef}>
            <header className={classes.header}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>{t(`join.page${step}.title`)}</h1>
                <CloseControls
                    className={classes.closeControls}
                    text={t('buttons.resign')}
                    onClose={goToMyAccount}
                />
            </header>
            <div className={classes.stepper}>
                <EditProjectStepper currentStep={step}/>
            </div>
            <div className={classes.content}>

            </div>
            <nav className={classes.navigation}>
                <TextButton
                    className={classes.backButton}
                    text={t('join.back')}
                    onClick={() => setStep(step => step - 1)}
                    hidden={step === STEPS.GENERAL}
                    disabled={false}
                    monochromatic={true}
                />
                <TextButton
                    className={classes.nextButton}
                    text={t('join.next')}
                    onClick={() => {
                        setStep(step => step + 1);
                    }}
                    monochromatic={false}
                />
            </nav>
        </Form>
    );
};

export default EditProjectPage;