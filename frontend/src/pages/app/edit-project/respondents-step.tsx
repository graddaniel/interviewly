import React from 'react';

import StepTitle from './step-title';
import SwitchInput from './switch-input';
import TitledDivider from '../../../components/titled-divider/titled-divider';

import classes from './respondents-step.module.css';
import IDIconBlack from '~/images/id-icon-black.svg';
import LanguagesIconBlack from '~/images/languages-icon-black.svg';
import PlayIconBlack from '~/images/play-icon-black.svg';
import BlankSurveyIconBlack from '~/images/blank-survey-icon-black.svg'


const RespondentsStep = ({
    project,
}) => {
    return (
        <section className={classes.respondentsStep}>
            <StepTitle
                icon={IDIconBlack}
                title="Select respondents for this research"
            />
            <div className={classes.text}>
                <span>If you're unsure how the respondents file should look like,</span>
                <span>download our sample file where you will find all the necessary information.</span>
            </div>
            <input type="file" id="respondentsFile" name="respondentsFile" />
            <div className={classes.text}>
                <span>or specify the desired respondents profile with the filters below</span>
            </div>
            <div className={classes.filters}>
                <div className={classes.genderFilters}>
                    <span className={classes.genderTitle}>Gender</span>
                    <SwitchInput
                        className={classes.maleSwitch}
                        rightLabel="Male"
                        name="male"
                    />
                    <SwitchInput
                        className={classes.femaleSwitch}
                        rightLabel="Female"
                        name="female"
                    />
                </div>
                <div className={classes.interestsFilters}>
                    <span className={classes.interestsTitle}>Interests</span>
                    <SwitchInput
                        className={classes.interestsSports}
                        rightLabel="Sports"
                        name="sports"
                    />
                    <SwitchInput
                        className={classes.interestsMusic}
                        rightLabel="Music"
                        name="music"
                    />
                    <SwitchInput
                        className={classes.interestsAutomotive}
                        rightLabel="Automotive"
                        name="automotive"
                    />
                    <SwitchInput
                        className={classes.interestsPainting}
                        rightLabel="Painting"
                        name="painting"
                    />
                </div>
                <div className={classes.ageFilters}>
                    <span className={classes.ageTitle}>Age</span>
                    <SwitchInput
                        className={classes.ageFilter1}
                        rightLabel="18-25"
                        name="18-25"
                    />
                    <SwitchInput
                        className={classes.ageFilter2}
                        rightLabel="26-32"
                        name="26-32"
                    />
                    <SwitchInput
                        className={classes.ageFilter3}
                        rightLabel="33-39"
                        name="33-39"
                    />
                    <SwitchInput
                        className={classes.ageFilter4}
                        rightLabel="40-46"
                        name="40-46"
                    />
                </div>
                <TitledDivider title="Other requirements" />
                <StepTitle
                    icon={LanguagesIconBlack}
                    title="Language test for the respondent"
                />
                <SwitchInput
                    leftLabel="No"
                    name="languagesTest"
                    rightLabel="Yes"
                />
                <StepTitle
                    icon={BlankSurveyIconBlack}
                    title="Do you need a screening survey"
                />
                <SwitchInput
                    leftLabel="No"
                    name="screening"
                    rightLabel="Yes"
                />
                <div className={classes.text}>
                    <span>After paying for the survey, you will have an option</span>
                    <br/>
                    <span>to use a ready-made surveys library or two create your own.</span>
                </div>
                <StepTitle
                    icon={PlayIconBlack}
                    title="Do you need a preliminary respondent recruitment recording?"
                />
                <SwitchInput
                    leftLabel="No"
                    name="recording"
                    rightLabel="Yes"
                />
            </div>
        </section>
    );
};

export default RespondentsStep;