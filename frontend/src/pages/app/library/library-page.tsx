import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextButton from '../../../components/text-button/text-button';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import { APP_FORMS_ROUTES } from '../../../consts/routes';

import classes from './library-page.module.css';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import { useLoaderHandler } from '../../../hooks/use-handlers';


const LibraryPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    
    const { data } = useLoaderHandler();

    if (!data) {
        return null;
    }
    const { templates } = data;

    return (
        <section className={classes.libraryPage}>
            <header className={classes.header}>
                <img className={classes.headerIcon} src={FoldersIconBlack}/>
                <h4 className={classes.title}>{t('library.title')}</h4>
            </header>
            <TextButton
                onClick={() => navigate(APP_FORMS_ROUTES.NEW_TEMPLATE.PATH)}
                text={t('library.addNewTemplate')}
            />
            <div className={classes.contentSection}>
                <span className={classes.subtitle}>{t('library.mySurveys')}</span>
                <div className={classes.surveysList}>
                    {templates.filter(t => t.isPrivate).map(t => (
                        <SurveyTile
                            key={t.uuid}
                            name={t.name}
                            onClick={() => navigate(generatePath(
                                APP_FORMS_ROUTES.EDIT_TEMPLATE.PATH,
                                { templateId: t.uuid }
                            ))}
                        />
                    ))}
                </div>
            </div>
            <div className={classes.contentSection}>
                <span className={classes.subtitle}>{t('library.publicSurveys')}</span>
                <div className={classes.surveysList}>
                    {templates.filter(t => !t.isPrivate).map(t => (
                        <SurveyTile
                            key={t.uuid}
                            name={t.name}
                            onClick={() => navigate(generatePath(
                                APP_FORMS_ROUTES.EDIT_TEMPLATE.PATH,
                                { templateId: t.uuid }
                            ))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LibraryPage;