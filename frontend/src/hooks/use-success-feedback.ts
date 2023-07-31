import { useContext, useEffect } from 'react';

import { FeedbackMessageContext } from '../contexts';


export default function useSuccessFeedback (actionData, message) {
    const [ feedbackMessage, setFeedbackMessage ] = useContext(FeedbackMessageContext);

    useEffect(() => {
        if (!actionData?.success) {
            return;
        }

        setFeedbackMessage({
            type: 'success',
            message,
        });
    }, [actionData]);
}