import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NavigationBar from './components/navigation-bar/navigation-bar';
import Footer from './components/footer/footer';

import ROUTES from './consts/routes';


const Application = () => {
    const { i18n } = useTranslation();
    const location = useLocation();

    const isFormsLocation = location.pathname.startsWith(ROUTES.FORMS.PATH);

    const {
        resolvedLanguage,
        language,
    } = i18n;

    if (resolvedLanguage !== language) {
        i18n.changeLanguage(resolvedLanguage);
    }

    return (
        <>
            {!isFormsLocation && (
                <NavigationBar />
            )}
            <Outlet />
            {!isFormsLocation && (
                <Footer />
            )}
        </>
    );
};

export default Application;