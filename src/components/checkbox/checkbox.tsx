import React, { useState, useCallback } from 'react';

import classes from './checkbox.module.css';


const Checkbox = ({
    name,
    label,
}) => {
    const [ checked, setChecked ] = useState(false);

    const toggleCheckbox = useCallback(() => setChecked(state => !state), []);
    return (
        <label
            className={classes.label}
            htmlFor="remember"
        >
            <input
                id={name}
                className={classes.checkbox}
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