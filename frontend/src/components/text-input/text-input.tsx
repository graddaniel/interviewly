import React, { useState, useRef, useCallback } from 'react';
import classNames from 'classnames';

import classes from './text-input.module.css'
import CrossedEyeIcon from '../../../images/crossed-eye-icon.svg';
import EyeIcon from '../../../images/eye-icon.svg';

type TextInputProps = {
    name: string;
    placeholder: string;
    className?: string;
    inputProps?: {
        wrapper?: {
            className?: string;
        },
        input?: {
            className?: string;
        },
    };
    type?: 'text' | 'password';
    centerText?: boolean;
    error?: string;
    multiline?: boolean;
    defaultValue?: string;
    onChange?: (value: string) => void;
    // passing the value will make this component controlled from outside
    value?: string;
    disabled?: boolean;
};

const TextInput = ({
    className,
    inputProps,
    name,
    placeholder,
    type = 'text',
    centerText = false,
    error,
    multiline = false,
    defaultValue,
    onChange,
    value: valueInput,
    disabled,
}: TextInputProps) => {
    const [ value, setValue ] = useState(defaultValue || '');
    const [ isPasswordVisible, setIsPasswordVisible ] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const focusInput = useCallback(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
        if (textareaRef && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const getInputType = useCallback(() => {
        if (type !== 'password') {
            return type;
        }

        return isPasswordVisible ? 'text' : 'password';
    }, [isPasswordVisible, type]);

    const currentValue = valueInput ?? value;

    return (
        <div className={className}>
            <div
                className={classNames(
                    classes.inputWrapper,
                    error && classes.error || '',
                    inputProps?.wrapper?.className
                )}
                onClick={focusInput}
            >
                {multiline ? (<>
                    <input
                        type="hidden"
                        id={name}
                        name={name}
                        value={currentValue}
                    />
                    <textarea
                        ref={textareaRef}
                        className={classNames(
                            classes.input,
                            centerText && classes.centerText || '',
                            inputProps?.input?.className,
                        )}
                        placeholder={placeholder}
                        value={currentValue}
                        onChange={(event) => {
                            setValue(event.target.value);
                            if (onChange) {
                                onChange(event.target.value);
                            }
                        }}
                        rows={4}
                        disabled={disabled}
                    >
                    </textarea>
                </>) : (
                    <input
                        id={name}
                        ref={inputRef}
                        className={classNames(
                            classes.input,
                            centerText && classes.centerText || '',
                            inputProps?.input?.className,
                        )}
                        type={getInputType()}
                        name={name}
                        placeholder={placeholder}
                        value={currentValue}
                        onChange={(event) => {
                            setValue(event.target.value);
                            if (onChange) {
                                onChange(event.target.value);
                            }
                        }}
                        disabled={disabled}
                    />
                )}
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