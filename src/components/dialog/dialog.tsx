import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import IconButton from '../icon-button/icon-button';

import classes from './dialog.module.css'
import CrossIcon from '../../images/cross-icon.svg';


const Dialog = ({
    isOpen,
    onClose,
    children,
}) => {
    const { t } = useTranslation();

    return (
        <section className={classNames(
            classes.dialog,
            isOpen ? classes.open : classes.closed,
        )}>
            <div className={classes.closeControl}>
                <IconButton
                    icon={CrossIcon}
                    onClick={onClose}
                    className={classes.closeControlButton}
                />
                <span className={classes.closeControlText}>
                    {t('buttons.resign')}
                </span>
            </div>
            {children}
        </section>
    );
};

export default Dialog;