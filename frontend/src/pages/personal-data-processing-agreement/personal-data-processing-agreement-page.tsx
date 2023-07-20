import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './personal-data-processing-agreement-page.module.css';
import Decorator from '../../../images/decorator.svg';

import type en from '../../../i18n/en';

type PersonalDataProcessingAgreement = typeof en.translation.personalDataProcessingAgreement;

const PersonalDataProcessingAgreementPage = () => {
    const { t } = useTranslation();
    
    const pdpa = t('personalDataProcessingAgreement', { returnObjects: true }) as PersonalDataProcessingAgreement;
    const rulesTitles = pdpa.rules.map(e => e.title);

    const generateSublistElement = (element: { text: string, sublist: string[] }) => {
        return (<>
            {element.text}
            <ul>
                {element.sublist.map((li: string, i: number) => (
                    <li key={i}>{li}</li>
                ))}
            </ul>
        </>);
    };

    const generateSection = (
        number: number,
        sectionObject,
    ) => {
        return (<>
            <h4 id={sectionObject.title} className={classes.contentHeader}>§{number} {sectionObject.title.toUpperCase()}</h4>
            <ol>
                {sectionObject.list.map((li, i) => (
                    <li key={i}>
                        {typeof li === 'string'
                            ? li
                            : generateSublistElement(li)
                        }
                    </li>
                ))}
            </ol>
        </>);
    }

    const generateRules = (rules: typeof pdpa.rules) => {
        return (
            <ul className={classes.rules}>
            {rules.map((rule, i) => (
                <li key={rule.title}>
                    {generateSection(i, rule)}
                </li>
            ))}
            </ul>
        );
    }

    return (
        <article className={classes.pdpa}>
            <h1 className={classes.header}>
                {pdpa.header}
            </h1>
            <hr/>
            <nav className={classes.navigation}>
                {rulesTitles.map(title => (
                    <a key={title} href={`#${title}`} className={classes.link}>
                        {title}
                    </a>
                ))}
                {t('generic.created')}: 19.07.2023
            </nav>
            <section className={classes.content}>
                <div className={classes.decoratorSection}>
                    <img src={Decorator} />
                    <img src={Decorator} />
                </div>
                <span>
                    {pdpa.text}
                </span>
                {generateRules(pdpa.rules)}
                <span>{pdpa.annex.title}</span>
                <div className={classes.table}>
                    {pdpa.annex.table.map(row => row.map(cell => (
                        <span className={classes.cell}>{cell}</span>
                    )))}
                </div>
            </section>
        </article>
    );
};

export default PersonalDataProcessingAgreementPage;