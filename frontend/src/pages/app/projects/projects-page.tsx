import React, { useState } from 'react';
import { useLoaderData, useRouteError } from 'react-router-dom';

import ProjectTile from './project-tile';
import SearchInput from '../../../components/search-input/search-input';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import Pill from '../../../components/pill/pill';
import useErrorHandler from '../../../hooks/use-error-handler';

import classes from './projects-page.module.css';
import MetricsIconBlack from 'images/metrics-icon-black.svg';



const STATUSES = ['pending', 'canceled', 'finished'];

const ProjectsPage = () => {
    const projects = useLoaderData() as any[] || [];
    useErrorHandler(useRouteError());

    const [ status, setStatus ] = useState<any>();

    return (
        <section className={classes.projects}>
            <div className={classes.header}>
                <div className={classes.labels}>
                    <img className={classes.headerIcon} src={MetricsIconBlack}/>
                    <h4 className={classes.title}>Projects</h4>
                    <span className={classes.projectsCountLabel}>{projects.length} projects</span>
                </div>
                <div className={classes.search}>
                    <SearchInput />
                    <DropdownList
                        name="Status"
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
                {projects.map(p => (
                    <ProjectTile
                        avatarUrl="https://i.pravatar.cc/101"
                        key={p.uuid}
                        startDate={Date.now()}
                        endDate={Date.now()}
                        status={'finished'}
                        {...p}
                    />
                ))}
            </div>
        </section>
    );
};

export default ProjectsPage;