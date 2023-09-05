import React from 'react';
import classNames from 'classnames';

import classes from './submit-button.module.css';


type SubmitButtonProps = {
    className?: string;
    text: string;
    disabled?: boolean;
};

const SubmitButton = ({
    className,
    text,
    disabled,
}: SubmitButtonProps) => {
    return (
        <input
            className={classNames(
                classes.submitButton,
                className,
                disabled && classes.disabled,
            )}
            type="submit"
            value={text}
            disabled={disabled}
        />
    );
};

export default SubmitButton;