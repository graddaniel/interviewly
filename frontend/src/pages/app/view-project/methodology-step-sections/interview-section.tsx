
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResearchTypes } from 'shared';

import MethodologyTile from '../../../../components/methodology-tile/methodology-tile';
import TextButton from '../../../../components/text-button/text-button';
import SurveyTile from '../../../../components/survey-tile/survey-tile';
import { APP_FORMS_ROUTES } from '../../../../consts/routes';

import classes from './interview-section.module.css';

const TILES = [
    'Interviewly survey 1',
    'Interviewly survey 2',
    'Interviewly survey 3',
    'Interviewly survey 4'
];

type InterviewSectionProps = {
    
};

const InterviewSection = ({

}: InterviewSectionProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    console.log(t('viewProject.methodology', { returnObjects: true } ), t('viewProject.methodology.interview.createSurvey'))

    return (
        <div className={classes.content}>
            <MethodologyTile
                className={classes.methodologyTile}
                mini={true}
                selected={false}
                methodology={ResearchTypes.Methodology.Interview}
            />
            <TextButton
                className={classes.createSurveyButton}
                text={t('viewProject.methodology.interview.createSurvey')}
                onClick={() => navigate(APP_FORMS_ROUTES.LIBRARY_EDITOR.PATH)}
            />
            <h6 className={classes.instruction}>{t('viewProject.methodology.interview.instruction')}</h6>
            <div className={classes.tiles}>
                {TILES.map(tileName => (
                    <SurveyTile
                        key={tileName}
                        name={tileName}
                        onClick={() => console.log(`Clicked: ${tileName}`)}
                    />
                ))}
            </div>
            <TextButton
                className={classes.saveSurveySelectionButton}
                text={t('viewProject.methodology.interview.save')}
                onClick={() => console.log("Save survey selection")}
            />
        </div>
    );
};

export default InterviewSection;