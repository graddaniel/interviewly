import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TextButton from '../../components/text-button/text-button';

import classes from './fakedoor-final.module.css';
import FakedoorVideocallDesktop from 'images/TEMP/fakedoor-videocall-desktop.png';
import FakedoorVideocallTablet from 'images/TEMP/fakedoor-videocall-tablet.png';
import FakedoorVideocallMobile from 'images/TEMP/fakedoor-videocall-mobile.png';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../consts/routes';


const ENCRYPTED_EMAIL_ADDRESS = "Y29udGFjdEBpbnRlcnZpZXdseWFwcC5jb20=";

const FakedoorFinal = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const email = document.getElementById("email");
        if (!email) {
            return;
        }
        email.setAttribute("href", "mailto:".concat(atob(ENCRYPTED_EMAIL_ADDRESS)));
    }, []);
    

    return (
        <section className={classes.fakedoor}>
            <div className={classes.topTextArea}>
                <h2 className={classes.title}>{t('join.fakedoor.title')}</h2>
                <span className={classes.text1}>{t('join.fakedoor.text1.regular')}<strong>{t('join.fakedoor.text1.strong')}</strong></span>
                <h6 className={classes.subtitle}>
                    {t('join.fakedoor.subtitle.regular1')}
                    <strong>
                        {t('join.fakedoor.subtitle.strong')}
                    </strong>
                    {t('join.fakedoor.subtitle.regular2')}
                </h6>
            </div>
            <img className={classes.desktopPoster} src={FakedoorVideocallDesktop}/>
            <img className={classes.tabletPoster} src={FakedoorVideocallTablet}/>
            <img className={classes.mobilePoster} src={FakedoorVideocallMobile}/>
            <div className={classes.bottomTextArea}>
                <span className={classes.text2}>{t('join.fakedoor.text2.regular')}<strong>{t('join.fakedoor.text2.strong')}</strong></span>
                <h4 className={classes.text3}>{t('join.fakedoor.text3')}</h4>
                <a className={classes.email} id="email">{atob(ENCRYPTED_EMAIL_ADDRESS)}</a>

                <TextButton
                    className={classes.finalButton}
                    text={t('join.page5.homeButton')}
                    onClick={() => navigate(ROUTES.HOME.PATH)}
                />
            </div>
        </section>
    );
};

export default FakedoorFinal;