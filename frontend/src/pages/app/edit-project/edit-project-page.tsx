import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, useActionData, useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import { APP_ROUTES } from '../../../consts/routes';
import CloseControls from '../../../components/close-controls/close-controls';
import TextButton from '../../../components/text-button/text-button';
import EditProjectStepper from './edit-project-stepper';
import MethodologyStep from './methodology-step';
import GeneralStep from './general-step';
import RespondentsStep from './respondents-step';
import DetailsStep from './details-step';
import SummaryStep from './summary-step';
import { ResearchTypes } from 'shared';

import classes from './edit-project-page.module.css';
import InterviewlyLogo from '~/images/logo.svg';

const Steps = ResearchTypes.EditSteps;

const EditProjectPage = () => {
    const [ step, setStep ] = useState(0);
    const { t } = useTranslation();
    const formRef = useRef(null);
    const navigate = useNavigate();
    const submit = useSubmit();
    const actionData = useActionData() as { [k: string]: any };
    const project = useLoaderData() as { [k: string]: any };;
    console.log(project);
    const goToProjects = useCallback(() => navigate(APP_ROUTES.PROJECTS.PATH), []);

    useEffect(() => {
        if (!actionData) {
            return;
        }

        if (actionData.success) {
            if (step === Steps.Summary) {
                goToProjects();
            } else {
                setStep(step => step + 1);
            }
        }
    }, [actionData]);

    return (
        <Form method="post" className={classes.page} ref={formRef}>
            <input type="hidden" value={step} name="step" />
            <header className={classes.header}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>{t('editProject.title')}</h1>
                <CloseControls
                    className={classes.closeControls}
                    text={t('buttons.resign')}
                    onClose={() => navigate(APP_ROUTES.PROJECTS.PATH)}
                />
            </header>
            <div className={classes.stepper}>
                <EditProjectStepper currentStep={step}/>
            </div>
            <div className={classes.content}>
                {step === Steps.General && <GeneralStep project={project}/>}
                {step === Steps.Methodology && <MethodologyStep  project={project}/>}
                {step === Steps.Respondents && <RespondentsStep project={project}/>}
                {step === Steps.Details && <DetailsStep project={project}/>}
                {step === Steps.Summary && <SummaryStep project={project}/>}
            </div>
            <nav className={classes.navigation}>
                <TextButton
                    className={classes.backButton}
                    text={t('join.back')}
                    onClick={() => setStep(step => step - 1)}
                    hidden={step === Steps.General}
                    disabled={false}
                    monochromatic={true}
                />
                <TextButton
                    className={classes.nextButton}
                    text={t('join.next')}
                    onClick={() => {
                        submit(formRef.current);
                    }}
                    monochromatic={false}
                />
            </nav>
        </Form>
    );
};

export default EditProjectPage;