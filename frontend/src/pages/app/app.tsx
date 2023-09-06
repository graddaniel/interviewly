import React, { useCallback, useRef, useState } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Form, Outlet, matchPath, useLoaderData, useLocation, useRouteError, useSubmit } from 'react-router-dom';
import classNames from 'classnames';
import { AccountTypes, ProfileTypes } from 'shared';

import Logo from '../../components/logo/logo';
import IconButton from '../../components/icon-button/icon-button';
import TextButton from '../../components/text-button/text-button';
import Menu from './menu';
import MenuDropdown from './menu-dropdown';
import useAuth from '../../hooks/useAuth';
import { APP_FORMS_ROUTES } from '../../consts/routes';

import classes from './app.module.css';
import BellIconBlack from '../../../images/bell-icon-black.svg';
import useErrorHandler from '../../hooks/use-error-handler';
import useLoaderDataWithSnackbar from '../../hooks/use-loader-data-with-snackbar';


const App = () => {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const { i18n, t } = useTranslation();
    const location = useLocation();
    const { resolvedLanguage } = i18n;
    const formRef = useRef(null);
    const submit = useSubmit();
    const auth = useAuth();
    const profile = useLoaderDataWithSnackbar() as any;
    useErrorHandler(useRouteError());

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
        <div className={classNames(
            classes.backgroundWrapper,
            auth.type === AccountTypes.Type.RECRUITER
                ? classes.pink
                : classes.blue
    )}>
        <div className={classNames(
            classes.paddingWrapper,
            auth.type === AccountTypes.Type.RECRUITER
                ? classes.pink
                : classes.blue
        )}>
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
                        {profile && (
                            <nav
                                className={classes.dropdown}
                                onClick={openDropdown}
                                onBlur={handleDropdownBlur}
                                tabIndex={-1}
                            >
                                <div
                                    className={classes.userButton}
                                >
                                    <span className={classes.userName}>{profile.name}</span>
                                    <img className={classes.avatar} src={profile.avatarUrl} />
                                </div>
                                <MenuDropdown
                                    isOpen={isMenuOpen}
                                    onClose={closeDropdown}
                                    avatarUrl={profile.avatarUrl}
                                    username={profile.name}
                                />
                            </nav>
                        )}
                    </div>
                </header>
                <nav className={classes.navigation}>
                    <Menu />
                    {auth.currentUserHasRole([
                        ProfileTypes.Role.Admin,
                        ProfileTypes.Role.InterviewlyStaff,
                    ]) && (
                        <Form method="post" ref={formRef}>
                            <TextButton
                                className={classes.createProjectButton}
                                text={t('menu.createProject')}
                                onClick={() => submit(formRef.current)}
                            />
                        </Form>
                    )}
                </nav>
                <main className={classes.main}>
                    <Outlet />
                </main>
            </div>
        </div>
        </div>
    );
};

export default App;