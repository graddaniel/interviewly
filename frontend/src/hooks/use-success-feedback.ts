import { useContext, useEffect } from 'react';

import { FeedbackMessageContext } from '../contexts';


export default function useSuccessFeedback (
    actionData: any,
    messages: string | { [k: string]:string }) {
    const [ feedbackMessage, setFeedbackMessage ] = useContext(FeedbackMessageContext);

    useEffect(() => {
        if (!actionData?.success) {
            return;
        }

        if (typeof messages === 'string') {
            setFeedbackMessage({
                type: 'success',
                message: messages,
            });
        } else {
            setFeedbackMessage({
                type: 'success',
                message: messages[actionData.path],
            });
        }
    }, [actionData]);
}