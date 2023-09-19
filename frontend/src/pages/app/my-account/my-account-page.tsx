import React from 'react';

import InterviewTile from './interview-tile';
import ProjectBar from './project-bar';

import classes from './my-account-page.module.css';
import PeopleIconBlack from 'images/people-icon-black.svg';
import CalendarIconBlack from 'images/calendar-icon-black.svg';
import MetricsIconBlack from 'images/metrics-icon-black.svg';
import { AccountTypes } from 'shared';
import TeamMemberTile from '../../../components/team-member-tile/team-member-tile';
import useAuth from '../../../hooks/useAuth';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../consts/routes';
import { useLoaderHandler } from '../../../hooks/use-handlers';


const MyAccountPage = () => {
    const auth = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const loaderData = useLoaderHandler();

    if (!loaderData) {
        return null;
    }

    const {
        upcomingMeeting,
        profile,
        teamMembers,
        projects,
    } = loaderData;
    
    console.log(loaderData)
    const latestTeamMembersSection = (
        <div className={classes.latestTeamMembers}>
            <div className={classes.header}>
                <img className={classes.headerIcon} src={PeopleIconBlack} />
                {t('myAccount.latestTeamMembersLabel')}
            </div>
            <div className={classes.latestTeamMembersTiles}>
                {teamMembers && teamMembers.map(member => (
                    <TeamMemberTile
                        small={true}
                        key={member.email}
                        {...member}
                        onEdit={() => navigate(APP_ROUTES.MY_TEAM.PATH)}
                    />
                ))}
            </div>
        </div>
    );

    const upcomingInterviewsSection = (
        <div className={classes.upcomingInterview}>
            <div className={classes.header}>
                <img className={classes.headerIcon} src={CalendarIconBlack} />
                {t('myAccount.upcomingInterviewsLabel')}
            </div>
            <InterviewTile
                uuid={upcomingMeeting.uuid}
                duration={upcomingMeeting.duration}
                date={upcomingMeeting.date}
            />
        </div>
    );

    const projectsSection = (
        projects ? (
            <div className={classes.projects}>
                <div className={classes.header}>
                    <img className={classes.headerIcon} src={MetricsIconBlack} />
                    {t('myAccount.projectsLabel')}
                </div>
                <div className={classes.projectsContent}>
                    {projects.map(project => (
                        <ProjectBar
                            key={project.uuid}
                            {...project}
                        />
                    ))}
                </div>
            </div>
        ) : null
    );

    return (
        <section className={classNames(
            classes.myAccount,
            auth.type === AccountTypes.Type.RESPONDENT && classes.myRespondentAccount,
        )}>
            <h4 className={classes.welcomeMessage}>
                {t('myAccount.greeting')} {profile.name}!
            </h4>
            <div className={classes.details}>
                <span className={classes.userText}>
                    {profile.name} {profile.surname}
                </span>
                <span className={classes.companyText}>
                    {profile.companyName}
                </span>
            </div>
            {auth.type === AccountTypes.Type.RECRUITER && latestTeamMembersSection}
            {upcomingInterviewsSection}
            {projectsSection}
        </section>
    );
};

export default MyAccountPage;