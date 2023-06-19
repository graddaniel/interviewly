import React from 'react';
import { useTranslation } from 'react-i18next';

import TextButton from '../text-button/text-button';
import Logo from '../logo/logo';

import IconButton from '../icon-button/icon-button';
import AccountIcon from '../../images/account-icon.svg';

import ROUTES from '../../consts/routes';

import classes from './navigation-bar.module.css';


const LINKS: {
    title: string,
    path: string,
    id: string,
}[] = [
    ROUTES.CALCULATOR,
    ROUTES.TUTORIALS,
    ROUTES.BLOG,
    ROUTES.CONTACT,
].map(route => ({
    title: route.TITLE,
    path: route.PATH,
    id: route.PATH,
}));

const NavigationBar = () => {
    const { t } = useTranslation();

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
                <TextButton text={t('buttons.signUp')} className={classes.joinButton}/>
                <IconButton
                    icon={AccountIcon}
                    onClick={() => console.log('TODO: account icon clicked')}
                />
            </section>
        </nav>
    );
};

export default NavigationBar;