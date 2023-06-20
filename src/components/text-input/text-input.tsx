import React, { useState, useRef, useCallback } from 'react';

import classes from './text-input.module.css'
import CrossedEyeIcon from '../../images/crossed-eye-icon.svg';
import EyeIcon from '../../images/eye-icon.svg';

type TextInputProps = {
    name: string;
    placeholder: string;
    type?: 'text' | 'password';
};

const TextInput = ({
    name,
    placeholder,
    type = 'text',
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
        <div
            className={classes.inputWrapper}
            onClick={focusInput}
        >
            <input
                ref={inputRef}
                className={classes.input}
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
    );
};

export default TextInput;