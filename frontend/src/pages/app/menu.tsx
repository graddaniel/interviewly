import React from 'react';

import MenuButton from './menu-button';
import { APP_ROUTES } from '../../consts/routes';
import useAuth from '../../hooks/useAuth';

import classes from './menu.module.css'
import HomeIconBlack from '../../../images/home-icon-black.svg';
import HomeIconWhite from '../../../images/home-icon-white.svg';
import MetricsIconBlack from '../../../images/metrics-icon-black.svg';
import MetricsIconWhite from '../../../images/metrics-icon-white.svg';
import PeopleIconBlack from '../../../images/people-icon-black.svg';
import PeopleIconWhite from '../../../images/people-icon-white.svg';
import CalendarIconBlack from '../../../images/calendar-icon-black.svg';
import CalendarIconWhite from '../../../images/calendar-icon-white.svg';
import FoldersIconBlack from '../../../images/folders-icon-black.svg';
import FoldersIconWhite from '../../../images/folders-icon-white.svg';
import { AccountTypes, ProfileTypes } from 'shared';
import { useTranslation } from 'react-i18next';

const { Role } = ProfileTypes;

const Menu = () => {
    const auth = useAuth();
    const { t } = useTranslation();

    return (
        <section className={classes.menu}>
                    <MenuButton
                        path={APP_ROUTES.MY_ACCOUNT.PATH}
                        text={t('menu.home')}
                        icon={{
                            highlighted: HomeIconBlack,
                            regular: HomeIconWhite,
                        }}
                    />
                    {(auth.type === AccountTypes.Type.RESPONDENT
                     || auth.currentUserHasRole([
                        Role.Admin,
                        Role.InterviewlyStaff,
                        Role.Moderator,
                        Role.Observer,
                    ])) && (
                        <MenuButton
                            path={APP_ROUTES.PROJECTS.PATH}
                            text={t('menu.projects')}
                            icon={{
                                highlighted: MetricsIconBlack,
                                regular: MetricsIconWhite,
                            }}
                        />
                    )}
                    {auth.currentUserHasRole([
                        Role.Admin,
                        Role.InterviewlyStaff,
                    ]) && (
                        <MenuButton
                            path={APP_ROUTES.MY_TEAM.PATH}
                            text={t('menu.myTeam')}
                            icon={{
                                highlighted: PeopleIconBlack,
                                regular: PeopleIconWhite,
                            }}
                        />
                    )}
                    <MenuButton
                        path={APP_ROUTES.CALENDAR.PATH}
                        text={t('menu.calendar')}
                        icon={{
                            highlighted: CalendarIconBlack,
                            regular: CalendarIconWhite,
                        }}
                    />
                    {auth.currentUserHasRole([
                        Role.Admin,
                        Role.Moderator,
                        Role.InterviewlyStaff,
                    ]) && (
                        <MenuButton
                            path={APP_ROUTES.LIBRARY.PATH}
                            text={t('menu.library')}
                            icon={{
                                highlighted: FoldersIconBlack,
                                regular: FoldersIconWhite,
                            }}
                        />
                    )}
                </section>
    );
}

export default Menu;