import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './not-found-page.module.css'


const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <main className={classes.container}>
            <h1 className={classes.header}>{t('pages.notFound')}</h1>
        </main>
    );
};

export default NotFoundPage;