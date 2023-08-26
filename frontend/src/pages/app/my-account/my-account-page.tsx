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


const user = {
    name: 'Mateusz',
    surname: 'Kowalski',
    company: 'Samsung Electronics Co., Ltd.',
};

const teamMembers = [{
    name: 'Ewelina',
    surname: 'Izbicka',
    email: 'asd@asd.pl',
    status: AccountTypes.Status.ACTIVE,
}, {
    avatarUrl: 'https://i.pravatar.cc/100',
    name: 'Karol',
    surname: 'Walewski',
    email: 'dsad@32.pl',
    status: AccountTypes.Status.UNCONFIRMED,
}];

const upcomingInterview = {
    uuid: '1234',
    duration: '30min',
    date: new Date(),
};

const projects = [{
    avatarUrl: 'https://i.pravatar.cc/101',
    title: 'Interviewly  usability tests',
    type: 'Product tests',
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'finished'
}, {
    avatarUrl: 'https://i.pravatar.cc/101',
    title: 'Focus groups tests',
    type: 'Focus Groups',
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'canceled'
}, {
    avatarUrl: 'https://i.pravatar.cc/101',
    title: 'User experience woda.pl',
    type: 'UX Interviews',
    startDate: Date.now(),
    endDate: Date.now(),
    status: 'in_progress'
}];

const MyAccountPage = () => {
    const auth = useAuth();
    const { t } = useTranslation();

    const latestTeamMembersSection = (
        <div className={classes.latestTeamMembers}>
            <div className={classes.header}>
                <img className={classes.headerIcon} src={PeopleIconBlack} />
                {t('myAccount.latestTeamMembersLabel')}
            </div>
            <div className={classes.latestTeamMembersTiles}>
                {teamMembers.map(member => (
                    <TeamMemberTile
                        small={true}
                        key={member.email}
                        {...member}
                        onEdit={() => console.log(`Editing ${member.name} ${member.surname}`)}
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
                uuid={upcomingInterview.uuid}
                duration={upcomingInterview.duration}
                date={upcomingInterview.date}
            />
        </div>
    );

    const projectsSection = (
        <div className={classes.projects}>
            <div className={classes.header}>
                <img className={classes.headerIcon} src={MetricsIconBlack} />
                {t('myAccount.projectsLabel')}
            </div>
            <div className={classes.projectsContent}>
                {projects.map(project => (
                    <ProjectBar
                        key={project.title}
                        {...project}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <section className={classNames(
            classes.myAccount,
            auth.type === AccountTypes.Type.RESPONDENT && classes.myRespondentAccount,
        )}>
            <h4 className={classes.welcomeMessage}>
                {t('myAccount.greeting')} {user.name}!
            </h4>
            <div className={classes.details}>
                <span className={classes.userText}>
                    {user.name} {user.surname}
                </span>
                <span className={classes.companyText}>
                    {user.company}
                </span>
            </div>
            {auth.type === AccountTypes.Type.RECRUITER && latestTeamMembersSection}
            {upcomingInterviewsSection}
            {projectsSection}
        </section>
    );
};

export default MyAccountPage;