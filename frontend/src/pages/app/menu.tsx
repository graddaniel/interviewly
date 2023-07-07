import React from 'react';

import MenuButton from './menu-button';
import { APP_ROUTES } from '../../consts/routes';

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


const Menu = () => {
    return (
        <section className={classes.menu}>
                    <MenuButton
                        path={APP_ROUTES.MY_ACCOUNT.PATH}
                        text={'Home'}
                        icon={{
                            highlighted: HomeIconBlack,
                            regular: HomeIconWhite,
                        }}
                    />
                    <MenuButton
                        path={APP_ROUTES.PROJECTS.PATH}
                        text={'Projects'}
                        icon={{
                            highlighted: MetricsIconBlack,
                            regular: MetricsIconWhite,
                        }}
                    />
                    <MenuButton
                        path={APP_ROUTES.MY_TEAM.PATH}
                        text={'My Team'}
                        icon={{
                            highlighted: PeopleIconBlack,
                            regular: PeopleIconWhite,
                        }}
                    />
                    <MenuButton
                        path={APP_ROUTES.CALENDAR.PATH}
                        text={'Calendar'}
                        icon={{
                            highlighted: CalendarIconBlack,
                            regular: CalendarIconWhite,
                        }}
                    />
                    <MenuButton
                        path={APP_ROUTES.LIBRARY.PATH}
                        text={'Library'}
                        icon={{
                            highlighted: FoldersIconBlack,
                            regular: FoldersIconWhite,
                        }}
                    />
                </section>
    );
}

export default Menu;