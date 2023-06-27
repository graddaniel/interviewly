import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import LogInForm from './log-in-form';
import PasswordResetDialog from '../../components/password-reset-dialog/password-reset-dialog';

import classes from './log-in-page.module.css';


const LogInPage = () => {
    const [ passwordResetDialogOpen, setPasswordResetDialogOpen ] = useState(false);
    const [ searchParams, setSearchParams ] = useSearchParams();

    const openPasswordResetDialog = useCallback(() => setPasswordResetDialogOpen(true), []);
    const closePasswordResetDialog = useCallback(() => {
        setPasswordResetDialogOpen(false);
        setSearchParams('');
    }, []);

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