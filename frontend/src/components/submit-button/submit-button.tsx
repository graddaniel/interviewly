import React from 'react';
import classNames from 'classnames';

import classes from './submit-button.module.css';


type SubmitButtonProps = {
    text: string;
    className?: string;
};

const SubmitButton = ({
    text,
    className,
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