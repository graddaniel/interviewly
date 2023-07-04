import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../../hooks/useAuth';
import ROUTES from '../../../consts/routes';


const ProfilePage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        auth.clearSession();
        navigate(ROUTES.HOME.PATH);
    }

    return (
        <section>
            {Object.entries(auth.currentUser || {}).map(e => `${e}`)}
            <button onClick={logout}>logout</button>
        </section>
    );
}

export default ProfilePage;