import { useContext, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

import { FeedbackMessageContext } from '../contexts';


export default function useErrorHandler (error) {
    const [feedbackMessage, setFeedbackMessage] = useContext(FeedbackMessageContext);
    const { t } = useTranslation();

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
                errorMessage = error?.response?.data?.error?.message;
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