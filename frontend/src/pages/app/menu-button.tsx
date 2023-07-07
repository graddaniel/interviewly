import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import classes from './menu-button.module.css';


const MenuButton = ({
    icon: {
        highlighted: highlightedIcon,
        regular: regularIcon,
    },
    path,
    text,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const goToPath = useCallback(() => navigate(path), [path]);

    const highlighted = location.pathname.includes(path);

    return (
        <button
            className={classNames(
                classes.menuButton,
                highlighted
                    ? classes.highlightedButton
                    : classes.regularButton
            )}
            onClick={goToPath}
        >
            <img
                className={classes.icon}
                src={highlighted ? highlightedIcon : regularIcon}
            />
            <span className={classes.text}>{text}</span>
        </button>
    );
};

export default MenuButton;