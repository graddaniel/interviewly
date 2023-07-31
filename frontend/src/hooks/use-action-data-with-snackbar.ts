import { useActionData } from "react-router-dom";

import useErrorHandler from "./use-error-handler";
import useSuccessFeedback from "./use-success-feedback";


export default function useActionDataWithSnackbar(message) {
    const actionData = useActionData() as any || {};
    const actionErrors = actionData?.errors;

    useErrorHandler(actionErrors?.generic);
    useSuccessFeedback(actionData, message);

    return actionErrors;
}