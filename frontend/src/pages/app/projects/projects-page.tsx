import React, { useState } from 'react';
import classNames from 'classnames';

import ProjectTile from './project-tile';
import SearchInput from '../../../components/search-input/search-input';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import capitalizeFirstLetter from '../../../utils/capitalize-first-letter';

import classes from './projects-page.module.css';
import MetricsIconBlack from '~/images/metrics-icon-black.svg';


const PROJECTS: any[] = [];
for (let i = 0; i < 6; i +=1) {
    PROJECTS.push({
        avatarUrl: 'https://i.pravatar.cc/101',
        title: 'Interviewly  usability tests',
        type: 'Product tests',
        startDate: Date.now(),
        endDate: Date.now(),
        status: 'finished',
    });
};

const STATUSES = ['pending', 'canceled', 'finished'];

const ProjectsPage = () => {
    const [ status, setStatus ] = useState<any>();

    return (
        <section className={classes.projects}>
            <div className={classes.header}>
                <div className={classes.labels}>
                    <img className={classes.headerIcon} src={MetricsIconBlack}/>
                    <h4 className={classes.title}>Projects</h4>
                    <span className={classes.projectsCountLabel}>{PROJECTS.length} projects</span>
                </div>
                <div className={classes.search}>
                    <SearchInput />
                    <DropdownList
                        elementsList={STATUSES.map(status => (
                            <Pill
                                className={classes[status]}
                                text={status}
                            />
                        ))}
                        onChange={(i: number) => setStatus(STATUSES[i])}
                    />
                </div>
            </div>
            <div className={classes.content}>
                {PROJECTS.map((p, i) => (
                    <ProjectTile
                        key={i}
                        {...p}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectsPage;

const Pill = ({
    className,
    text,
}) => {
    return (
        <div className={classNames(classes.pill, className)}>
            {capitalizeFirstLetter(text)}
        </div>
    );
}