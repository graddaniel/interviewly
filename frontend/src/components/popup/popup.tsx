import React from 'react';

import classes from './popup.module.css';


const Popup = ({
    children,
}) => {
    return (
        <div className={classes.overlay}>
            <section className={classes.popup}>
                {children}
            </section>
        </div>
    );
};

export default Popup;