import React from 'react';

import classes from './titled-divider.module.css';


const TitledDivider = ({
    title
}) => {
    return (
        <div className={classes.titledDivider}>
            {title}
        </div>
    );
};

export default TitledDivider;