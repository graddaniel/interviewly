import React from 'react';


import classes from './icon-button.module.css';

const IconButton = ({
    icon,
}) => {
    return (
        <button className={classes.button}>
            <img src={icon}/>
        </button>
    );
};

export default IconButton;