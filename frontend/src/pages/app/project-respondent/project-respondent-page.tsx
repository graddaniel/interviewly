import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ProfileTypes } from 'shared';
import { Form, generatePath, useActionData, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import IconButton from '../../../components/icon-button/icon-button';
import genderToIcon from '../../../utils/gender-to-icon';
import nationalityToFlagIcon from '../../../utils/nationality-to-flag-icon';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import RespondentVideoTile from '../../../components/respondent-video-tile/respondent-video-tile';
import InterviewTile from '../my-account/interview-tile';
import { APP_ROUTES } from '../../../consts/routes';

import classes from './project-respondent-page.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import CalendarIconBlack from 'images/calendar-icon-black.svg';
import MetricsIconBlack from 'images/metrics-icon-black.svg';
import classNames from 'classnames';
import moment from 'moment';
import SubmitButton from '../../../components/submit-button/submit-button';
import useSuccessFeedback from '../../../hooks/use-success-feedback';
import TimeInput from '../../../components/time-input/time-input';


type Survey = {
    uuid: string;
    name: string;
    hasFinished: boolean;
};

type Meeting = {
    uuid: string;
    date: Date;
    duration: string;
};

type Respondent = {
    avatarUrl: string;
    name: string;
    surname: string;
    gender: ProfileTypes.Gender;
    nationality: ProfileTypes.Nationality,
    email: string;
    age: number;
    surveys: Survey[];
    meeting: Meeting;
};

const ProjectRespondentPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const respondent = useLoaderData() as Respondent;
    const actionData = useActionData() as any;
    useSuccessFeedback(actionData, t('viewProject.respondents.scheduledSuccessMessage'));
    const { i18n } = useTranslation();

    const [ meetingDateAndTime, setMeetingDateAndTime ] = useState<Date>(new Date());
    const [ meetingDate, setMeetingtDate] = useState(Date.now());
    const [ meetingTime, setMeetingTime ] = useState('');

    useEffect(() => {
        const [hoursString, minutesString] = meetingTime.split(":");

        setMeetingDateAndTime(
            moment(meetingDate)
                .hour(parseInt(hoursString, 10))
                .minute(parseInt(minutesString, 10))
                .toDate()
        );
    }, [meetingDate, meetingTime]);
    
    const { resolvedLanguage } = i18n;

    const {
        projectId,
        respondentId,
    } = params;

    const {
        name,
        surname,
        gender,
        avatarUrl,
        email,
        nationality,
        age,
        surveys,
        meeting,
    } = respondent;

    const errors = actionData?.errors || {};

    return (
        <section className={classes.projectRespondent}>
            <IconButton
                className={classes.backButton}
                onClick={() => navigate(-1)}
                icon={ArrowLeftIconPurple}
            />
            <header className={classes.header}>
                <img className={classes.avatar} src={avatarUrl} />
                <h4 className={classes.name}>{name} {surname}</h4>
                <span className={classes.email}>{email}</span>
                <div className={classes.genderAndAge}>
                    <img className={classes.gender} src={genderToIcon(gender)} />
                    {age}
                </div>
                <img className={classes.flagIcon} src={nationalityToFlagIcon(nationality)} />
            </header>
            <div className={classes.content}>
                <RespondentVideoTile
                    className={classes.videoTile}
                    coverUrl="https://picsum.photos/600/400"
                />
                <div className={classes.upcomingInterview}>
                    <div className={classNames(classes.sectionHeaderTitle)}>
                        <img className={classes.sectionHeaderIcon} src={CalendarIconBlack} />
                        {t('viewProject.respondents.upcomingInterviewsSubtitle')}
                    </div>
                    {meeting && (
                        <InterviewTile
                            duration={meeting.duration}
                            date={meeting.date}
                        />
                    )}
                </div>
                <span className={classNames(classes.sectionHeaderTitle, classes.schedulerTitle)}>
                    <img className={classes.sectionHeaderIcon} src={CalendarIconBlack} />
                    {t('viewProject.respondents.meetingSchedulerSubtitle')}
                </span>
                <Form className={classes.meetingScheduler} method="post">
                    <div className={classes.dateWrappers}>
                        <DatePicker
                            className={classNames(
                                classes.datePickerInput,
                                errors.meetingDate && classes.error,
                            )}
                            wrapperClassName={classes.withMargin}
                            selected={meetingDate}
                            onChange={(date) => setMeetingtDate(date)}
                            locale={resolvedLanguage}
                            dateFormat="dd.MM.yyyy"
                        />
                        <TimeInput
                            className={classNames(
                                classes.timeInput,
                                classes.withMargin,
                            )}
                            name="startTime"
                            defaultValue={meetingTime}
                            onChange={setMeetingTime}
                            error={!!errors.meetingDate}
                        />
                        <span className={classes.errorText}>{errors.meetingDate}</span>
                    </div>
                    <SubmitButton
                        className={classes.scheduleButton}
                        text={t('viewProject.respondents.scheduleButtonText')}
                    />
                    <input
                        type="hidden"
                        value={meetingDateAndTime.getTime()}
                        name="meetingDateAndTime"
                    />
                </Form>
                <div className={classNames(classes.sectionHeaderTitle, classes.surveysTitle)}>
                    <img className={classes.sectionHeaderIcon} src={MetricsIconBlack} />
                    {t('viewProject.respondents.respondentSurveysSubtitle')}
                </div>
                <div className={classes.surveysList}>
                    {surveys.map(survey => (
                        <SurveyTile
                            key={survey.name}
                            name={survey.name}
                            status={survey.hasFinished ? 'filled' : 'pending'}
                            onClick={() => navigate(generatePath(
                                APP_ROUTES.PROJECT_RESPONDENT_SURVEY_RESPONSES.PATH,
                                {
                                    projectId,
                                    respondentId,
                                    surveyId: survey.uuid,
                                }
                            ))}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectRespondentPage;