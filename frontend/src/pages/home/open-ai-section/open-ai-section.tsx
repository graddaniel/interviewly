import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DashedRoundLabel from '../../../components/dashed-round-label/dashed-round-label';
import TextButton from '../../../components/text-button/text-button';

import classes from './open-ai-section.module.css';
import OpenAIDiagram from '../../../../images/open-ai-diagram.svg';
import OpenAIDiagramSmall from '../../../../images/open-ai-diagram-small.svg';
import ROUTES from '../../../consts/routes';


const OpenAISection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const goToCalculator = useCallback(() => navigate(ROUTES.CALCULATOR.PATH), []);

    return (
        <section className={classes.section}>
            <h4 className={classes.subtitle}>
                {t('home.openAISection.subtitle')}
            </h4>
            <h2 className={classes.title}>
                {t('home.openAISection.title')}
            </h2>
            <DashedRoundLabel
                className={classes.label}
                text={t('home.openAISection.dashedLabelText')}
            />
            <TextButton
                className={classes.button}
                text={t('home.openAISection.buttonText')}
                onClick={goToCalculator}
            />
            <img className={classes.diagram} src={OpenAIDiagram}/>
            <img className={classes.diagramSmall} src={OpenAIDiagramSmall}/>
        </section>
    );
};

export default OpenAISection;