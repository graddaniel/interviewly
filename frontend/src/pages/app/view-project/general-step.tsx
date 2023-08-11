import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './general-step-module.css';


type GeneralStepProps = {
    title: string;
    description: string;
};

const GeneralStep = ({
    title,
    description,
}: GeneralStepProps) => {
    const { t } = useTranslation();
    return (
        <section className={classes.generalStep}>
            <div className={classes.projectTitle}>
                {title}
            </div>
            <div className={classes.projectDescription}>
                {description}
            </div>
        </section>
    );
};

export default GeneralStep;