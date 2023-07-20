import React, { useEffect } from 'react';

import classes from './contact-page.module.css';
import { useTranslation } from 'react-i18next';


// to prevent bots from scraping it
const ENCRYPTED_EMAIL_ADDRESS = "Y29udGFjdEBpbnRlcnZpZXdseWFwcC5jb20=";

const ContactPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        const email = document.getElementById("email");
        if (!email) {
            return;
        }
        email.setAttribute("href", "mailto:".concat(atob(ENCRYPTED_EMAIL_ADDRESS)));
    }, []);

    return (
        <section className={classes.contactPage}>
            <span>e-mail: <a id="email">{atob(ENCRYPTED_EMAIL_ADDRESS)}</a></span>
            <span>{t('contact.address')}: Equator II Business Centre</span>
            <span>Al. Jerozolimskie 96</span>
            <span>00-807 {t('contact.warsaw')}</span>
            <span>{t('contact.phone')}: +48 (22) 290 43 74</span>
        </section>
    );
};

export default ContactPage;