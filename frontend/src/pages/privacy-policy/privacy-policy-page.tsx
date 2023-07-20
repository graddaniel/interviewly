import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './privacy-policy-page.module.css';
import Decorator from '../../../images/decorator.svg';

import type en from '../../../i18n/en';

type PrivacyPolicy = typeof en.translation.privacyPolicy;

const PrivacyPolicyPage = () => {
    const { t } = useTranslation();

    const privacyPolicy = t('privacyPolicy', { returnObjects: true }) as PrivacyPolicy;
    console.log(privacyPolicy)

    const chapters = Object.keys(privacyPolicy).filter(k => k.includes('chapter'));

    const generateSublistElement = (element: { text: string, sublist: string[] }) => {
        return (<>
            {element.text}
            <ul className={classes.sublist}>
                {element.sublist.map((li: string, i: number) => (
                    <li key={i}>{li}</li>
                ))}
            </ul>
        </>);
    };

    const generateParagraph = (number: number, paragraph: string | any[] | { text: string, sublist: string[] }) => {
        if (typeof paragraph === 'string') {
            return (<>
                <span>§ {number}</span>
                <p>{paragraph}</p>
            </>);
        } else if (Array.isArray(paragraph)) {
            return (
                <ol>
                    {paragraph.map((p, i) => (
                        <li key={i}>{
                            typeof p === 'string'
                                ? p
                                : generateSublistElement(p)
                        }</li>
                    ))}
                </ol>
            );
        } else if (typeof paragraph === 'object') {
            return generateSublistElement(paragraph);
        }

        return null;
    };

    return (
        <article className={classes.privacyPolicy}>
            <h1 className={classes.header}>
                {privacyPolicy.header}
            </h1>
            <hr/>
            <nav className={classes.navigation}>
                {chapters.map(c => (
                    <a key={c} href={`#${c}`} className={classes.link}>
                        {privacyPolicy[c]}
                    </a>
                ))}
                {t('generic.created')}: 19.07.2023
            </nav>
            <section className={classes.privacyPolicyContent}>
                <div className={classes.decoratorSection}>
                    <img src={Decorator} />
                    <img src={Decorator} />
                </div>
                <h4 id="chapterOne" className={classes.contentHeader}>I. {privacyPolicy.chapterOne.toUpperCase()}</h4>
                {generateParagraph(1, privacyPolicy.paragraphOne)}
                {generateParagraph(2, privacyPolicy.paragraphTwo)}
                <h4 id="chapterTwo" className={classes.contentHeader}>II. {privacyPolicy.chapterTwo.toUpperCase()}</h4>
                {generateParagraph(3, privacyPolicy.paragraphThree)}
                {generateParagraph(4, privacyPolicy.paragraphFour)}
                {generateParagraph(5, privacyPolicy.paragraphFive)}
                {generateParagraph(6, privacyPolicy.paragraphSix)}
                {generateParagraph(7, privacyPolicy.paragraphSeven)}
                <h4 id="chapterThree" className={classes.contentHeader}>III. {privacyPolicy.chapterThree.toUpperCase()}</h4>
                {generateParagraph(8, privacyPolicy.paragraphEight)}
                {generateParagraph(9, privacyPolicy.paragraphNine)}
                {generateParagraph(10, privacyPolicy.paragraphTen)}
                <h4 id="chapterFour" className={classes.contentHeader}>IV. {privacyPolicy.chapterFour.toUpperCase()}</h4>
                {generateParagraph(11, privacyPolicy.paragraphEleven)}
                <h4 id="chapterFive" className={classes.contentHeader}>V. {privacyPolicy.chapterFive.toUpperCase()}</h4>
                {generateParagraph(12, privacyPolicy.paragraphTwelve)}
                {generateParagraph(13, privacyPolicy.paragraphThirteen)}
            </section>
        </article>
    );
};

export default PrivacyPolicyPage;