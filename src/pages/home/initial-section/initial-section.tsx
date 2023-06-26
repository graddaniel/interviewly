import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextButton from '../../../components/text-button/text-button';
import { FORMS_ROUTES } from '../../../consts/routes';

import classes from './initial-section.module.css';
import ClockIcon from '../../../../images/clock-icon.svg';
import Photo from '../../../../images/home-initial-section-photo.png';
import DecoratorImage from '../../../../images/decorator.svg';


const InitialSection = () => {
    const navigate = useNavigate();

    return (
        <section className={classes.section}>
            <div className={classes.leftSide}>
                <div>
                    <h1 className={classes.title}>Transform your recruitment</h1>
                    <h3 className={classes.subtitle}>and interviewing process</h3>
                </div>

                <TextButton
                    text="Join interviewly"
                    onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                />
            </div>
            <div className={classes.rightSide}>
                <div className={classes.maximizeYourTimeBox}>
                    <div className={classes.timeBoxIcons}>
                        <img
                            className={classes.clockIcon}
                            src={ClockIcon}
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
                    <h5 className={classes.timeBoxText}>Maximize your time</h5>
                </div>
                <img
                    className={classes.photoBox}
                    src={Photo}
                />
            </div>
        </section>
    );
};

export default InitialSection;