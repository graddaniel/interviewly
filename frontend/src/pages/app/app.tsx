import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import IconButton from '../../components/icon-button/icon-button';
import TextButton from '../../components/text-button/text-button';
import Menu from './menu';
import MenuDropdown from './menu-dropdown';

import classes from './app.module.css';
import BellIconBlack from '../../../images/bell-icon-black.svg';

const USER = {
    name: 'Mateusz',
    avatarUrl: 'https://i.pravatar.cc/99',
};

const App = () => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const { i18n } = useTranslation();
    const { resolvedLanguage } = i18n;

    const toggleDropdown = useCallback(() => setIsMenuOpen(state => !state), []);
    const closeDropdown = useCallback(() => setIsMenuOpen(false), []);

    const formattedDate = moment(Date.now())
        .locale(resolvedLanguage as string)
        .format('dddd, LL');

    return (
        <div className={classes.paddingWrapper}>
            <div className={classes.app}>
                <header className={classes.header}>
                    <Logo className={classes.logo} />
                    <div className={classes.date}>{formattedDate}</div>
                    <div className={classes.buttons}>
                        <IconButton
                            className={classes.notificationsButton}
                            onClick={() => console.log("notifications clicked")}
                            icon={BellIconBlack}
                        />
                        <nav
                            className={classes.userButton}
                            onClick={toggleDropdown}
                            tabIndex={1}
                            onBlur={closeDropdown}
                        >
                            <span className={classes.userName}>{USER.name}</span>
                            <img className={classes.avatar} src={USER.avatarUrl} />
                            <MenuDropdown
                                isOpen={isMenuOpen}
                            />
                        </nav>
                    </div>
                </header>
                <nav className={classes.navigation}>
                    <Menu />
                    <TextButton
                        className={classes.createProjectButton}
                        text={'Create Project'}
                        onClick={() => console.log('TODO create project')}
                    />
                </nav>
                <main className={classes.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default App;