import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import classNames from 'classnames';

import classes from './switch-input.module.css'


type SwitchInputProps = {
    className?: string;
    leftLabel?: string;
    rightLabel?: string;
    defaultValue?: boolean;
    name: string;
};

const SwitchInput = ({
    className,
    leftLabel,
    rightLabel,
    defaultValue,
    name,
}: SwitchInputProps) => {
    const [ checked, setChecked ] = useState(!!defaultValue);

    return (
        <div className={classNames(classes.switchInput, className)}>
            {leftLabel && (
                <label className={classes.leftLabel} htmlFor={name}>
                    {leftLabel}
                </label>
            )}
            <Switch.Root
                className={classes.switchRoot}
                id={name}
                name={name}
                onCheckedChange={(checked: boolean) => setChecked(checked)}
                checked={checked}
            >
                <Switch.Thumb className={classes.switchThumb} />
            </Switch.Root>
            {rightLabel && (
                <label className={classes.rightLabel} htmlFor={name}>
                    {rightLabel}
                </label>
            )}
        </div>
    );
};

export default SwitchInput;

            // <Switch
            //     className={classes.switch}
            //     onChange={(checked) => setValue(checked)}
            //     checked={value}
            //     checkedIcon={false}
            //     uncheckedIcon={false}
            //     onColor='#9029E2'
            // />