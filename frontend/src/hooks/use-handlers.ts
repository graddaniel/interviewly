import { useActionData, useLoaderData } from 'react-router-dom';

import useSuccessFeedback from './use-success-feedback';
import { useHandleErrorWithFeedback } from './use-handle-error-with-feedback-handler';

export type Result = {
    success: boolean,
    errors?: any[],
    error?: any,
    [k: string]: string | any,
};

export function useActionHandler (messageData: string | { [k: string]:string } | null = null) {
    const actionResult = useActionData() as Result;

    useSuccessFeedback(actionResult, messageData);
    const overriddenResult = useHandleErrorWithFeedback(actionResult);

    return overriddenResult;
}

export function useLoaderHandler () {
    const loaderResult = useLoaderData() as Result;

    useHandleErrorWithFeedback(loaderResult);

    return loaderResult;
}