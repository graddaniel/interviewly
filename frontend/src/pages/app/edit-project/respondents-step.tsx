import React from 'react';
import { useTranslation } from 'react-i18next';

import StepTitle from './step-title';
import SwitchInput from './switch-input';

import classes from './respondents-step.module.css';
import IDIconBlack from 'images/id-icon-black.svg';
import LanguagesIconBlack from 'images/languages-icon-black.svg';
import PlayIconBlack from 'images/play-icon-black.svg';
import BlankSurveyIconBlack from 'images/blank-survey-icon-black.svg'
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';
import TextInput from '../../../components/text-input/text-input';
import { useActionData } from 'react-router-dom';


const RespondentsStep = ({
    project,
}) => {
    const { t } = useTranslation();
    const actionData = useActionData() as any;
    const errors = actionData?.errors || {};

    const {
        otherRequirements,
        addLanguageTest,
        addScreeningSurvey,
        requireCandidateRecording,
    } = project;

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
                <TextInput
                    name="otherRequirements"
                    placeholder={t('editProject.respondentsStep.otherRequirementsInputPlaceholder')}
                    defaultValue={otherRequirements}
                    error={errors.otherRequirements}
                />
                <StepTitle
                    icon={LanguagesIconBlack}
                    title={t('editProject.respondentsStep.languageTestSubtitle')}
                />
                <SwitchInput
                    name="addLanguageTest"
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                    defaultValue={addLanguageTest}
                />
                <StepTitle
                    icon={BlankSurveyIconBlack}
                    title={t('editProject.respondentsStep.screeningSurveySubtitle')}
                />
                <SwitchInput
                    name="addScreeningSurvey"
                    leftLabel={capitalizeFirstLetter(t('generic.no'))}
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                    defaultValue={addScreeningSurvey}
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
                    name="requireCandidateRecording"
                    rightLabel={capitalizeFirstLetter(t('generic.yes'))}
                    defaultValue={requireCandidateRecording}
                />
            </div>
        </section>
    );
};

export default RespondentsStep;