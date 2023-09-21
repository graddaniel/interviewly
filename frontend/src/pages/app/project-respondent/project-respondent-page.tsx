import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ProfileTypes } from 'shared';
import { Form, generatePath, useNavigate, useParams } from 'react-router-dom';
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
import TimeInput from '../../../components/time-input/time-input';
import TextInput from '../../../components/text-input/text-input';
import Checkbox from '../../../components/checkbox/checkbox';
import NumericalInput from '../../../components/numerical-input/numerical-input';
import PeopleIconBlack from 'images/people-icon-black.svg';
import FilledSurveyIconBlack from 'images/filled-survey-icon-black.svg';
import AIIconBlack from 'images/feature-ai-icon.svg';
import VideoDialog from '../../../components/video-dialog/video-dialog';
import { useActionHandler, useLoaderHandler } from '../../../hooks/use-handlers';


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
    cvUrl: string;
    otherFilesUrl: string;
    score: number;
    name: string;
    surname: string;
    gender: ProfileTypes.Gender;
    nationality: ProfileTypes.Nationality,
    email: string;
    age: number;
    surveys: Survey[];
    meeting: Meeting;
    phoneNumber: string;
    profession: string;
    province: string;
    specialization: string;
    city: string;
    martialStatus: ProfileTypes.MartialStatus;
    zipCode: string;
    hasChildren: boolean;
    street: string;
    childrenCount: number;
    interviewVideoUrl: string;
};

const ProjectRespondentPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const { i18n } = useTranslation();

    const { data } = useLoaderHandler();
    const actionData = useActionHandler(t('viewProject.respondents.scheduledSuccessMessage'));

    const [ meetingDateAndTime, setMeetingDateAndTime ] = useState<Date>(new Date());
    const [ meetingDate, setMeetingtDate] = useState(Date.now());
    const [ meetingTime, setMeetingTime ] = useState('');
    const [ interviewVideoOpen, setInterviewVideoOpen ] = useState(false);

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

    if (!data) {
        return null;
    }

    const {
        name,
        surname,
        gender,
        avatarUrl,
        cvUrl,
        otherFilesUrl,
        score,
        email,
        nationality,
        age,
        surveys,
        meeting,
        phoneNumber,
        profession,
        province,
        specialization,
        city,
        martialStatus,
        zipCode,
        hasChildren,
        street,
        childrenCount,
        interviewVideoUrl,
    } = data.respondent as Respondent;

    const errors = actionData?.errors ?? {};

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
                <span className={classNames(classes.sectionHeaderTitle, classes.personalDataTitle)}>
                    <img className={classes.sectionHeaderIcon} src={PeopleIconBlack} />
                    {t('viewProject.respondents.personalDataSubtitle')}
                </span>
                <div className={classes.personalData}>
                    <TextInput
                        className={classes.input}
                        name="phoneNumber"
                        placeholder={t('personalData.phoneNumber')}
                        defaultValue={phoneNumber}
                    />
                    <TextInput
                        className={classes.input}
                        name="martialStatus"
                        placeholder={t('personalData.martialStatus')}
                        defaultValue={martialStatus}
                    />
                    <TextInput
                        className={classes.input}
                        name="profession"
                        placeholder={t('personalData.profession')}
                        defaultValue={profession}
                    />
                    <TextInput
                        className={classes.input}
                        name="specialization"
                        placeholder={t('personalData.specialization')}
                        defaultValue={specialization}
                    />
                    <TextInput
                        className={classes.input}
                        name="street"
                        placeholder={t('personalData.street')}
                        defaultValue={street}
                    />
                    <TextInput
                        className={classes.input}
                        name="province"
                        placeholder={t('personalData.province')}
                        defaultValue={province}
                    />
                    <TextInput
                        className={classes.input}
                        name="zipCode"
                        placeholder={t('personalData.zipCode')}
                        defaultValue={zipCode}
                    />
                    <TextInput
                        className={classes.input}
                        name="city"
                        placeholder={t('personalData.city')}
                        defaultValue={city}
                    />
                    <NumericalInput
                        className={classes.input}
                        name="childrenCount"
                        label={t('personalData.childrenCount')}
                        defaultValue={childrenCount}
                        immutable={true}
                    />
                    <Checkbox
                        className={classes.checkbox}
                        name="hasChildren"
                        label={t('personalData.hasChildren')}
                        defaultValue={hasChildren}
                        disabled={true}
                    />
                </div>
                {interviewVideoUrl && (
                    <RespondentVideoTile
                        className={classes.videoTile}
                        coverUrl=""
                        onClick={() => setInterviewVideoOpen(true)}
                    />
                )}
                <div className={classes.extraInfoTile}>
                    {cvUrl && (
                        <>
                            <div className={classNames(classes.sectionHeaderTitle)}>
                                <img className={classes.sectionHeaderIcon} src={FilledSurveyIconBlack} />
                                {t('viewProject.respondents.cvSubtitle')}
                            </div>
                            <a className={classes.link} href={cvUrl} target='_blank'>
                                {t('viewProject.respondents.openCVLabel')}
                            </a>
                        </>
                    )}
                    {otherFilesUrl && (
                        <>
                            <div className={classNames(classes.sectionHeaderTitle)}>
                                <img className={classes.sectionHeaderIcon} src={FilledSurveyIconBlack} />
                                {t('viewProject.respondents.otherFilesSubtitle')}
                            </div>
                            <a className={classes.link} href={otherFilesUrl} target='_blank'>
                                {t('viewProject.respondents.openOtherFilesLabel')}
                            </a>
                        </>
                    )}
                    {score && (
                        <>
                            <div className={classNames(classes.sectionHeaderTitle)}>
                                <img className={classes.sectionHeaderIcon} src={AIIconBlack} />
                                {t('viewProject.respondents.aiScoreSubtitle')}
                            </div>
                            <span>
                                {score}%
                            </span>
                        </>
                    )}
                </div>
                <div className={classes.upcomingInterview}>
                    <div className={classNames(classes.sectionHeaderTitle)}>
                        <img className={classes.sectionHeaderIcon} src={CalendarIconBlack} />
                        {t('viewProject.respondents.upcomingInterviewsSubtitle')}
                    </div>
                    {meeting && (
                        <InterviewTile
                            uuid={meeting.uuid}
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
            {!!interviewVideoOpen && (
                <VideoDialog
                    onClose={() => setInterviewVideoOpen(false)}
                    videoUrl={interviewVideoUrl}
                />
            )}
        </section>
    );
};

export default ProjectRespondentPage;