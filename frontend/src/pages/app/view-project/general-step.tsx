import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './general-step-module.css';


type GeneralStepProps = {

};

const GeneralStep = ({

}: GeneralStepProps) => {
    const { t } = useTranslation();
    return (
        <section className={classes.generalStep}>
            <div className={classes.projectTitle}>{t('viewProject.general.title')}</div>
            <div className={classes.projectDescription}>
                {t('viewProject.general.description')}
            </div>
        </section>
    );
};

export default GeneralStep;