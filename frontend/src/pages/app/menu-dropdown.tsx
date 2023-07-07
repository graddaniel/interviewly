import React, { useCallback } from 'react';
import { useHref, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import ROUTES, { APP_ROUTES } from '../../consts/routes';

import classes from './menu-dropdown.module.css';
import classNames from 'classnames';


const MenuDropdown = ({
    isOpen,
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
        link: myAccountLink,
    }, {
        text: 'Personal data',
        link: myAccountLink,
    }, {
        text: 'Company data',
        link: myAccountLink,
    }, {
        text: 'My team',
        link: myAccountLink,
    }];

    return (
        <ul 
            className={classNames(classes.dropdownMenu, !isOpen ? classes.hidden : '')}
        >
            {menuItems.map(item => (
                <li key={item.text} className={classes.menuItem}>
                    <a className={classes.link} href={item.link}>{item.text}</a> 
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