import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';

import { FeedbackMessageContext } from '../../contexts';
import IconButton from '../icon-button/icon-button';

import classes from './snackbar.module.css';
import CrossIcon from 'images/cross-icon.svg';


const Snackbar = () => {
    const [ feedbackMessage, setFeedbackMessage ] = useContext(FeedbackMessageContext);

    const {
        type,
        message,
    } = feedbackMessage;

    const close = () => setFeedbackMessage({ type: null, message: null });

    useEffect(() => {
        let timerId;
        if (message) {
            timerId = setTimeout(() => {
                close();
                timerId = null;
            }, 5000);
        }

        return () => {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
        }
    }, [feedbackMessage]);

    if (!message) {
        return null;
    }

    return (
        <div
            className={classNames(classes.snackbar, classes[type])}
        >
            {message}
            <IconButton
                className={classes.iconButton}
                icon={CrossIcon}
                onClick={close}
            />
        </div>
    );
};

export default Snackbar;