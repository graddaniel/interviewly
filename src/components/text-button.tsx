import React from 'react';
import classnames from 'classnames';

import classes from './text-button.module.css';


const Button = ({
    text,
    className,
}) => {
    return (
        <button className={classnames(classes.button, className)}>
            {text}
        </button>
    );
};

export default Button;