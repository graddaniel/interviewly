import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import ROUTES from '../consts/routes';


const Protected = ({
    requiredRoles,
    children,
}) => {
    const auth = useAuth();

    if (!auth.currentUserHasRole(requiredRoles)) {
        return (
            <Navigate
                to={ROUTES.LOG_IN.PATH}
            />
        );
    }
    
    return children;
};

export default Protected;