import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { ResearchTypes } from 'shared';

import ProjectStepper from '../../../components/project-stepper/project-stepper';
import TextButton from '../../../components/text-button/text-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import GeneralStep from './general-step';

import classes from './view-project-page.module.css';
import QuestionMarkIconBlack from 'images/question-mark-icon-black.svg';
import MethodologyStep from './methodology-step';
import RespondentsStep from './respondents-step';
import { APP_FORMS_ROUTES } from '../../../consts/routes';

const METHODOLOGY = ResearchTypes.Methodology.OnlineCommunities;

const ViewProject = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { projectId } = useParams();

    const stepsNames = t('viewProject.steps', { returnObjects: true }) as string[];

    const stepsArray = stepsNames.map((name, i) => ({
        title: name,
        onClick: () => setCurrentStep(i),
    }));

    const editProject = () => navigate(generatePath(APP_FORMS_ROUTES.EDIT_PROJECT.PATH, { projectId }));

    const [ currentStep, setCurrentStep ] = useState(0);

    return (
        <section className={classes.viewProject}>
            <header className={classes.header}>
                <h4 className={classes.title}>
                    <img src={QuestionMarkIconBlack} className={classes.headerIcon} />
                    {t('viewProject.title')}
                </h4>
                <ProjectStepper
                    className={classes.stepper}
                    steps={stepsArray}
                    currentStep={currentStep}
                    markCurrentStepOnly={true}
                />
                <div className={classes.statusLabel}>Status</div>
                <TextButton
                    className={classes.actionButton}
                    text={t('viewProject.edit')}
                    onClick={editProject}
                />
                <DropdownList
                    className={classes.dropdown}
                    name="viewStep"
                    elementsList={stepsArray.map(e => e.title)}
                    onChange={(i) => stepsArray[i].onClick()}
                    allowDeselect={false}
                    defaultIndex={currentStep}
                />
            </header>
            <div className={classes.content}>
                {currentStep === 0 && (<GeneralStep />)}
                {currentStep === 1 && (<MethodologyStep methodology={METHODOLOGY}/>)}
                {currentStep === 2 && (<RespondentsStep />)}
            </div>
        </section>
    );
};

export default ViewProject;