import React from 'react';
import { ProfileTypes } from 'shared';
import { useLoaderData, useNavigate } from 'react-router-dom';

import IconButton from '../../../components/icon-button/icon-button';
import genderToIcon from '../../../utils/gender-to-icon';
import nationalityToFlagIcon from '../../../utils/nationality-to-flag-icon';
import SurveyTile from '../../../components/survey-tile/survey-tile';
import RespondentVideoTile from '../../../components/respondent-video-tile/respondent-video-tile';
import InterviewTile from '../my-account/interview-tile';

import classes from './project-respondent-page.module.css';
import ArrowLeftIconPurple from 'images/arrow-left-icon-purple.svg';
import CalendarIconBlack from 'images/calendar-icon-black.svg';
import MetricsIconBlack from 'images/metrics-icon-black.svg';
import { useTranslation } from 'react-i18next';


type Respondent = {
    avatarUrl: string;
    name: string;
    surname: string;
    gender: ProfileTypes.Gender;
    nationality: ProfileTypes.Nationality,
    email: string;
    age: number;
};

const upcomingInterview = {
    duration: '30min',
    date: Date.now(),
};

const surveys = [{
    name: 'Interviewly survey 1',
    status: 'pending'
}, {
    name: 'Interviewly survey 2',
    status: 'pending'
}, {
    name: 'Interviewly survey 3',
    status: 'finished'
}, {
    name: 'Interviewly survey 4',
    status: 'finished'
}, {
    name: 'Interviewly survey 5',
    status: 'finished'
}];

const ProjectRespondentPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const respondent = useLoaderData() as Respondent;

    const {
        avatarUrl,
        name,
        surname,
        gender,
        nationality,
        email,
        age,
    } = respondent;

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
                    <div className={classes.sectionHeaderTitle}>
                        <img className={classes.sectionHeaderIcon} src={CalendarIconBlack} />
                        {t('viewProject.respondents.upcomingInterviewsSubtitle')}
                    </div>
                    <InterviewTile
                        duration={upcomingInterview.duration}
                        date={upcomingInterview.date}
                    />
                </div>
                <span className={classes.sectionHeaderTitle}>
                    <img className={classes.sectionHeaderIcon} src={MetricsIconBlack} />
                    {t('viewProject.respondents.respondentSurveysSubtitle')}
                </span>
                <div className={classes.surveysList}>
                    {surveys.map(survey => (
                        <SurveyTile
                            key={survey.name}
                            name={survey.name}
                            status={survey.status}
                            onClick={() => console.log("TODO display survey")}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectRespondentPage;