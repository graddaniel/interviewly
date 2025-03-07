import React from 'react';

import InitialSection from './initial-section/initial-section';
import StepsSection from './steps-section/steps-section';
import WorldSection from './world-section/world-section';
import OpenAISection from './open-ai-section/open-ai-section';
import SubscriptionsSection from './subscriptions-section/subscriptions-section';
import TutorialsSection from './tutorials-section/tutorials-section';
import BlogSection from './blog-section/blog-section';

import classes from './home-page.module.css';
import { SAMPLE_VERSION } from 'config/current';


const HomePage = () => {
    return (
        <article className={classes.homePage}>
            <InitialSection />
            <StepsSection />
            <WorldSection />
            <OpenAISection />
            <SubscriptionsSection />
            {!SAMPLE_VERSION && (
                <TutorialsSection />
            )}
            <BlogSection />
        </article>
    );
};

export default HomePage;