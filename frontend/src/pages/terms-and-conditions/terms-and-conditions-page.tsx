import React from 'react';
import { useTranslation } from 'react-i18next';

import ROUTES from '../../consts/routes';

import classes from './terms-and-conditions-page.module.css';
import Decorator from 'images/decorator.svg';

import type en from '../../../i18n/en';

type TermsAndConditions = typeof en.translation.termsAndConditions;

const TermsAndConditionsPage = () => {
    const { t } = useTranslation();
    
    const termsAndConditions = t('termsAndConditions', { returnObjects: true }) as TermsAndConditions;
    const sections = Object.entries(termsAndConditions).map(e => e[0]).slice(2); //remove header and created
    
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
        romanNumber: string,
        headerId: string,
        sectionObject,
    ) => {
        return (<>
            <h4 id={headerId} className={classes.contentHeader}>{romanNumber}. {sectionObject.header.toUpperCase()}</h4>
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


    return (
        <article className={classes.termsAndConditions}>
            <h1 className={classes.header}>
                {termsAndConditions.header}
            </h1>
            <hr/>
            <nav className={classes.navigation}>
                {sections.map(s => (
                    <a key={s} href={`#${s}`} className={classes.link}>
                        {termsAndConditions[s].header}
                    </a>
                ))}
                {t('generic.created')}: 19.07.2023
            </nav>
            <section className={classes.tosContent}>
                <div className={classes.decoratorSection}>
                    <img src={Decorator} />
                    <img src={Decorator} />
                </div>
                <h4 id="generalProvisions" className={classes.contentHeader}>I. {termsAndConditions.generalProvisions.header.toUpperCase()}</h4>
                <div>
                    {termsAndConditions.generalProvisions.main}
                </div>
                <div>
                    {termsAndConditions.generalProvisions.listHeader}
                </div>
                <ul>
                    {termsAndConditions.generalProvisions.list.map((li, i) => (
                        <li key={i}>{li}</li>
                    ))}
                </ul>
                <h4 id="definitions" className={classes.contentHeader}>II. {termsAndConditions.definitions.header.toUpperCase()}</h4>
                <ol>
                    {termsAndConditions.definitions.list.map(({ phrase, definition }) => (
                        <li key={phrase}>
                            <strong>{phrase.toUpperCase()}</strong> - {definition}
                        </li>
                    ))}
                </ol>
                {generateSection('III', 'obligationsOfServiceProvider', termsAndConditions.obligationsOfServiceProvider)}
                {generateSection('IV', 'principlesOfApplicationUse', termsAndConditions.principlesOfApplicationUse)}
                {generateSection('V', 'feesAndPayments', termsAndConditions.feesAndPayments)}
                {generateSection('VI', 'support', termsAndConditions.support)}
                {generateSection('VII', 'compliants', termsAndConditions.compliants)}
                {generateSection('VIII', 'serviceData', termsAndConditions.serviceData)}
                {generateSection('IX', 'conditionsOfCeasementOfContract', termsAndConditions.conditionsOfCeasementOfContract)}
                {generateSection('X', 'finalProvisions', termsAndConditions.finalProvisions)}
                <a href={ROUTES.PERSONAL_DATA_PROCESSING_AGREEMENT.PATH}>{t('links.personalDataProcessingAgreement')}</a>
            </section>
        </article>
    );
};

export default TermsAndConditionsPage;