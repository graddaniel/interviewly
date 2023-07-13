import React from 'react';
import classNames from 'classnames';

import capitalizeFirstLetter from '../../utils/capitalize-first-letter';

import classes from './pill.module.css';

const Pill = ({
    className,
    text,
}) => {
    return (
        <div className={classNames(classes.pill, className)}>
            {capitalizeFirstLetter(text)}
        </div>
    );
};

export default Pill;