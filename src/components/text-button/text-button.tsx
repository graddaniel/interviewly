import React from 'react';
import classNames from 'classnames';

import classes from './text-button.module.css';


const Button = ({
    text,
    className,
}) => {
    return (
        <button className={classNames(classes.button, className)}>
            {text}
        </button>
    );
};

export default Button;