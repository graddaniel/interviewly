import React from 'react';
import { useNavigate } from 'react-router-dom';

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

    return (
        <section className={classes.section}>
            <header className={classes.header}>
                <span className={classes.titleRow}>
                    <h4 className={classes.subtitle}>Only</h4>
                    <DashedRoundLabel text="3 steps"/>
                    <h4 className={classes.subtitle}>to</h4>
                </span>
                <span className={classes.titleRow}>
                    <h4 className={classes.subtitle}>find the</h4>
                    <h2 className={classes.title}>best</h2>
                    <h4 className={classes.subtitle}>employee</h4>
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
                        <img src={UploadIcon} />
                    </div>
                    <div>
                        <h4 className={classes.sectionTitle}>
                            Upload
                        </h4>
                        <p className={classes.sectionText}>
                            the candidate database
                        </p>
                    </div>
                    <TextButton
                        text="Join Interviewly"
                        onClick={() => navigate(FORMS_ROUTES.JOIN.PATH)}
                    />
                </div>
                <img src={ArrowRightIcon}/>
                <div className={classes.middle}>
                    <div className={classes.icons}>
                        <DashedRoundLabel
                            className={classes.numericalLabel}
                            text="2"
                            round={true}
                        />
                        <img src={CharactersIcon} />
                    </div>
                    <div>
                        <h4 className={classes.sectionTitle}>
                            Conduct
                        </h4>
                        <p className={classes.sectionText}>
                            video call, program questionnaires
                        </p>
                        <p className={classes.sectionText}>
                            check language skills
                        </p>
                    </div>
                    <div className={classes.photo}>
                        <img src={ConversationIconBlue} />
                        <img src={ButtonCrossIconRed} />
                    </div>
                </div>
                <img src={ArrowRightIcon}/>
                <div className={classes.right}>
                    <div className={classes.icons}>
                        <DashedRoundLabel
                            className={classes.numericalLabel}
                            text="3"
                            round={true}
                        />
                        <img src={AssesmentIcon}/>
                    </div>
                    <div>
                        <h4
                            className={classes.sectionTitle}
                        > 
                            Receive
                        </h4>
                        <p className={classes.sectionText}>
                            candidate's assesment
                        </p>
                    </div>
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