import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

import classes from './numerical-input.module.css'


type NumericalInputProps = {
    name: string;
    label: string;
    className?: string;
    defaultValue?: number;
    inputProps?: {
        wrapper?: {
            className?: string;
        },
        input?: {
            className?: string;
        },
    };
    centerText?: boolean;
    error?: string;
    onChange?: (value: number) => void;
    immutable?: boolean; // same as disabled, but without style change
};

const NumericalInput = ({
    className,
    inputProps,
    name,
    label,
    defaultValue = 0,
    centerText = false,
    error,
    onChange,
    immutable = false,
}: NumericalInputProps) => {
    const [ value, setValue ] = useState<number>(defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = useCallback(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleNumberChange = (event) => {
        setValue(event.target.value);
        if (onChange) {
            onChange(event.target.value);
        }
    }

    return (
        <div className={className}>
            <div
                className={classNames(
                    classes.inputWrapper,
                    error && classes.error || '',
                    immutable && classes.notEditable,
                    inputProps?.wrapper?.className
                )}
                onClick={focusInput}
            >
                <label className={classes.label}>
                    {label}
                </label>
                <input
                    id={name}
                    ref={inputRef}
                    className={classNames(
                        classes.input,
                        centerText && classes.centerText || '',
                        inputProps?.input?.className,
                    )}
                    type="number"
                    name={name}
                    value={value}
                    onChange={handleNumberChange}
                    disabled={immutable}
                />
            </div>
            <p className={classes.errorMessage}>{error}</p>
        </div>
    );
};

export default NumericalInput;