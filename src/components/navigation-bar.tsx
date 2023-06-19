import React from 'react';

import TextButton from './text-button';
import Logo from './logo';

import classes from './navigation-bar.module.css';
import IconButton from './icon-button';
import AccountIcon from '../images/account-icon.svg';

const NavigationBar = () => {
    return (
        <nav className={classes.navigationBar}>
            <section className={classes.leftGroup}>
                <Logo />
                <section className={classes.links}>
                    <a className={classes.link} href="/">Price calculator</a>
                    <a className={classes.link} href="/">Tutorials</a>
                    <a className={classes.link} href="/">Blog</a>
                    <a className={classes.link} href="/">Contact</a>
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