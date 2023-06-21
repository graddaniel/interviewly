import React from 'react';

import classes from './submit-button.module.css';


const SubmitButton = ({
    text,
}) => {
    return (
        <input
            className={classes.submitButton}
            type="submit"
            value={text}
        />
    );
};

export default SubmitButton;