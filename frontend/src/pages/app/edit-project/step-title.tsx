import React from 'react';

import classes from './step-title.module.css';


const StepTitle = ({
    title,
    icon
}) => {
    return (
        <div className={classes.stepTitle}>
            <img className={classes.icon} src={icon} />
            <h5 className={classes.title}>{title}</h5>
        </div>
    );
};

export default StepTitle;