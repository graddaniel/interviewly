import React, { useEffect } from 'react';
import { Form } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Decorator from '../../components/decorator/decorator';
import TextInput from '../../components/text-input/text-input';
import SubmitButton from '../../components/submit-button/submit-button';

import classes from './contact-page.module.css';
import { useActionHandler } from '../../hooks/use-handlers';


//contact@interv... ; to prevent bots from scraping it
const ENCRYPTED_EMAIL_ADDRESS = "Y29udGFjdEBpbnRlcnZpZXdseWFwcC5jb20=";

const ContactPage = () => {
    const { t } = useTranslation();
    const actionData = useActionHandler(t('contactForm.messageSent'));

    const errors = actionData?.errors ?? {};

    useEffect(() => {
        const email = document.getElementById("email");
        if (!email) {
            return;
        }
        email.setAttribute("href", "mailto:".concat(atob(ENCRYPTED_EMAIL_ADDRESS)));
    }, []);

    return (
        <section className={classes.contactPage}>
            <h1 className={classes.header}>{t('contactForm.getInTouch')}</h1>
            <div className={classes.address}>
                <span>Equator II Business Centre</span>
                <span>Al. Jerozolimskie 96</span>
                <span>00-807 Warsaw</span>
            </div>
            <h4 className={classes.phoneNumber}>+48 (22) 290 43 74</h4>
            <h4 className={classes.email}><a id="email">{atob(ENCRYPTED_EMAIL_ADDRESS)}</a></h4>
            <Form method="post" className={classes.contactForm}>
                <h4 className={classes.formHeader}>{t('contactForm.sendUsAMessage')}</h4>
                <Decorator />
                <TextInput
                    name="email"
                    placeholder={t('contactForm.emailLabel')}
                    error={errors.email}
                />
                <TextInput
                    name="message"
                    placeholder={t('contactForm.messageLabel')}
                    multiline={true}
                    error={errors.message}
                />
                <SubmitButton
                    className={classes.submitButton}
                    text={t('contactForm.sendButtonText')}
                />
            </Form>
            <div className={classes.poster}>
                <h4 className={classes.posterTitle}>{t('contactForm.quote')}</h4>
            </div>
        </section>
    );
};

export default ContactPage;

{/* <span>e-mail: <a id="email">{atob(ENCRYPTED_EMAIL_ADDRESS)}</a></span>
<span>{t('contact.address')}: Equator II Business Centre</span>
<span>Al. Jerozolimskie 96</span>
<span>00-807 {t('contact.warsaw')}</span>
<span>{t('contact.phone')}: +48 (22) 290 43 74</span> */}