import React, { useState } from 'react';
import { ResearchTypes } from 'shared';

import StepTitle from './step-title';
import MethodologyTile from './methodology-tile';

import classes from './methodology-step.module.css';
import TilesIconBlack from '~/images/tiles-icon-black.svg';


const METHODOLOGIES = Object.values(ResearchTypes.Methodology);

const MethodologyStep = ({
    project,
}) => {
    const [ methodology, setMethodology ] = useState<ResearchTypes.Methodology>(project.methodology);

    return (
        <section className={classes.methodologyStep}>
            <input type="hidden" name="methodology" value={methodology} />
            <StepTitle
                title="Choose the research methodology."
                icon={TilesIconBlack}
            />
            <section className={classes.content}>
                {METHODOLOGIES.map(m => (
                    <MethodologyTile
                        key={m}
                        methodology={m}
                        onClick={() => setMethodology(m)}
                        selected={m === methodology}
                    />
                ))}
            </section>
        </section>
    );
};

export default MethodologyStep;