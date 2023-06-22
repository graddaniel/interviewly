import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

import classes from './text-input.module.css'
import CrossedEyeIcon from '../../../images/crossed-eye-icon.svg';
import EyeIcon from '../../../images/eye-icon.svg';

type TextInputProps = {
    className?: string;
    name: string;
    placeholder: string;
    type?: 'text' | 'password';
    centerText?: boolean;
    error?: string;
};

const TextInput = ({
    className,
    name,
    placeholder,
    type = 'text',
    centerText = false,
    error,
}: TextInputProps) => {
    const [ value, setValue ] = useState('');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = useCallback(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const getInputType = useCallback(() => {
        if (type !== 'password') {
            return type;
        }

        return isPasswordVisible ? 'text' : 'password';
    }, [isPasswordVisible, type]);

    return (
        <div className={className}>
            <div
                className={classNames(
                    classes.inputWrapper,
                    error && classes.error || '',
                )}
                onClick={focusInput}
            >
                <input
                    ref={inputRef}
                    className={classNames(
                        classes.input,
                        centerText && classes.centerText || ''
                    )}
                    type={getInputType()}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                />
                {type === 'password' && (
                    <img
                        className={classes.passwordToggle}
                        src={isPasswordVisible
                            ? EyeIcon
                            : CrossedEyeIcon
                        }
                        onClick={() => setIsPasswordVisible(state => !state)}
                    />
                )}
            </div>
            <p className={classes.errorMessage}>{error}</p>
        </div>
    );
};

export default TextInput;