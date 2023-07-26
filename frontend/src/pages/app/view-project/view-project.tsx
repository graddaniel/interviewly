import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ProjectStepper from '../../../components/project-stepper/project-stepper';
import TextButton from '../../../components/text-button/text-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import GeneralStep from './general-step';

import classes from './view-project.module.css';
import QuestionMarkIconBlack from 'images/question-mark-icon-black.svg';
import MethodologyStep from './methodology-step';


const ViewProject = () => {
    const { t } = useTranslation();

    const stepsNames = t('viewProject.steps', { returnObjects: true }) as string[];

    const stepsArray = stepsNames.map((name, i) => ({
        title: name,
        onClick: () => setCurrentStep(i),
    }));

    const [ currentStep, setCurrentStep ] = useState(1);

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
                    onClick={() => console.log("TODO different action different label and handler")}
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
                {currentStep === 1 && (<MethodologyStep />)}
            </div>
        </section>
    );
};

export default ViewProject;