import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextButton from '../../../components/text-button/text-button';
import { FORMS_ROUTES } from '../../../consts/routes';

import classes from './world-section.module.css';
import WorldSectionDiagram from '../../../../images/world-section-diagram.png';
import WorldSectionDiagramSmall from '../../../../images/world-section-diagram-small.svg';
import {
    PolishFlagIcon,
    AmericanFlagIcon,
    PortugueseFlagIcon,
    JapaneseFlagIcon,
    IndianFlagIcon,
} from '../../../../images/flag-icons'


const WorldSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const goToJoin = useCallback(()=> navigate(FORMS_ROUTES.JOIN.PATH), []);

    return (
        <section className={classes.section}>
            <img className={classes.diagram} src={WorldSectionDiagram} />
            <img className={classes.diagramNonDesktop} src={WorldSectionDiagramSmall} />
            <div className={classes.flagIcons}>
                <img className={classes.flagIcon} src={PolishFlagIcon} />
                <img className={classes.flagIcon} src={AmericanFlagIcon} />
                <img className={classes.flagIcon} src={PortugueseFlagIcon} />
                <img className={classes.flagIcon} src={JapaneseFlagIcon} />
                <img className={classes.flagIcon} src={IndianFlagIcon} />
            </div>
            <div className={classes.text}>
                <h4 className={classes.firstLine}>
                    {t('home.worldSection.firstLine')}
                </h4>
                <h2 className={classes.secondLine}>
                    {t('home.worldSection.secondLine')}
                </h2>
            </div>
            <TextButton
                className={classes.signUpButton}
                text={t('buttons.signUp')}
                onClick={goToJoin}
            />
        </section>
    );
};

export default WorldSection;