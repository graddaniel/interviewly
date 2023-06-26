import React from 'react';
import { useNavigate } from 'react-router-dom';

import TextButton from '../../../components/text-button/text-button';
import { FORMS_ROUTES } from '../../../consts/routes';

import classes from './steps-section.module.css';
import UploadIcon from '../../../../images/upload-icon-black.png';
import OneIcon from '../../../../images/one-icon-white.png';
import AssesmentIcon from '../../../../images/assesment-icon-black.png';
import ThreeIcon from '../../../../images/three-icon-white.png';
import StepsSectionPhoto from '../../../../images/steps-section-photo.png';


const StepsSection = () => {
    const navigate = useNavigate();

    return (
        <section className={classes.section}>
            <header className={classes.header}>
                <h2 className={classes.title}>Only 3 steps</h2>
                <h4 className={classes.subtitle}>to find the best employee</h4>
            </header>
            <section className={classes.content}>
                <div className={classes.left}>
                    <div className={classes.icons}>
                        <img src={OneIcon}/>
                        <img src={UploadIcon} />
                    </div>
                    <h5
                        className={classes.text}
                    >
                        Upload the candidate database
                    </h5>
                    <TextButton
                        text="Join Interviewly"
                        onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                    />
                </div>
                <div className={classes.middle}>
                    <div className={classes.middlePhoto}>
                        <img src={StepsSectionPhoto}/>
                    </div>
                </div>
                <div className={classes.right}>
                    <div className={classes.icons}>
                        <img src={ThreeIcon}/>
                        <img src={AssesmentIcon}/>
                    </div>
                    <h5
                        className={classes.text}
                    > 
                        Receive an assesment of the candidate
                    </h5>
                    <TextButton
                        text="Join Interviewly"
                        onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                    />
                </div>
            </section>
        </section>
    );
};

export default StepsSection;