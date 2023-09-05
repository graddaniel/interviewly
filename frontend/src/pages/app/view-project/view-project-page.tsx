import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, generatePath, useLoaderData, useNavigate, useParams, useRouteError, useSubmit } from 'react-router-dom';
import { AccountTypes, ProfileTypes, ProjectTypes } from 'shared';

import ProjectStepper from '../../../components/project-stepper/project-stepper';
import TextButton from '../../../components/text-button/text-button';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import GeneralStep from './general-step';
import MethodologyStep from './methodology-step';
import RespondentsStep from './respondents-step';
import { APP_FORMS_ROUTES } from '../../../consts/routes';
import DetailsStep from './details-step';
import AttachedSurveysStep from './attached-surveys-step';
import useAuth from '../../../hooks/useAuth';
import MethodologyTile from '../../../components/methodology-tile/methodology-tile';
import StepTitle from '../edit-project/step-title';
import SurveyBar from './survey-bar';
import MeetingBar from './meeting-bar';

import classes from './view-project-page.module.css';
import QuestionMarkIconBlack from 'images/question-mark-icon-black.svg';
import FoldersIconBlack from 'images/folders-icon-black.svg';
import FeatureChatIcon from 'images/feature-chat-icon.svg';
import SubmitButton from '../../../components/submit-button/submit-button';
import classNames from 'classnames';


const ViewProject = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const auth = useAuth();
    const submit = useSubmit();
    const { projectId } = useParams();
    const formRef = useRef(null);
    const loaderData = useLoaderData() as {
        project: any;
        respondent: any;
    };
    const {
        project,
        respondent,
    } = loaderData;

    const surveys = project.surveys || [];
    const { meeting } = respondent || {};

    const stepsNames = t('viewProject.steps', { returnObjects: true }) as string[];

    const stepsArray = stepsNames.map((name, i) => ({
        title: name,
        onClick: () => {
            setCurrentStep(i),
            submit(formRef.current, { method: "post" });
        }
    }));

    const editProject = () => navigate(generatePath(APP_FORMS_ROUTES.EDIT_PROJECT.PATH, { projectId }));

    const [ currentStep, setCurrentStep ] = useState(0);

    return auth.type === AccountTypes.Type.RECRUITER
        ? (
        <section className={classes.viewProject}>
            <header className={classes.header}>
                <h4 className={classes.title}>
                    <img src={QuestionMarkIconBlack} className={classes.headerIcon} />
                    {t('viewProject.title')}
                </h4>
                <Form ref={formRef}>
                    <input type="hidden" value="reset" name="type" />
                </Form>
                <ProjectStepper
                    className={classes.stepper}
                    steps={stepsArray}
                    currentStep={currentStep}
                    markCurrentStepOnly={true}
                />
                <div className={classNames(
                    classes.statusLabel,
                    classes[project.status]
                )}>
                    {t(`projectStatuses.${project.status}`)}
                </div>
                {project.status === ProjectTypes.Status.Draft && (
                    <TextButton
                        className={classes.actionButton}
                        text={t('viewProject.edit')}
                        onClick={editProject}
                    />
                )}
                {project.status === ProjectTypes.Status.AwaitingPayment
                && auth.currentUserHasRole([ProfileTypes.Role.InterviewlyStaff])
                && (
                    <Form className={classes.actionButton} method="post">
                        <SubmitButton
                            text={t('viewProject.markAsPaid')}
                        />
                        <input type="hidden" value="markAsPaid" name="type" />
                    </Form>
                )}
                <DropdownList
                    className={classes.dropdown}
                    name="viewStep"
                    elementsList={stepsArray.map(e => e.title)}
                    onChange={(i) => stepsArray[i].onClick()}
                    allowDeselect={false}
                    defaultIndex={currentStep}
                />
            </header>
            {project && (
                <div className={classes.content}>
                    {currentStep === 0 && (
                        <GeneralStep
                            title={project.title}
                            description={project.description}
                        />
                    )}
                    {currentStep === 1 && (
                        <MethodologyStep
                            methodology={project.methodology}
                        />
                    )}
                    {currentStep === 2 && (
                        <RespondentsStep
                            respondents={project.respondents}
                        />
                    )}
                    {currentStep === 3 && ( //TODO data loaded inside; do the same with all the steps
                        <AttachedSurveysStep />
                    )}
                    {currentStep === 4 && (
                        <DetailsStep
                            participantsCount={project.participantsCount}
                            reserveParticipantsCount={project.reserveParticipantsCount}
                            interviewDuration={project.meetingDuration}
                            startDate={new Date(project.startDate)}
                            endDate={new Date(project.endDate)}
                            transcriptionAvailable={true}
                            participantsPaymentValue={project.participantsPaymentValue}
                            participantsPaymentCurrency={project.participantsPaymentCurrency}
                        />
                    )}
                </div>
            )}
        </section>
    )
    : (
        <section className={classes.viewProjectRespondent}>
            <header className={classes.header}>
                <h4 className={classes.title}>
                    <img src={QuestionMarkIconBlack} className={classes.headerIcon} />
                    {t('viewProject.title')}
                </h4>
                <div className={classes.statusLabel}>{t(`projectStatuses.${project.status}`)}</div>
            </header>
            <MethodologyTile
                className={classes.methodologyTile}
                mini={true}
                selected={false}
                methodology={project.methodology}
            />
            <StepTitle
                icon={FeatureChatIcon}
                title={t('viewProject.respondentPage.interviewsSubtitle')}
            />
            <MeetingBar
                uuid={meeting.uuid}
                date={meeting.date}
                duration={meeting.duration}
            />
            <StepTitle
                icon={FoldersIconBlack}
                title={t('viewProject.respondentPage.surveysSubtitle')}
            />
            <div className={classes.surveys}>
                {surveys.map(survey => (
                    <SurveyBar
                        key={survey.uuid}
                        uuid={survey.uuid}
                        startDate={survey.startDate}
                        endDate={survey.endDate}
                        url={survey.url}
                        hasFinished={survey.hasFinished}
                    />
                ))}
            </div>
        </section>
    );
};

export default ViewProject;