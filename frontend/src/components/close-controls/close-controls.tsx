import React from 'react';
import classNames from 'classnames';

import IconButton from '../icon-button/icon-button';

import classes from './close-controls.module.css';
import CrossIcon from '../../../images/cross-icon.svg';

type CloseControlsProps = {
    text: string;
    onClose: (e?: React.MouseEvent) => void;
    className?: string;
}

const CloseControls = ({
    text,
    onClose,
    className,
}: CloseControlsProps) => {
    return (
        <div className={classNames(classes.closeControl, className)}>
            <IconButton
                icon={CrossIcon}
                onClick={() => onClose()}
                className={classes.closeControlButton}
            />
            <span className={classes.closeControlText}>
                {text}
            </span>
        </div>
    );
};

export default CloseControls;