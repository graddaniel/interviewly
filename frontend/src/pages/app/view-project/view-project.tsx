import React, { useState } from 'react';

import ProjectStepper from '../../../components/project-stepper/project-stepper';
import TextButton from '../../../components/text-button/text-button';

import classes from './view-project.module.css';
import QuestionMarkIconBlack from '~/images/question-mark-icon-black.svg';


const ViewProject = () => {
    const [ currentStep, setCurrentStep ] = useState(0)
    const StepsNamesArray = [
        { title: 'General', onClick: () => setCurrentStep(0) },
        { title: 'Methodology', onClick: () => setCurrentStep(1) },
        { title: 'Respondents', onClick: () => setCurrentStep(2) },
        { title: 'Screening questionnaire', onClick: () => setCurrentStep(3) },
        { title: 'Details', onClick: () => setCurrentStep(4) },
    ];

    return (
        <section className={classes.viewProject}>
            <header className={classes.header}>
                <h4 className={classes.title}>
                    <img src={QuestionMarkIconBlack} className={classes.headerIcon} />
                    Project details
                </h4>
                <ProjectStepper
                    className={classes.stepper}
                    steps={StepsNamesArray}
                    currentStep={currentStep}
                    markCurrentStepOnly={true}
                />
                <div className={classes.statusLabel}>Status</div>
                <TextButton
                    className={classes.actionButton}
                    text="Edit"
                    onClick={() => console.log("EDIT")}
                />
            </header>
            <div className={classes.content}>
                <div className={classes.projectTitle}>User Experience in Samsung company</div>
                <div className={classes.projectDescription}>
                It can be nerve-wracking, vulnerable, and challenging at times, but getting out of our own heads and incorporating collaboration into our design processes can make us all better designers.

Over the years, I’ve come to learn that designing collaboratively means putting your egos aside to make something that transcends the sum of its creators.
                </div>
            </div>
        </section>
    );
};

export default ViewProject;