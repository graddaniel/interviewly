import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import DashedRoundLabel from '../../../components/dashed-round-label/dashed-round-label';
import TextButton from '../../../components/text-button/text-button';

import classes from './open-ai-section.module.css';
import OpenAIDiagram from '../../../../images/open-ai-diagram.svg';
import ROUTES from '../../../consts/routes';


const OpenAISection = () => {
    const navigate = useNavigate();
    const goToCalculator = useCallback(() => navigate(ROUTES.CALCULATOR.PATH), []);

    return (
        <section className={classes.section}>
            <div className={classes.left}>
                <h4 className={classes.subtitle}>
                    Upload the brief and get a quote
                </h4>
                <h2 className={classes.title}>in 1 minute!</h2>
                <DashedRoundLabel
                    className={classes.label}
                    text="Artificial Intelligence"
                />
                <TextButton
                    className={classes.button}
                    text="Go to price calculator"
                    onClick={goToCalculator}
                />
            </div>
            <div className={classes.right}>
                <img src={OpenAIDiagram}/>
            </div>
        </section>
    );
};

export default OpenAISection;