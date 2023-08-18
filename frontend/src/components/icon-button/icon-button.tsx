import React from 'react';
import classNames from 'classnames';

import classes from './icon-button.module.css';

type IconButtonProps = {
    icon: string,
    onClick: () => void,
    className?: string,
    disabled?: boolean,
};

const IconButton = ({
    icon,
    onClick,
    className,
    disabled,
}: IconButtonProps) => {
    return (
        <button
            className={classNames(
                classes.button,
                disabled && classes.disabled,
                className,
            )}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <img className={classes.icon} src={icon}/>
        </button>
    );
};

export default IconButton;