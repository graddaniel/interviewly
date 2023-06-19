import React from 'react';

import TextButton from './text-button';
import Logo from './logo';

import IconButton from './icon-button';
import AccountIcon from '../images/account-icon.svg';

import ROUTES from '../consts/routes';

import classes from './navigation-bar.module.css';


const LINKS: {
    TITLE: string,
    PATH: string,
}[] = [
    ROUTES.CALCULATOR,
    ROUTES.TUTORIAL,
    ROUTES.BLOG,
    ROUTES.CONTACT,
];

const NavigationBar = () => {
    return (
        <nav className={classes.navigationBar}>
            <section className={classes.leftGroup}>
                <Logo />
                <section className={classes.links}>
                    {LINKS.map(link => (
                        <a key={link.PATH} className={classes.link} href={link.PATH}>{link.TITLE}</a>
                    ))}
                </section>
            </section>
            <section className={classes.rightGroup}>
                <TextButton text={"Join Interviewly"} className={classes.joinButton}/>
                <IconButton icon={AccountIcon}/>
            </section>
        </nav>
    );
};

export default NavigationBar;