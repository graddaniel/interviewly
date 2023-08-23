import React from 'react';
import classNames from 'classnames';

import classes from './icon-button.module.css';

type IconButtonProps = {
    icon: string,
    onClick: () => void,
    className?: string,
    disabled?: boolean,
    disableClick?: boolean,
};

const IconButton = ({
    icon,
    onClick,
    className,
    disabled,
    disableClick,
}: IconButtonProps) => {
    return (
        <button
            className={classNames(
                classes.button,
                disabled && classes.disabled,
                disableClick && classes.disableClick,
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