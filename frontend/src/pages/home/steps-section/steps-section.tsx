import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextButton from '../../../components/text-button/text-button';
import DashedRoundLabel from '../../../components/dashed-round-label/dashed-round-label';
import { FORMS_ROUTES } from '../../../consts/routes';

import classes from './steps-section.module.css';
import UploadIcon from '../../../../images/upload-icon-black.png';
import AssesmentIcon from '../../../../images/assesment-icon-black.png';
import CharactersIcon from '../../../../images/characters-icon-black.svg';
import ArrowRightIcon from '../../../../images/arrow-right-icon.svg';
import ConversationIconBlue from '../../../../images/conversation-icon-blue.svg';
import ButtonCrossIconRed from '../../../../images/button-cross-icon-red.svg';


const StepsSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className={classes.section}>
            <header className={classes.header}>
                <span className={classes.titleRow}>
                    <h4 className={classes.subtitle}>
                        {t('home.stepsSection.header.firstPart')}
                    </h4>
                    <DashedRoundLabel text={t('home.stepsSection.header.secondPart')} />
                    <h4 className={classes.subtitle}>
                        {t('home.stepsSection.header.thirdPart')}
                    </h4>
                </span>
                <span className={classes.titleRow}>
                    <h4 className={classes.subtitle}>
                        {t('home.stepsSection.header.fourthPart')}
                    </h4>
                    <h2 className={classes.title}>
                        {t('home.stepsSection.header.fifthPart')}
                    </h2>
                    <h4 className={classes.subtitle}>
                        {t('home.stepsSection.header.sixthPart')}
                    </h4>
                </span>
            </header>
            <section className={classes.content}>
                <div className={classes.left}>
                    <div className={classes.icons}>
                        <DashedRoundLabel
                            className={classes.numericalLabel}
                            text="1"
                            round={true}
                        />
                        <img className={classes.sectionIcon} src={UploadIcon} />
                    </div>
                    <div>
                        <h4 className={classes.sectionTitle}>
                            {t('home.stepsSection.content.firstStep.title')}
                        </h4>
                        <p className={classes.sectionText}>
                            {t('home.stepsSection.content.firstStep.text')}
                        </p>
                    </div>
                    <TextButton
                        className={classes.joinButton}
                        text={t('buttons.signUp')}
                        onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                    />
                </div>
                <img className={classes.arrow} src={ArrowRightIcon}/>
                <div className={classes.middle}>
                    <div className={classes.icons}>
                        <DashedRoundLabel
                            className={classes.numericalLabel}
                            text="2"
                            round={true}
                        />
                        <img className={classes.sectionIcon} src={CharactersIcon} />
                    </div>
                    <div>
                        <h4 className={classes.sectionTitle}>
                            {t('home.stepsSection.content.secondStep.title')}
                        </h4>
                        <p className={classes.sectionText}>
                            {t('home.stepsSection.content.secondStep.text1')}
                        </p>
                        <p className={classes.sectionText}>
                            {t('home.stepsSection.content.secondStep.text2')}
                        </p>
                    </div>
                    <div className={classes.photo}>
                        <img src={ConversationIconBlue} />
                        <img src={ButtonCrossIconRed} />
                    </div>
                </div>
                <img className={classes.arrow} src={ArrowRightIcon}/>
                <div className={classes.right}>
                    <div className={classes.icons}>
                        <DashedRoundLabel
                            className={classes.numericalLabel}
                            text="3"
                            round={true}
                        />
                        <img className={classes.sectionIcon} src={AssesmentIcon}/>
                    </div>
                    <div className={classes.rightText}>
                        <h4
                            className={classes.sectionTitle}
                        > 
                            {t('home.stepsSection.content.thirdStep.title')}
                        </h4>
                        <p className={classes.sectionText}>
                            {t('home.stepsSection.content.thirdStep.text')}
                        </p>
                    </div>
                    <TextButton
                        className={classes.joinButton}
                        text={t('buttons.signUp')}
                        onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                    />
                </div>
            </section>
        </section>
    );
};

export default StepsSection;