import React from 'react';
import classNames from 'classnames';

import classes from './edit-project-stepper.module.css';


const STEPS = [{
    title: 'About project',
}, {
    title: 'Research methodology',
}, {
    title: 'Selection of respondents',
}, {
    title: 'Project details',
}, {
    title: 'Summary',
}];

const EditProjectStepper = ({
    currentStep,
}) => {
    return (
        <ul className={classes.steps}>
            {STEPS.map((step, i) => (
                <li className={classes.step} key={step.title}>
                    <span className={classes.title}>{step.title}</span>
                    <div className={classNames(
                        classes.line,
                        currentStep >= i ? classes.purple : ''
                    )}></div>
                </li>
            ))}
        </ul>
    );
};

export default EditProjectStepper;