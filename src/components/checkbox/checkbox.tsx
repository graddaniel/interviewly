import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import classes from './checkbox.module.css';

type CheckboxProps = {
    className?: string;
    name: string;
    label: string;
    error?: boolean;
};

const Checkbox = ({
    className,
    name,
    label,
    error,
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
            />
            {label}
        </label>
    );
};

export default Checkbox;