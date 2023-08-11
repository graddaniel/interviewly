import React from 'react';
import { ProjectTypes } from 'shared';

import classes from './methodology-step.module.css';
import OnlineCommunitySection from './methodology-step-sections/online-community-section';
import InterviewSection from './methodology-step-sections/interview-section';

type MethodologyStepProps = {
    methodology: ProjectTypes.Methodology;
};

const MethodologyStep = ({
    methodology,
}: MethodologyStepProps) => {
    return (
        <section className={classes.methodologyStep}>
            {methodology === ProjectTypes.Methodology.Interview && (
                <InterviewSection />
            )}
            {methodology === ProjectTypes.Methodology.OnlineCommunities && (
                <OnlineCommunitySection />
            )}
        </section>
    );
};

export default MethodologyStep;