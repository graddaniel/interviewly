import React from 'react';

import IconButton from '../icon-button/icon-button';

import classes from './close-controls.module.css';
import CrossIcon from '../../../images/cross-icon.svg';

const CloseControls = ({
    text,
    onClose,
}) => {
    return (
        <div className={classes.closeControl}>
            <IconButton
                icon={CrossIcon}
                onClick={onClose}
                className={classes.closeControlButton}
            />
            <span className={classes.closeControlText}>
                {text}
            </span>
        </div>
    );
};

export default CloseControls;