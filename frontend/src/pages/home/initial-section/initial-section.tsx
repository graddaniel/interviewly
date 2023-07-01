import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import TextButton from '../../../components/text-button/text-button';
import { FORMS_ROUTES } from '../../../consts/routes';

import classes from './initial-section.module.css';
import ClockDashedIcon from '../../../../images/clock-dashed-icon.svg';
import Photo from '../../../../images/home-initial-section-photo.png';
import DecoratorImage from '../../../../images/decorator.svg';
import HomeInterviewDecorator from '../../../../images/home-interview-decorator-icon.svg';


const InitialSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <section className={classes.section}>
            <div>
                <h2 className={classes.title}>{t('home.initialSection.title')}</h2>
            </div>
            <div className={classes.buttonsRow}>
                <TextButton
                    className={classes.joinButton}
                    text={t('buttons.signUp')}
                    onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                />
                <img className={classes.interviewDecorator} src={HomeInterviewDecorator}/>
            </div>
            <div className={classes.maximizeYourTimeBox}>
                <div className={classes.timeBoxIcons}>
                    <img
                        className={classes.clockIcon}
                        src={ClockDashedIcon}
                    />
                    <div className={classes.decorators}>
                        <img
                            className={classes.decoratorImage}
                            src={DecoratorImage}
                        />
                        <img
                            className={classes.decoratorImage}
                            src={DecoratorImage}
                        />
                    </div>
                </div>
                <h5 className={classes.timeBoxText}>{t('home.initialSection.timeBoxText')}</h5>
            </div>
            <div
                style={{ backgroundImage: `url(${Photo})`}}
                className={classes.photoBox}
            >
            </div>
        </section>
    );
};

export default InitialSection;