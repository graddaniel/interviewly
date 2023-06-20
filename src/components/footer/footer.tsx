import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Logo from '../logo/logo';
import LanguageSelector from '../language-selector/language-selector';

import ROUTES from '../../consts/routes';

import classes from './footer.module.css';
import FacebookIcon from '../../images/facebook-icon.svg';
import TwitterIcon from '../../images/twitter-icon.svg';
import InstagramIcon from '../../images/instagram-icon.svg';
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
    id: route.PATH,
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
            <section className={classes.row}>
                <Logo />
                <div className={classes.group}>
                {LINKS.map(link => (
                        <a
                            key={link.id}
                            className={classes.link}
                            href={link.path}
                        >
                            {t(`links.${link.id}`)}
                        </a>
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
                        <LanguageSelector
                            onClick={openLanguageSelectionDialog}
                        />
                </div>
            </section>
            <LanguageSelectionDialog
                isOpen={isLanguageDialogOpen}
                onClose={closeLanguageSelectionDialog}
            />
        </footer>
    );
};

export default Footer;