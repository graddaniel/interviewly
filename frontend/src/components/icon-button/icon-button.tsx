import React from 'react';
import classNames from 'classnames';

import classes from './icon-button.module.css';

type IconButtonProps = {
    icon: string,
    onClick: (e?: React.MouseEvent) => void,
    className?: string,
};

const IconButton = ({
    icon,
    onClick,
    className,
}: IconButtonProps) => {
    return (
        <button
            className={classNames(classes.button, className)}
            onClick={onClick}
        >
            <img className={classes.icon} src={icon}/>
        </button>
    );
};

export default IconButton;