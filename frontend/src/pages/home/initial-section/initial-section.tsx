import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextButton from '../../../components/text-button/text-button';
import { FORMS_ROUTES } from '../../../consts/routes';

import classes from './initial-section.module.css';
import ClockDashedIcon from '../../../../images/clock-dashed-icon.svg';
import Photo from '../../../../images/home-initial-section-photo.png';
import DecoratorImage from '../../../../images/decorator.svg';
import HomeInterviewDecorator from '../../../../images/home-interview-decorator-icon.svg';


const InitialSection = () => {
    const navigate = useNavigate();

    return (
        <section className={classes.section}>
            <div className={classes.leftSide}>
                <div>
                    <h2 className={classes.title}>AI Powered recruitment and interviewing</h2>
                </div>
                <div className={classes.buttonsRow}>
                    <TextButton
                        text="Join interviewly"
                        onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                    />
                    <img src={HomeInterviewDecorator}/>
                </div>
            </div>
            <div className={classes.rightSide}>
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