import React, { useState } from 'react';

import ProjectTile from './project-tile';
import SearchInput from '../../../components/search-input/search-input';
import DropdownList from '../../../components/dropdown-list/dropdown-list';
import Pill from '../../../components/pill/pill';

import classes from './projects-page.module.css';
import MetricsIconBlack from 'images/metrics-icon-black.svg';
import { useTranslation } from 'react-i18next';
import { ProjectTypes } from 'shared';
import { useLoaderHandler } from '../../../hooks/use-handlers';


const STATUSES = [...Object.values(ProjectTypes.Status)];

const ProjectsPage = () => {
    const { t } = useTranslation();
    const { projects } = useLoaderHandler();

    const [ status, setStatus ] = useState<any>();

    if (!projects) {
        return null;
    }

    return (
        <section className={classes.projects}>
            <div className={classes.header}>
                <div className={classes.labels}>
                    <img className={classes.headerIcon} src={MetricsIconBlack}/>
                    <h4 className={classes.title}>{t('projects.title')}</h4>
                    <span className={classes.projectsCountLabel}>{projects.length} {t('projects.projectsCounterText')}</span>
                </div>
                <div className={classes.search}>
                    <SearchInput
                        text={t('projects.searchInputPlaceholder')}
                    />
                    <DropdownList
                        name={t('projects.statusLabel')}
                        elementsList={STATUSES.map(status => (
                            <Pill
                                className={classes[status]}
                                text={t(`projectStatuses.${status}`)}
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