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
import LogInPage from './src/pages/log-in/log-in-page';
import NotFoundPage from './src/pages/not-found/not-found-page';

import LogInPageAction from './src/actions/log-in-page-action';

import ROUTES from './src/consts/routes';

import './src/consts/colors.css';
import './i18n';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<Application />}
        >
            <Route
                path={ROUTES.HOME.PATH}
                element={<div>HOME</div>}
            />
            <Route
                path={ROUTES.LOG_IN.PATH}
                element={<LogInPage />}
                action={LogInPageAction}
            />
            <Route
                path={ROUTES.SIGN_UP.PATH}
                element={<div>SIGN_UP</div>}
            />
            <Route
                path={ROUTES.RESET_PASSWORD.PATH}
                element={<div>RESET</div>}
            />
            <Route
                path={ROUTES.CONTACT.PATH}
                element={<div>CONTACT</div>}
            />
            <Route
                path={'*'}
                element={<NotFoundPage />}
            />
        </Route>
    )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RouterProvider router={router} />);
