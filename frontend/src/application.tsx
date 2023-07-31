import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import NavigationBar from './components/navigation-bar/navigation-bar';
import Footer from './components/footer/footer';
import { FeedbackMessageContext } from './contexts';
import Snackbar from './components/snackbar/snackbar';

import ROUTES from './consts/routes';


const Application = () => {
    const { i18n } = useTranslation();
    const location = useLocation();
    const [ feedback, setFeedback ] = useState({
        type: null,
        message: null,
    });

    const isFormsLocation = location.pathname.startsWith(ROUTES.FORMS.PATH);
    const isAppLocation = location.pathname.startsWith(ROUTES.APP.PATH);

    const {
        resolvedLanguage,
        language,
    } = i18n;

    if (resolvedLanguage !== language) {
        i18n.changeLanguage(resolvedLanguage);
    }

    return (
        <FeedbackMessageContext.Provider value={[feedback, setFeedback]}>
            <Snackbar />
            {!isFormsLocation && !isAppLocation && (
                <NavigationBar />
            )}
            <Outlet />
            {!isFormsLocation && !isAppLocation && (
                <Footer />
            )}
        </FeedbackMessageContext.Provider>
    );
};

export default Application;