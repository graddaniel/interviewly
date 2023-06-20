import React from 'react';

import LogInForm from './log-in-form';

import classes from './log-in-page.module.css';


const LogInPage = () => {
    return (
        <main className={classes.content}>
            <LogInForm
                className={classes.form}
            />
            <article className={classes.opinion}>

            </article>
        </main>
    );
};

export default LogInPage;