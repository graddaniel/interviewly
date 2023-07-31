import { useLoaderData } from "react-router-dom";

import useErrorHandler from "./use-error-handler";


export default function useLoaderDataWithSnackbar() {
    const loaderData = useLoaderData() as any || {};
    const {
        data,
        error: loaderError,
    } = loaderData;

    useErrorHandler(loaderError);

    if (loaderError) {
        return null;
    }

    return data;
}