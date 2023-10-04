import { useContext, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import useAuth from './useAuth';
import { FeedbackMessageContext } from '../contexts';
import ROUTES from '../consts/routes';
import { useNavigate } from 'react-router-dom';


export function useHandleErrorWithFeedback (result) {
    const [feedbackMessage, setFeedbackMessage] = useContext(FeedbackMessageContext);

    const { t } = useTranslation();
    const auth = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (
            !result
            || result.success
            || !result.success && result.errors
        ) {
            return;
        }

        if (!result.success && !result.error) {
            console.error("No error and no success, this should not happen!");
            return;
        }
        
        const {
            error,
        } = result;

        let errorMessage = error.message;
        if (error instanceof AxiosError) {
            if (error.code === "ERR_NETWORK") {
                errorMessage = t('errors.networkError');
                
            } else {
                const {
                    type,
                    message,
                } = error?.response?.data?.error || {};
                
                if (type === 'tokenExpired' || type === 'invalidToken') {
                    errorMessage = t(`errors.${type}`);
                    auth.clearSession();
                    navigate(ROUTES.LOG_IN.PATH);
                } else if (type === 'validation') {
                    errorMessage = null;
                } else {
                    errorMessage = message;
                }
            }
        }
        console.log(errorMessage)
        if (errorMessage) {
            setFeedbackMessage({
                type: 'error',
                message: errorMessage,
            });
        }
        
    }, [result]);
    
    const {
        type,
        path,
        message,
    } = result?.error?.response?.data?.error || {};
    if (type === 'validation' && path) {
        return {
            success: false,
            errors: {
                [path]: message,
            },
        };
    }

    return result;
}