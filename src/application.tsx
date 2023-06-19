import React from 'react';
import { Outlet } from 'react-router-dom';

import NavigationBar from './components/navigation-bar';
import Footer from './components/footer';


const Application = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Application;