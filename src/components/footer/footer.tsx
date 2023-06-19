import React from 'react';


import Logo from '../logo/logo';

import ROUTES from '../../consts/routes';

import classes from './footer.module.css';
import FacebookIcon from '../../images/facebook-icon.svg';
import TwitterIcon from '../../images/twitter-icon.svg';
import InstagramIcon from '../../images/instagram-icon.svg';


const LINKS: {
    TITLE: string,
    PATH: string,
}[] = [
    ROUTES.CALCULATOR,
    ROUTES.TUTORIAL,
    ROUTES.BLOG,
    ROUTES.CONTACT,
];

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <section className={classes.row}>
                <Logo />
                <div className={classes.group}>
                    {LINKS.map(link => (
                            <a key={link.TITLE} className={classes.link} href={link.PATH}>{link.TITLE}</a>
                    ))}
                </div>
            </section>
            <section className={classes.row}>
                <span className={classes.biggerText}>Maximize your time.</span>
                <div className={classes.group}>
                    <a href="https://facebook.com">
                        <img src={FacebookIcon}/>
                    </a>
                    <a href="https://twitter.com">
                        <img src={TwitterIcon}/>
                    </a>
                    <a href="https://instagram.com">
                        <img src={InstagramIcon}/>
                    </a>
                </div>
            </section>
            <section className={classes.row}>
                <span>&copy; Interviewly, {(new Date()).getFullYear()}</span>
                <div className={classes.group}>
                        <a className={classes.link} href={ROUTES.PRIVACY_POLICY.PATH}>{ROUTES.PRIVACY_POLICY.TITLE}</a>
                        <a className={classes.link} href={ROUTES.TERMS.PATH}>{ROUTES.TERMS.TITLE}</a>
                </div>
            </section>
        </footer>
    );
};

export default Footer;