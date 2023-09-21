import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Logo from '../logo/logo';

import IconButton from '../icon-button/icon-button';
import CrossIcon from '../../../images/cross-icon.svg';

import ROUTES, { FORMS_ROUTES } from '../../consts/routes';

import classes from './navigation-bar-menu.module.css';
import { SAMPLE_VERSION } from 'config/current';
import TextButton from '../text-button/text-button';


const LINKS: {
    title: string,
    path: string,
    id: string,
}[] = [
    ...(SAMPLE_VERSION ? [] : [
        ROUTES.CALCULATOR,
        ROUTES.TUTORIALS,
    ]),
    ROUTES.BLOG,
    ROUTES.CONTACT,
].map(route => ({
    title: route.TITLE,
    path: route.PATH,
    id: route.PATH.slice(1), //exclude the slash '/'
}));

const NavigationBarMenu = ({
    onClose,
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const goToAccount = useCallback(() => navigate(ROUTES.LOG_IN.PATH), []);
    const goToJoin = useCallback(() => navigate(FORMS_ROUTES.JOIN.PATH), []);

    return (
        <div className={classes.navigationBarMenu}>
            <div className={classes.header}>
                <Logo />
                <IconButton
                    icon={CrossIcon}
                    onClick={onClose}
                />
            </div>
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
            <section className={classes.buttons}>
                <TextButton
                    className={classes.loginButton}
                    text={t('buttons.logIn')}
                    onClick={goToAccount}
                />
                <TextButton
                    text={t('buttons.signUp')}
                    onClick={goToJoin}
                />
            </section>
        </div>
    );
};

export default NavigationBarMenu;