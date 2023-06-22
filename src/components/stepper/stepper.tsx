import React from 'react';
import classNames from 'classnames';

import classes from './stepper.module.css';


const Stepper = ({
    currentStep,
    maxSteps,
    hidden,
}) => {
    const generateSteps = () => {
        const stepsElements: React.JSX.Element[] = [];

        for (let step = 1; step <= maxSteps; step += 1) {
            stepsElements.push(
                <div
                    key={step}
                    style={{
                        width: `${100/maxSteps}%`
                    }}
                    className={classNames(
                        classes.step,
                        step <= currentStep && classes.highlight || '',
                        hidden && classes.hidden || '',
                    )}
                />
            );
        }

        return stepsElements;
    }

    return (
        <div className={classes.stepper}>
            {generateSteps()}
        </div>
    );
};

export default Stepper;