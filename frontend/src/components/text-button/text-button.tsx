import React from 'react';
import classNames from 'classnames';

import classes from './text-button.module.css';

type TextButtonProps = {
    text: string;
    className?: string;
    onClick: () => void;
    hidden?: boolean;
    disabled?: boolean;
    monochromatic?: boolean;
};

const TextButton = ({
    text,
    className,
    onClick,
    hidden,
    disabled,
    monochromatic = false,
}: TextButtonProps) => {
    return (
        <button
            className={classNames(
                classes.button,
                className,
                monochromatic && classes.monochromatic || '',
                hidden && classes.hidden || '',
            )}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            disabled={disabled || hidden}
        >
            {text}
        </button>
    );
};

export default TextButton;