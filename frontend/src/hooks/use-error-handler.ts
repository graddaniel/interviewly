import { useContext, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import useAuth from './useAuth';
import { FeedbackMessageContext } from '../contexts';
import ROUTES from '../consts/routes';
import { useNavigate } from 'react-router-dom';


export default function useErrorHandler (error) {
    const [feedbackMessage, setFeedbackMessage] = useContext(FeedbackMessageContext);
    const { t } = useTranslation();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!error) {
            return;
        }

        console.error("Error handler:", error);

        let errorMessage = error;
        if (error instanceof AxiosError) {
            if (error.code === "ERR_NETWORK") {
                errorMessage = t('errors.networkError');
            } else {
                if (error?.response?.data?.error?.type === 'tokenExpired') {
                    errorMessage = t('errors.tokenExpired');
                    auth.clearSession();
                    navigate(ROUTES.LOG_IN.PATH);
                } else {
                    errorMessage = error?.response?.data?.error?.message;
                }
            }
        } else {
            errorMessage = error.message;
        }

        setFeedbackMessage({
            type: 'error',
            message: errorMessage,
        });
    }, [error]);
}