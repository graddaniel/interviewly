import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import TextButton from '../text-button/text-button';
import Logo from '../logo/logo';

import IconButton from '../icon-button/icon-button';
import AccountIcon from '../../../images/account-icon.svg';
import MenuIcon from '../../../images/menu-icon.svg';

import ROUTES, { FORMS_ROUTES } from '../../consts/routes';

import classes from './navigation-bar.module.css';
import { SAMPLE_VERSION } from 'config/current';


const LINKS: {
    title: string,
    path: string,
    id: string,
}[] = [
    ...(SAMPLE_VERSION ? [] : [
        ROUTES.CALCULATOR,
        ROUTES.TUTORIALS,
        ROUTES.BLOG,
    ]),
    ROUTES.CONTACT,
].map(route => ({
    title: route.TITLE,
    path: route.PATH,
    id: route.PATH.slice(1), //exclude the slash '/'
}));

const NavigationBar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToAccount = useCallback(() => navigate(ROUTES.LOG_IN.PATH), []);
    const goToJoin = useCallback(() => navigate(FORMS_ROUTES.JOIN.PATH), []);

    return (
        <nav className={classes.navigationBar}>
            <section className={classes.leftGroup}>
                <Logo />
                <section className={classes.links}>
                    {LINKS.map(link => (
                        <a
                            key={link.id}
                            className={classes.link}
                            href={link.path}
                        >
                            {t(`links.${link.id}`)}
                        </a>
                    ))}
                </section>
            </section>
            <section className={classes.rightGroup}>
                <TextButton
                    className={classes.joinButton}
                    text={t('buttons.signUp')}
                    onClick={goToJoin}
                />
                {!SAMPLE_VERSION && (
                <IconButton
                    className={classes.loginButton}
                    icon={AccountIcon}
                    onClick={goToAccount}
                />
                )}
                <IconButton
                    className={classes.menuButton}
                    icon={MenuIcon}
                    onClick={() => console.log("TODO implement menu")}
                />
            </section>
        </nav>
    );
};

export default NavigationBar;