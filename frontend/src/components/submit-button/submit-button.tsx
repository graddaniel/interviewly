import React from 'react';
import classNames from 'classnames';

import classes from './submit-button.module.css';


type SubmitButtonProps = {
    className?: string;
    text: string;
};

const SubmitButton = ({
    className,
    text,
}: SubmitButtonProps) => {
    return (
        <input
            className={classNames(classes.submitButton, className)}
            type="submit"
            value={text}
        />
    );
};

export default SubmitButton;