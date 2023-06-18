//import 'react-app-polyfill/ie11';
//import 'react-app-polyfill/stable';
//TODO install
import * as React from 'react';
import {
    createRoot
} from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from 'react-router-dom';

import Application from './src/application';

import ROUTES from './src/consts/routes';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Application />}
        >
            <Route
                path={ROUTES.HOME.PATH}
                element={<div>TODO</div>}
            />
            <Route
                path={ROUTES.SIGN_IN.PATH}
                element={<div>TODO</div>}
            />
            <Route
                path={ROUTES.SIGN_UP.PATH}
                element={<div>TODO</div>}
            />
            <Route
                path={ROUTES.RESET_PASSWORD.PATH}
                element={<div>TODO</div>}
            />
            <Route
                path={ROUTES.CONTACT.PATH}
                element={<div>TODO</div>}
            />
        </Route>
    )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
