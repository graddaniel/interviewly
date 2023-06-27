import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Outlet,
} from 'react-router-dom';

import SurveysList from './src/pages/surveys-list';
import SurveyGroups from './src/pages/survey-groups';
import SurveyGroupsLoader from './src/loaders/survey-groups-loader';
import SurveyGroupAction from './src/actions/survey-groups-action';
import QuestionsList from './src/pages/questions-list';
import QuestionsListLoader from './src/loaders/questions-list-loader';
import QuestionsListAction from './src/actions/questions-list-action';
import ErrorPage from './src/pages/error-page';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path={'/'}
            element={<main><Outlet/></main>}
        >
            <Route
                path={'/surveys'}
                element={<SurveysList />}
            >
            </Route>
            <Route
                path={'/surveys/:surveyId/groups/'}
                loader={SurveyGroupsLoader}
                action={SurveyGroupAction}
                element={<SurveyGroups />}
                errorElement={<ErrorPage />}
            >
            </Route>
            <Route
                path={'/surveys/:surveyId/groups/:groupId'}
                loader={QuestionsListLoader}
                action={QuestionsListAction}
                element={<QuestionsList />}
                errorElement={<ErrorPage />}
            >
            </Route>
        </Route>
    )
);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<RouterProvider router={router}/>);
