import React, { useCallback } from 'react';
import { useHref, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import ROUTES, { APP_ROUTES } from '../../consts/routes';

import classes from './menu-dropdown.module.css';
import classNames from 'classnames';


const MenuDropdown = ({
    isOpen,
    avatarUrl,
    username,
}) => {
    const auth = useAuth();
    const navigate = useNavigate();
    const myAccountLink = useHref(APP_ROUTES.MY_ACCOUNT.PATH);

    const logout = useCallback(() => {
        auth.clearSession();
        navigate(ROUTES.HOME.PATH);
    }, []);

    // TODO add correct links
    const menuItems = [{
        text: 'Open user panel',
        route: APP_ROUTES.MY_ACCOUNT.PATH,
    }, {
        text: 'Personal data',
        route: APP_ROUTES.PERSONAL_DATA.PATH,
    }, {
        text: 'Company data',
        route: APP_ROUTES.COMPANY_DATA.PATH,
    }, {
        text: 'My team',
        route: APP_ROUTES.MY_TEAM.PATH,
    }];

    return (
        <ul 
            className={classNames(classes.dropdownMenu, !isOpen ? classes.hidden : '')}
        >
            <li className={classes.user}>
                <span>{username}</span>
                <img className={classes.avatar} src={avatarUrl} />
            </li>
            {menuItems.map(item => (
                <li
                    key={item.text}
                    className={classes.menuItem}
                    onClick={() => navigate(item.route)}
                >
                    {item.text}
                </li>
            ))}
            <li className={classes.menuItem}>
                <button className={classes.logoutButton} onClick={logout}>
                    Logout
                </button>
            </li>
        </ul>
    );
};

export default MenuDropdown;