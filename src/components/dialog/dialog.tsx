import React from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import classes from './dialog.module.css'
import CloseControls from '../close-controls/close-controls';


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
            <CloseControls
                text={t('buttons.resign')}
                onClose={onClose}
            />
            {children}
        </section>
    );
};

export default Dialog;