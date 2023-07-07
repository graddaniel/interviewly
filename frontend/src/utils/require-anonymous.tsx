import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { APP_ROUTES } from '../consts/routes';


const RequireAnonymous = ({
    children
}) => {
    const auth = useAuth();

    return auth.currentUser ? <Navigate to={APP_ROUTES.MY_ACCOUNT.PATH}/> : children;
};

export default RequireAnonymous;