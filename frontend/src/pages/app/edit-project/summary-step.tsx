import React from 'react';
import { ResearchTypes } from 'shared';

import StepTitle from './step-title';
import MethodologyTile from '../../../components/methodology-tile/methodology-tile';

import classes from './summary-step.module.css';
import CartIconBlack from 'images/cart-icon-black.svg';


type SummaryStepProps = {
    project: any;
};

const SummaryStep = ({
    project,
}: SummaryStepProps) => {
    return (
        <section>
            <StepTitle
                title="Summary"
                icon={CartIconBlack}
            />
            <div className={classes.titleBox}>
                {project.title}
            </div>
            <MethodologyTile
                methodology={project.methodology}
                selected={false}
                mini={true}
            />
        </section>
    );
};

export default SummaryStep;