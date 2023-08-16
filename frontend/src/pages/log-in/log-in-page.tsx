import React, { useState, useCallback } from 'react';
import { redirect, useSearchParams } from 'react-router-dom';

import LogInForm from './log-in-form';
import PasswordResetDialog from '../../components/password-reset-dialog/password-reset-dialog';
import useAuth from '../../hooks/useAuth';

import classes from './log-in-page.module.css';
import { APP_ROUTES } from '../../consts/routes';


const LogInPage = () => {
    const [ passwordResetDialogOpen, setPasswordResetDialogOpen ] = useState(false);
    const [ searchParams, setSearchParams ] = useSearchParams();
    const auth = useAuth();

    const openPasswordResetDialog = useCallback(() => setPasswordResetDialogOpen(true), []);
    const closePasswordResetDialog = useCallback(() => {
        setPasswordResetDialogOpen(false);
        setSearchParams('');
    }, []);

    if (auth.currentUser) {
        redirect(APP_ROUTES.MY_ACCOUNT.PATH);
    }

    return (
        <main className={classes.content}>
            <LogInForm
                className={classes.form}
                openPasswordResetDialog={openPasswordResetDialog}
            />
            <article className={classes.opinion}>

            </article>
            <PasswordResetDialog
                isOpen={passwordResetDialogOpen}
                onClose={closePasswordResetDialog}
                showConfirmation={searchParams.get('confirmPasswordReset') !== null}
            />

        </main>
    );
};

export default LogInPage;