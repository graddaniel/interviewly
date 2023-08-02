import React from 'react';
import classNames from 'classnames';

import classes from './popup.module.css';


type PopupProps = {
    className?: string;
    children: any[] | any;
};

const Popup = ({
    className,
    children,
}: PopupProps) => {
    return (
        <div className={classes.overlay}>
            <section className={classNames(classes.popup, className)}>
                {children}
            </section>
        </div>
    );
};

export default Popup;