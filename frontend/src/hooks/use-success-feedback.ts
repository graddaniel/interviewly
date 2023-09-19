import { useContext, useEffect } from 'react';

import { FeedbackMessageContext } from '../contexts';


export default function useSuccessFeedback (
    actionData: any,
    messages: string | { [k: string]:string } | null) {
    const [ feedbackMessage, setFeedbackMessage ] = useContext(FeedbackMessageContext);

    useEffect(() => {
        if (!actionData?.success || messages === null) {
            return;
        }

        if (typeof messages === 'string') {
            setFeedbackMessage({
                type: 'success',
                message: messages,
            });
        } else {
            if (!messages[actionData.path]) {
                return;
            }

            setFeedbackMessage({
                type: 'success',
                message: messages[actionData.path],
            });
        }
    }, [actionData]);
}