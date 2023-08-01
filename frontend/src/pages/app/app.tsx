import React, { useCallback, useRef, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Form, Outlet, matchPath, useLocation, useSubmit } from 'react-router-dom';

import Logo from '../../components/logo/logo';
import IconButton from '../../components/icon-button/icon-button';
import TextButton from '../../components/text-button/text-button';
import Menu from './menu';
import MenuDropdown from './menu-dropdown';

import classes from './app.module.css';
import BellIconBlack from '../../../images/bell-icon-black.svg';
import { APP_FORMS_ROUTES } from '../../consts/routes';

const USER = {
    name: 'Mateusz',
    avatarUrl: 'https://i.pravatar.cc/99',
};

const App = () => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const { i18n } = useTranslation();
    const location = useLocation();
    const { resolvedLanguage } = i18n;
    const formRef = useRef(null);
    const submit = useSubmit();

    const openDropdown = useCallback(() => setIsMenuOpen(true), []);
    const closeDropdown = useCallback(() => setIsMenuOpen(false), []);
    const handleDropdownBlur = useCallback((event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsMenuOpen(false);
        }
    }, []);

    const formattedDate = moment(Date.now())
        .locale(resolvedLanguage as string)
        .format('dddd, LL');

    const matchingFormRoutes = Object
        .values(APP_FORMS_ROUTES)
        .filter(route => matchPath(route.PATH, location.pathname));
    if (matchingFormRoutes.length > 0) {   
        return <Outlet />;
    }

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
                            className={classes.dropdown}
                            onClick={openDropdown}
                            onBlur={handleDropdownBlur}
                            tabIndex={-1}
                        >
                            <div
                                className={classes.userButton}
                            >
                                <span className={classes.userName}>{USER.name}</span>
                                <img className={classes.avatar} src={USER.avatarUrl} />
                            </div>
                            <MenuDropdown
                                isOpen={isMenuOpen}
                                onClose={closeDropdown}
                                avatarUrl={USER.avatarUrl}
                                username={USER.name}
                            />
                        </nav>
                    </div>
                </header>
                <nav className={classes.navigation}>
                    <Menu />
                    <Form method="post" ref={formRef}>
                        <TextButton
                            className={classes.createProjectButton}
                            text={'Create Project'}
                            onClick={() => submit(formRef.current)}
                        />
                    </Form>
                </nav>
                <main className={classes.main}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default App;