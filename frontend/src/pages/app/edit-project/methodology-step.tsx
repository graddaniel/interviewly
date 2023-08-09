import React, { useState } from 'react';
import { ResearchTypes } from 'shared';
import { useTranslation } from 'react-i18next';

import StepTitle from './step-title';
import MethodologyTile from '../../../components/methodology-tile/methodology-tile';

import classes from './methodology-step.module.css';
import TilesIconBlack from 'images/tiles-icon-black.svg';


const METHODOLOGIES = Object.values(ResearchTypes.Methodology);

const MethodologyStep = ({
    project,
}) => {
    const { t } = useTranslation();
    const [ methodology, setMethodology ] = useState<ResearchTypes.Methodology>(project.methodology);

    return (
        <section className={classes.methodologyStep}>
            <input type="hidden" name="methodology" value={methodology} />
            <StepTitle
                title={t('editProject.methodologyStep.methodologySubtitle')}
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