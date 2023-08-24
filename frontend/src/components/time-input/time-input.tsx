import React, { useEffect, useState } from 'react';

import classes from './time-input.module.css';
import classNames from 'classnames';


type TimeInputProps = {
    className?: string;
    name: string;
    onChange: (newTime: string) => void;
    defaultValue?: string;
    error?: boolean;
};

const TimeInput = ({
    className,
    name,
    onChange,
    defaultValue,
    error,
}: TimeInputProps) => {
    const [ time, setTime ] = useState(defaultValue ?? '');

    useEffect(() => {
        onChange(time);
    }, [time]);

    return (
        <input
            className={classNames(
                classes.input,
                error && classes.error,
                className,
            )}
            name={name}
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
        />
    );
};

export default TimeInput;