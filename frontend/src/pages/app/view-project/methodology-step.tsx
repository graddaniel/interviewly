import React from 'react';
import { ResearchTypes } from 'shared';

import classes from './methodology-step.module.css';
import OnlineCommunitySection from './methodology-step-sections/online-community-section';
import InterviewSection from './methodology-step-sections/interview-section';

type MethodologyStepProps = {
    methodology: ResearchTypes.Methodology;
};

const MethodologyStep = ({
    methodology,
}: MethodologyStepProps) => {
    return (
        <section className={classes.methodologyStep}>
            {methodology === ResearchTypes.Methodology.Interview && (
                <InterviewSection />
            )}
            {methodology === ResearchTypes.Methodology.OnlineCommunities && (
                <OnlineCommunitySection />
            )}
        </section>
    );
};

export default MethodologyStep;