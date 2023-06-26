import React from 'react';

import InitialSection from './initial-section/initial-section';
import StepsSection from './steps-section/steps-section';
import WorldSection from './world-section/world-section';
import OpenAISection from './open-ai-section/open-ai-section';
import TutorialsSection from './tutorials-section/tutorials-section';
import BlogSection from './blog-section/blog-section';

import classes from './home-page.module.css';


const HomePage = () => {
    return (
        <article className={classes.homePage}>
            <InitialSection />
            <hr className={classes.hr}/>
            <StepsSection />
            <WorldSection />
            <OpenAISection />
            <TutorialsSection />
            <BlogSection />
        </article>
    );
};

export default HomePage;