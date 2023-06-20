import React from 'react';
import classNames from 'classnames';

import classes from './text-button.module.css';

type TextButtonProps = {
    text: string;
    className?: string;
    onClick: () => void;
};

const TextButton = ({
    text,
    className,
    onClick,
}: TextButtonProps) => {
    return (
        <button
            className={classNames(classes.button, className)}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default TextButton;