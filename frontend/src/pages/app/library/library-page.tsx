import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextButton from '../../../components/text-button/text-button';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import { APP_FORMS_ROUTES } from '../../../consts/routes';

import classes from './library-page.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';

const SURVEY_NAMES = [
    'Interviewly survey 1',
    'Interviewly survey 2',
    'Interviewly survey 3',
    'Interviewly survey 4',
    'Interviewly survey 5',
    'Interviewly survey 6'
];

const LibraryPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className={classes.libraryPage}>
            <header className={classes.header}>
                <img className={classes.headerIcon} src={FoldersIconBlack}/>
                <h4 className={classes.title}>{t('library.title')}</h4>
            </header>
            <TextButton
                onClick={() => navigate(APP_FORMS_ROUTES.LIBRARY_EDITOR.PATH)}
                text={t('library.addNewTemplate')}
            />
            <div className={classes.contentSection}>
                <span className={classes.subtitle}>{t('library.mySurveys')}</span>
                <div className={classes.surveysList}>
                    {SURVEY_NAMES.map(surveyName => (
                        <SurveyTile
                            name={surveyName}
                            onClick={() => console.log(surveyName)}
                        />
                    ))}
                </div>
            </div>
            <div className={classes.contentSection}>
                <span className={classes.subtitle}>{t('library.publicSurveys')}</span>
                <div className={classes.surveysList}>
                    {SURVEY_NAMES.map(surveyName => (
                        <SurveyTile
                            name={surveyName}
                            onClick={() => console.log(surveyName)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LibraryPage;