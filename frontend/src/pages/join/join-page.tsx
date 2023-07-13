import React, { useCallback, useState, useRef,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useNavigate, useSubmit, useActionData } from 'react-router-dom';
import classNames from 'classnames';

import CloseControls from '../../components/close-controls/close-controls';
import Tile from '../../components/tile/tile';
import TextButton from '../../components/text-button/text-button';
import TextInput from '../../components/text-input/text-input';
import Checkbox from '../../components/checkbox/checkbox';
import CameraTile from '../../components/camera-tile/camera-tile';
import Stepper from '../../components/stepper/stepper';
import InterviewDialog from '../../components/interview-dialog/interview-dialog';
import ROUTES from '../../consts/routes';

import classes from './join-page.module.css';
import InterviewlyLogo from '../../../images/logo.svg';
import RespondentIcon from '../../../images/respondent-icon.svg';
import RecruiterIcon from '../../../images/recruiter-icon.svg';
import MaleIcon from '../../../images/male-icon.svg';
import FemaleIcon from '../../../images/female-icon.svg';
import { AccountTypes } from 'shared';


enum STEPS {
    TYPE_SELECTION = 1,
    GENDER_SELECTION = 2,
    DATA_FORM = 3,
    VIDEO_RECORDING = 4,
    FINAL = 5,
};

const JoinPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const submit = useSubmit();
    const actionData = useActionData() as { [k: string]: any };
    const formRef = useRef(null);

    const [ step, setStep ] = useState(1);
    const [ maxSteps, setMaxSteps ] = useState(0);
    const [ type, setType ] = useState('');
    const [ gender, setGender ] = useState('');
    const [ isInterviewDialogOpen, setIsInterviewDialogOpen ] = useState(false);
    const [ isVideoUploaded, setIsVideoUploaded ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

    const goToHome = useCallback(() => navigate(ROUTES.HOME.PATH), []);

    useEffect(() => {
        setIsLoading(false);

        console.log("useEffect actionData", actionData)
        if (!actionData) {
            return;
        }

        if (actionData.success) {
            if (step === STEPS.DATA_FORM) {
                type === 'recruiter'
                    ? setStep(STEPS.FINAL)
                    : setStep(STEPS.VIDEO_RECORDING);
            } else if (step === STEPS.VIDEO_RECORDING) {
                setStep(STEPS.FINAL);
            }
        } else {
            console.error(actionData.errors);
        }
    }, [actionData]);

    return (
        <Form method="post" className={classes.page} ref={formRef}>
            <input type="hidden" value={step} name="step" />
            <input type="hidden" value={gender} name="gender" />
            <input type="hidden" value={type} name="type" />
            <section className={classNames(
                classes.controls,
                step === 5 && classes.hidden || '',
            )}>
                <div className={classes.loginControls}>
                    <p>{t('join.joinControl')}</p>
                    <a href={ROUTES.LOG_IN.PATH}>
                        {t('buttons.logIn')}
                    </a>
                </div>
                <CloseControls
                    text={t('buttons.resign')}
                    onClose={goToHome}
                />
            </section>
            <header className={classes.header}>
                <img src={InterviewlyLogo} className={classes.logo}/>
                <h1 className={classes.title}>{t(`join.page${step}.title`)}</h1>
            </header>
            <section className={classNames(
                classes.content,
                step !== STEPS.TYPE_SELECTION && classes.noDisplay || ''
            )}> 
                <Tile
                    className={classNames(
                        classes.tile,
                    )}
                    title={t('join.page1.recruiterTitle')}
                    icon={RecruiterIcon}
                    subtitle={t('join.page1.recruiterSubtitle')}
                    onClick={() => {
                        setType('recruiter');
                        setStep(step => step + 1);
                        setMaxSteps(4);
                    }}
                />
                <Tile
                    className={classNames(
                        classes.tile,
                        step !== STEPS.TYPE_SELECTION && classes.noDisplay || ''
                    )}
                    title={t('join.page1.respondentTitle')}
                    icon={RespondentIcon}
                    subtitle={t('join.page1.respondentSubtitle')}
                    onClick={() => {
                        setType('respondent');
                        setStep(step => step + 1);
                        setMaxSteps(5);
                    }}
                />
            </section>
            {/* STEP 2*/}
            <section className={classNames(
                classes.horizontalContent,
                step !== STEPS.GENDER_SELECTION && classes.noDisplay || ''
            )}>     
                <Tile
                    className={classNames(
                        classes.tile,
                        classes.smallTile,
                        classes.desktop,
                    )}
                    title={t('join.page2.maleTitle')}
                    icon={MaleIcon}
                    onClick={() => {
                        setGender('male');
                        setStep(step => step + 1);
                    }}
                />
                <Tile
                    className={classNames(
                        classes.tile,
                        classes.smallTile,
                        classes.desktop,
                    )}
                    title={t('join.page2.femaleTitle')}
                    icon={FemaleIcon}
                    onClick={() => {
                        setGender('female');
                        setStep(step => step + 1);
                    }}
                />
                <Tile
                    className={classNames(
                        classes.tile,
                        classes.smallTile,
                        classes.nonDesktop,
                    )}
                    title={t('join.page2.maleTitleShort')}
                    icon={MaleIcon}
                    onClick={() => {
                        setGender('male');
                        setStep(step => step + 1);
                    }}
                />
                <Tile
                    className={classNames(
                        classes.tile,
                        classes.smallTile,
                        classes.nonDesktop,
                    )}
                    title={t('join.page2.femaleTitleShort')}
                    icon={FemaleIcon}
                    onClick={() => {
                        setGender('female');
                        setStep(step => step + 1);
                    }}
                />
            </section>
            {/* STEP 3 */}
            <section className={classNames(
                classes.content,
                step !== STEPS.DATA_FORM && classes.noDisplay || ''
            )}>                
                <section
                    className={classNames(
                        classes.inputs,
                    )}
                >
                    {['name', 'surname', 'email', 'password', 'repeatPassword'].map(
                        dataField => (
                            <TextInput
                                key={dataField}
                                type={
                                    dataField.toLowerCase().includes('password')
                                    ? 'password'
                                    : 'text'
                                }
                                className={classes.input}
                                name={dataField}
                                placeholder={t(`join.page3.inputs.${dataField}`)}
                                error={actionData?.errors?.[dataField]}
                            />
                    ))}
                    {type === AccountTypes.Type.RECRUITER && (
                        <TextInput
                            type="text"
                            className={classes.input}
                            name="companyName"
                            placeholder={t(`join.page3.inputs.companyName`)}
                            error={actionData?.errors?.companyName}
                        />
                    )}
                    <Checkbox
                        className={classes.checkbox}
                        name="agreement"
                        label={t('join.page3.rulesAgreement')}
                        error={actionData?.errors?.agreement}
                    />
                </section>
            </section>
            <section className={classNames(
                classes.content,
                step !== STEPS.VIDEO_RECORDING && classes.noDisplay || ''
            )}>
                <section className={classNames(
                    classes.recorder,
                )}>
                    <p className={classes.recorderText}>{t('join.page4.text')}</p>
                    {isLoading
                        ? (
                            <p className={classes.recorderText}>{t('join.page4.submissionText')}...</p>
                        ) : (
                            <CameraTile
                                className={classes.cameraTile}
                                onClick={() => {
                                    setIsInterviewDialogOpen(true);
                                    setIsVideoUploaded(true);
                                }}
                            />
                        )
                    }
                </section>
            </section>
            {step === STEPS.FINAL && (
                <section className={classNames(
                    classes.content,
                )}>
                    <div className={classes.finalMessageWrapper}>
                        <p
                            className={classes.recorderText}
                        >
                            {t('join.page5.text')}
                        </p>
                        <TextButton
                            className={classes.finalButton}
                            text={t('join.page5.homeButton')}
                            onClick={goToHome}
                        />
                    </div>
                </section>
            )}
            <section className={classNames(
                classes.navigation,
                step === STEPS.TYPE_SELECTION && classes.noDisplay || ''
            )}>
                <TextButton
                    className={classes.backButton}
                    text={t('join.back')}
                    onClick={() => setStep(step => step - 1)}
                    hidden={step === STEPS.TYPE_SELECTION || step === STEPS.FINAL}
                    disabled={false}
                    monochromatic={true}
                />
                <Stepper
                    className={classes.stepper}
                    currentStep={step - 1}
                    maxSteps={maxSteps - 1}
                    hidden={step === 1}
                />
                <TextButton
                    className={classes.skipButton}
                    text={t('join.skip')}
                    onClick={() => {
                        setIsLoading(true);
                        submit(formRef.current)
                    }}
                    hidden={step !== STEPS.VIDEO_RECORDING}
                    disabled={isLoading}
                    monochromatic={true}
                />
                <TextButton
                    className={classes.nextButton}
                    text={t('join.next')}
                    onClick={() => {
                        if (step === STEPS.DATA_FORM || step === STEPS.VIDEO_RECORDING) {
                            setIsLoading(true);
                            submit(formRef.current);
                        } else {
                            setStep(step => step + 1);
                        }
                    }}
                    hidden={step !== STEPS.DATA_FORM && step !== STEPS.VIDEO_RECORDING}
                    disabled={isLoading || step === STEPS.VIDEO_RECORDING && !isVideoUploaded}
                    monochromatic={false}
                />
            </section>
            <InterviewDialog
                isOpen={isInterviewDialogOpen}
                onClose={() => setIsInterviewDialogOpen(false)}
            />
            <div className={classes.mobileLoginControls}>
                <p>{t('join.joinControl')}</p>
                <a href={ROUTES.LOG_IN.PATH}>
                    {t('buttons.logIn')}
                </a>
            </div>
        </Form>
    );
};

export default JoinPage;