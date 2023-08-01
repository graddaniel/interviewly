import React from 'react';

import InterviewTile from './interview-tile';
import ProjectBar from './project-bar';

import classes from './my-account-page.module.css';
import PeopleIconBlack from 'images/people-icon-black.svg';
import CalendarIconBlack from 'images/calendar-icon-black.svg';
import MetricsIconBlack from 'images/metrics-icon-black.svg';
import { AccountTypes } from 'shared';
import TeamMemberTile from '../../../components/team-member-tile/team-member-tile';


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
    duration: '30min',
    date: Date.now(),
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
    const latestTeamMembersSection = (
        <div className={classes.latestTeamMembers}>
            <div className={classes.header}>
                <img className={classes.headerIcon} src={PeopleIconBlack} />
                Latest team members
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
                Upcoming interviews
            </div>
            <InterviewTile
                duration={upcomingInterview.duration}
                date={upcomingInterview.date}
            />
        </div>
    );

    const projectsSection = (
        <div className={classes.projects}>
            <div className={classes.header}>
                <img className={classes.headerIcon} src={MetricsIconBlack} />
                Projects
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
        <section className={classes.myAccount}>
            <h4 className={classes.welcomeMessage}>
                Hi, {user.name}!
            </h4>
            <div className={classes.details}>
                <span className={classes.userText}>
                    {user.name} {user.surname}
                </span>
                <span className={classes.companyText}>
                    {user.company}
                </span>
            </div>
            {latestTeamMembersSection}
            {upcomingInterviewsSection}
            {projectsSection}
        </section>
    );
};

export default MyAccountPage;