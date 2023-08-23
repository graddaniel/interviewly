import React from 'react';
import { ProfileTypes } from 'shared';
import { generatePath, useLoaderData, useNavigate, useParams } from 'react-router-dom';

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
import { APP_ROUTES } from '../../../consts/routes';


type Survey = {
    uuid: string;
    name: string;
    hasFinished: boolean;
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
};

const upcomingInterview = {
    duration: '30min',
    date: Date.now(),
};

const ProjectRespondentPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const params = useParams();
    const respondent = useLoaderData() as Respondent;

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