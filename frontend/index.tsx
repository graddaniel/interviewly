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
import LibraryEditorPage from './src/pages/app/library-editor/library-editor-page';
import App from './src/pages/app/app';
import MyAccountPage from './src/pages/app/my-account/my-account-page';
import MyTeamPage from './src/pages/app/my-team/my-team-page';
import ProfilePage from './src/pages/home/profile-page/profile-page';
import Protected from './src/utils/protected';
import RequireAnonymous from './src/utils/require-anonymous';
import ProjectsPage from './src/pages/app/projects/projects-page';
import AppAction from './src/actions/app/app-action';
import EditProjectPage from './src/pages/app/edit-project/edit-project-page';
import EditProjectAction from './src/actions/app/edit-project-action';
import EditProjectLoader from './src/loaders/app/edit-project-loader';
import MyTeamLoader from './src/loaders/app/my-team-loader';
import MyTeamAction from './src/actions/app/my-team-action';
import ProjectsLoader from './src/loaders/app/projects-loader';
import LibraryPage from './src/pages/app/library/library-page';
import LibraryEditorAction from './src/actions/app/library-editor-action';
import TermsAndConditionsPage from './src/pages/terms-and-conditions/terms-and-conditions-page';
import PrivacyPolicyPage from './src/pages/privacy-policy/privacy-policy-page';
import PersonalDataProcessingAgreementPage from './src/pages/personal-data-processing-agreement/personal-data-processing-agreement-page';
import ContactPage from './src/pages/contact/contact-page';
import RegistrationConfirmationPage from './src/pages/registration-confirmation/registration-confirmation-page';
import RegistrationConfirmationPageLoader from './src/loaders/registration-confirmation-page-loader';
import ViewProjectPage from './src/pages/app/view-project/view-project-page';
import ContactPageAction from './src/actions/contact-page-action';
import ProjectRespondentPage from './src/pages/app/project-respondent/project-respondent-page';
import ProjectRespondentLoader from './src/loaders/app/project-respondent-loader';
import CompanyDataPage from './src/pages/app/company-data/company-data-page';
import PersonalDataPage from './src/pages/app/personal-data/personal-data-page';
import CompanyDataLoader from './src/loaders/app/company-data-loader';
import CompanyDataAction from './src/actions/app/company-data-action';
import OnlineCommunityRoomPage from './src/pages/app/online-community-room/online-community-room-page';

import ROUTES, { APP_FORMS_ROUTES, APP_ROUTES, FORMS_ROUTES } from './src/consts/routes';
import { SAMPLE_VERSION } from 'config/current';

import './src/consts/colors.css';
import './i18n/i18n';


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
            {!SAMPLE_VERSION && (<>
            <Route
                path={ROUTES.LOG_IN.PATH}
                element={
                    <RequireAnonymous>
                        <LogInPage />
                    </RequireAnonymous>
                }
                action={LogInPageAction}
            />
            <Route
                path={ROUTES.BLOG.PATH}
                element={<BlogPage />}
            />
            <Route
                path={ROUTES.TUTORIALS.PATH}
                element={<TutorialsPage />}
            />
            </>)}
            <Route
                path={ROUTES.CONTACT.PATH}
                element={<ContactPage />}
                action={ContactPageAction}
                errorElement={<ContactPage />}
            />
            <Route
                path={ROUTES.REGISTRATION_CONFIRMATION.PATH}
                element={<RegistrationConfirmationPage />}
                loader={RegistrationConfirmationPageLoader}
            />
            <Route
                path={ROUTES.PERSONAL_DATA_PROCESSING_AGREEMENT.PATH}
                element={<PersonalDataProcessingAgreementPage />}
            />
            <Route
                path={ROUTES.TERMS_AND_CONDITIONS.PATH}
                element={<TermsAndConditionsPage />}
            />
            <Route
                path={ROUTES.PRIVACY_POLICY.PATH}
                element={<PrivacyPolicyPage />}
            />
            <Route
                path={ROUTES.USER_PROFILE.PATH}
                element={
                    <Protected requiredRoles={[]}>
                        <ProfilePage />
                    </Protected>
                }
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
                path={ROUTES.APP.PATH}
                element={<App />}
                action={AppAction}
            >
                <Route
                    path={APP_ROUTES.MY_ACCOUNT.PATH}
                    element={<MyAccountPage />}
                />
                <Route
                    path={APP_ROUTES.PERSONAL_DATA.PATH}
                    element={<PersonalDataPage />}
                />
                <Route
                    path={APP_ROUTES.COMPANY_DATA.PATH}
                    element={<CompanyDataPage />}
                    loader={CompanyDataLoader}
                    action={CompanyDataAction}
                />
                <Route
                    path={APP_ROUTES.PROJECTS.PATH}
                    element={<ProjectsPage />}
                    loader={ProjectsLoader}
                    errorElement={<ProjectsPage />}
                />
                <Route
                    path={APP_ROUTES.VIEW_PROJECT.PATH}
                    element={<ViewProjectPage />}
                />
                <Route
                    path={APP_ROUTES.PROJECT_RESPONDENT.PATH}
                    element={<ProjectRespondentPage />}
                    loader={ProjectRespondentLoader}
                />
                <Route
                    path={APP_ROUTES.ONLINE_COMMUNITY_ROOM.PATH}
                    element={<OnlineCommunityRoomPage />}
                />
                <Route
                    path={APP_FORMS_ROUTES.EDIT_PROJECT.PATH}
                    element={<EditProjectPage />}
                    loader={EditProjectLoader}
                    action={EditProjectAction}
                />
                <Route
                    path={APP_ROUTES.MY_TEAM.PATH}
                    element={<MyTeamPage />}
                    loader={MyTeamLoader}
                    action={MyTeamAction}
                />
                <Route
                    path={APP_ROUTES.CALENDAR.PATH}
                    element={<div>CALENDAR</div>}
                />
                <Route
                    path={APP_ROUTES.LIBRARY.PATH}
                    element={<LibraryPage />}
                />
                <Route
                    path={APP_FORMS_ROUTES.LIBRARY_EDITOR.PATH}
                    element={<LibraryEditorPage />}
                    action={LibraryEditorAction}
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
