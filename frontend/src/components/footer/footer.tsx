import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../logo/logo';
import LanguageSelector from '../language-selector/language-selector';

import ROUTES from '../../consts/routes';

import classes from './footer.module.css';
import FacebookIcon from '../../../images/facebook-icon.svg';
import TwitterIcon from '../../../images/twitter-icon.svg';
import InstagramIcon from '../../../images/instagram-icon.svg';
import LanguageSelectionDialog from '../language-selection-dialog/language-selection-dialog';


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
    id: route.PATH.slice(1), //exclude the slash '/'
}));

const Footer = () => {
    const { t } = useTranslation();
    const [ isLanguageDialogOpen, setIsLanguageDialogOpen ] = useState(false);

    const openLanguageSelectionDialog = useCallback(
        () => setIsLanguageDialogOpen(true),
        [],
    );
    const closeLanguageSelectionDialog = useCallback(
        () => setIsLanguageDialogOpen(false),
        [],
    );

    return (
        <footer className={classes.footer}>
            <div className={classes.nonMobile}>
                <section className={classes.brand}>
                    <Logo />
                    <span className={classes.biggerText}>Maximize your time.</span>
                    <span>&copy; Interviewly, {(new Date()).getFullYear()}</span>
                </section>
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
                <section className={classes.socialPages}>
                    <a href="https://facebook.com">
                        <img src={FacebookIcon}/>
                    </a>
                    <a href="https://twitter.com">
                        <img src={TwitterIcon}/>
                    </a>
                    <a href="https://instagram.com">
                        <img src={InstagramIcon}/>
                    </a>
                </section>
                <section className={classes.formal}>
                    <a className={classes.link} href={ROUTES.PRIVACY_POLICY.PATH}>{ROUTES.PRIVACY_POLICY.TITLE}</a>
                    <a className={classes.link} href={ROUTES.TERMS.PATH}>{ROUTES.TERMS.TITLE}</a>
                    <LanguageSelector
                        onClick={openLanguageSelectionDialog}
                    />
                </section>
            </div>
            <div className={classes.mobile}>
                <Logo />

                <section className={classes.brandText}>
                    <span className={classes.biggerText}>Maximize your time.</span>
                    <span>&copy; Interviewly, {(new Date()).getFullYear()}</span>
                </section>
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
                <section className={classes.socialPages}>
                    <a href="https://facebook.com">
                        <img src={FacebookIcon}/>
                    </a>
                    <a href="https://twitter.com">
                        <img src={TwitterIcon}/>
                    </a>
                    <a href="https://instagram.com">
                        <img src={InstagramIcon}/>
                    </a>
                </section>
                <section className={classes.formal}>
                    <a className={classes.link} href={ROUTES.PRIVACY_POLICY.PATH}>{ROUTES.PRIVACY_POLICY.TITLE}</a>
                    <a className={classes.link} href={ROUTES.TERMS.PATH}>{ROUTES.TERMS.TITLE}</a>
                </section>
                <LanguageSelector
                    onClick={openLanguageSelectionDialog}
                />
            </div>
            <LanguageSelectionDialog
                isOpen={isLanguageDialogOpen}
                onClose={closeLanguageSelectionDialog}
            />
        </footer>
    );
};

export default Footer;