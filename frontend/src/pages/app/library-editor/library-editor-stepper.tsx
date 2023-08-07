import React from 'react';
import classNames from 'classnames';

import classes from './library-editor-stepper.module.css';


type LibraryEditorStepperProps = {
    steps: { title: string, onClick?: () => void }[];
    currentStep: number;
    className?: string;
    markCurrentStepOnly?: boolean;
};

const LibraryEditorStepper = ({
    steps,
    currentStep,
    className,
    markCurrentStepOnly,
}: LibraryEditorStepperProps) => {
    return (
        <ul className={classNames(classes.steps, className)}>
            {steps.map((step, i) => (
                <li
                    className={classNames(
                        classes.step,
                        step.onClick ? classes.clickable : ''
                    )}
                    key={step.title}
                    onClick={step.onClick}
                >
                    <span className={classes.title}>{step.title}</span>
                    <div className={classNames(
                        classes.line,
                        (markCurrentStepOnly && currentStep === i) 
                        || (!markCurrentStepOnly && currentStep >= i) ? classes.purple : ''
                    )}></div>
                </li>
            ))}
        </ul>
    );
};

export default LibraryEditorStepper;