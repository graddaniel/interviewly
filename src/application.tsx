import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NavigationBar from './components/navigation-bar/navigation-bar';
import Footer from './components/footer/footer';


const Application = () => {
    const { i18n } = useTranslation();

    const {
        resolvedLanguage,
        language,
    } = i18n;

    if (resolvedLanguage !== language) {
        i18n.changeLanguage(resolvedLanguage);
    }

    return (
        <>
            <NavigationBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Application;