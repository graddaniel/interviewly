import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form, useNavigate, useRouteError, useSubmit } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { ProjectTypes } from 'shared';

import { APP_ROUTES } from '../../../consts/routes';
import CloseControls from '../../../components/close-controls/close-controls';
import TextButton from '../../../components/text-button/text-button';
import ProjectStepper from '../../../components/project-stepper/project-stepper';
import MethodologyStep from './methodology-step';
import GeneralStep from './general-step';
import RespondentsStep from './respondents-step';
import DetailsStep from './details-step';
import SummaryStep from './summary-step';

import classes from './edit-project-page.module.css';
import InterviewlyLogo from 'images/logo.svg';
import { useActionHandler, useLoaderHandler } from '../../../hooks/use-handlers';


const EditProjectPage = () => {
    const { t } = useTranslation();

    const Steps = ProjectTypes.EditSteps;
    const StepsArray = [
        { title: t('editProject.aboutStep.title') },
        { title: t('editProject.methodologyStep.title') },
        { title: t('editProject.respondentsStep.title') },
        { title: t('editProject.detailsStep.title') },
        { title: t('editProject.summaryStep.title') },
    ];

    const [ step, setStep ] = useState(0);
    const formRef = useRef(null);
    const navigate = useNavigate();
    const submit = useSubmit();
    const actionData = useActionHandler();
    const { data } = useLoaderHandler();
    
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

    if (!data) {
        return null;
    }
    const { project } = data;

    return (
        <Form method="post" className={classes.page} ref={formRef}>
            <input type="hidden" value={step} name="step" />
            <header className={classes.header}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>{t('editProject.title')}</h1>
                <CloseControls
                    className={classes.closeControls}
                    text={t('buttons.resign')}
                    onClose={() => navigate(-1)}
                />
            </header>
            <div className={classes.stepper}>
                <ProjectStepper steps={StepsArray} currentStep={step}/>
            </div>
            {project && (
                <div className={classes.content}>
                    {step === Steps.General && <GeneralStep project={project}/>}
                    {step === Steps.Methodology && <MethodologyStep  project={project}/>}
                    {step === Steps.Respondents && <RespondentsStep project={project}/>}
                    {step === Steps.Details && <DetailsStep project={project}/>}
                    {step === Steps.Summary && <SummaryStep project={project}/>}
                </div>
            )}
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