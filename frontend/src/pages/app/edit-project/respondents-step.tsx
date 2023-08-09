import React from 'react';
import { useTranslation } from 'react-i18next';

import StepTitle from './step-title';
import SwitchInput from './switch-input';
import TitledDivider from '../../../components/titled-divider/titled-divider';

import classes from './respondents-step.module.css';
import IDIconBlack from 'images/id-icon-black.svg';
import LanguagesIconBlack from 'images/languages-icon-black.svg';
import PlayIconBlack from 'images/play-icon-black.svg';
import BlankSurveyIconBlack from 'images/blank-survey-icon-black.svg'
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';


const RespondentsStep = ({
    project,
}) => {
    const { t } = useTranslation();

    return (
        <section className={classes.respondentsStep}>
            <StepTitle
                icon={IDIconBlack}
                title={t('editProject.respondentsStep.respondentsSelectionSubtitle')}
            />
            <div className={classes.text}>
                <span>{t('editProject.respondentsStep.respondentsSelectionInstructionPart1')}</span>
            </div>
            <input type="file" id="respondentsFile" name="respondentsFile" />
            <div className={classes.text}>
                <span>{t('editProject.respondentsStep.respondentsSelectionInstructionPart2')}</span>
            </div>
            <div className={classes.filters}>
                <div className={classes.genderFilters}>
                    <span className={classes.genderTitle}>
                        {t('editProject.respondentsStep.genderLabel')}
                    </span>
                    <SwitchInput
                        className={classes.maleSwitch}
                        rightLabel={capitalizeFirstLetter(t('genders.male'))}
                        name="male"
                    />
                    <SwitchInput
                        className={classes.femaleSwitch}
                        rightLabel={capitalizeFirstLetter(t('genders.female'))}
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
                <TitledDivider title={t('editProject.respondentsStep.otherRequirementsInputPlaceholder')} />
                <StepTitle
                    icon={LanguagesIconBlack}
                    title={t('editProject.respondentsStep.languageTestSubtitle')}
                />
                <SwitchInput
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    name="languagesTest"
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                />
                <StepTitle
                    icon={BlankSurveyIconBlack}
                    title={t('editProject.respondentsStep.screeningSurveySubtitle')}
                />
                <SwitchInput
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    name="screening"
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                />
                <div className={classes.text}>
                    <span>{t('editProject.respondentsStep.screeningSurveyDescription')}</span>
                </div>
                <StepTitle
                    icon={PlayIconBlack}
                    title={t('editProject.respondentsStep.recordingSubtitle')}
                />
                <SwitchInput
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    name="recording"
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                />
            </div>
        </section>
    );
};

export default RespondentsStep;