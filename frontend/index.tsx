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
    Outlet,
    Route,
    RouterProvider
} from 'react-router-dom';

import Application from './src/application';
import HomePage from './src/pages/home/home-page';
import LogInPage from './src/pages/log-in/log-in-page';
import JoinPage from './src/pages/join/join-page';
import NotFoundPage from './src/pages/not-found/not-found-page';
import BlogPage from './src/pages/blog/blog-page';
import LogInPageAction from './src/actions/log-in-page-action';
import JoinPageAction from './src/actions/join-page-action';
import TutorialsPage from './src/pages/tutorials/tutorials-page';

import ROUTES, { FORMS_ROUTES } from './src/consts/routes';

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
                element={<HomePage />}
            />
            <Route
                path={ROUTES.LOG_IN.PATH}
                element={<LogInPage />}
                action={LogInPageAction}
            />
            <Route
                path={ROUTES.BLOG.PATH}
                element={<BlogPage />}
            />
            <Route
                path={ROUTES.CONTACT.PATH}
                element={<div>CONTACT</div>}
            />
            <Route
                path={ROUTES.TUTORIALS.PATH}
                element={<TutorialsPage />}
            />
            <Route
                path={ROUTES.FORMS.PATH}
                element={<Outlet />}
            >
                <Route
                    path={FORMS_ROUTES.JOIN.PATH}
                    element={<JoinPage />}
                    action={JoinPageAction}
                />
            </Route>
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
