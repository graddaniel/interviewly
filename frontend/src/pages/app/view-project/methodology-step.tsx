import React from 'react';
import { ResearchTypes } from 'shared';

import TextButton from '../../../components/text-button/text-button';
import MethodologyTile from '../../../components/methodology-tile/methodology-tile';

import classes from './methodology-step.module.css';
import { useNavigate } from 'react-router-dom';
import { APP_FORMS_ROUTES } from '../../../consts/routes';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import { useTranslation } from 'react-i18next';


type MethodologyStepProps = {

};

const TILES = [
    'Interviewly survey 1',
    'Interviewly survey 2',
    'Interviewly survey 3',
    'Interviewly survey 4'
];

const MethodologyStep = ({

}: MethodologyStepProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className={classes.methodologyStep}>
            <MethodologyTile
                className={classes.methodologyTile}
                mini={true}
                selected={false}
                methodology={ResearchTypes.Methodology.Interview}
            />
            <TextButton
                className={classes.createSurveyButton}
                text={t('viewProject.methodology.createSurvey')}
                onClick={() => navigate(APP_FORMS_ROUTES.LIBRARY_EDITOR.PATH)}
            />
            <h6 className={classes.instruction}>{t('viewProject.methodology.instruction')}</h6>
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
                text={t('viewProject.methodology.save')}
                onClick={() => console.log("Save survey selection")}
            />
        </section>
    );
};

export default MethodologyStep;