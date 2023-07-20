import React, { useState, useCallback, ReactNode } from 'react';
import classNames from 'classnames';

import classes from './checkbox.module.css';

type CheckboxProps = {
    className?: string;
    name: string;
    label: string;
    error?: boolean;
    labelElement?: ReactNode,
};

const Checkbox = ({
    className,
    name,
    label,
    error,
    labelElement,
}: CheckboxProps) => {
    const [ checked, setChecked ] = useState(false);

    const toggleCheckbox = useCallback(() => setChecked(state => !state), []);
    return (
        <label
            className={classNames(
                classes.label,
                error ? classes.redText : '',
                className,
            )}
            htmlFor={name}
        >
            <input
                id={name}
                className={classNames(
                    classes.checkbox,
                    error ? classes.redOutline : ''
                )}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={toggleCheckbox}
                value={name}
            />
            {labelElement || label}
        </label>
    );
};

export default Checkbox;