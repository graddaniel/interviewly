import React from 'react';

import useAuth from '../../../hooks/useAuth';


const ProfilePage = () => {
    const auth = useAuth();
    
    return (
        <section>
            {Object.entries(auth.currentUser || {}).map(e => `${e}`)}
            <button onClick={auth.logout}>logout</button>
        </section>
    );
}

export default ProfilePage;