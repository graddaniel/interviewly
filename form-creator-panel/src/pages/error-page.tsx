import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError() as Error;

    return (
        <main>
            ERROR: {error.message}
            <Link to="/surveys">Go back</Link>
        </main>
    );
}

export default ErrorPage;