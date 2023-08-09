import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { APP_FORMS_ROUTES } from '../../../consts/routes';

import classes from './calendar.module.css';


const LibraryPage = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section>
            {t('library.title')}
            {t('library.mySurveys')}
            {t('library.publicSurveys')}
            <button
                onClick={() => navigate(APP_FORMS_ROUTES.LIBRARY_EDITOR.PATH)}
            >
                {t('library.addNewTemplate')}
            </button>
        </section>
    );
};

export default LibraryPage;