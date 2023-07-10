const ROUTES = {
    HOME: {
        TITLE: 'Home',
        PATH: '/'
    },
    LOG_IN: {
        TITLE: 'Log in',
        PATH: '/logIn',
    },
    CALCULATOR: {
        TITLE: 'Price calculator',
        PATH: '/priceCalculator',
    },
    TUTORIALS: {
        TITLE: 'Tutorials',
        PATH: '/tutorials',
    },
    BLOG: {
        TITLE: 'Blog',
        PATH: '/blog',
    },
    CONTACT: {
        TITLE: 'Contact',
        PATH: '/contact',
    },
    PRIVACY_POLICY: {
        TITLE: 'Privacy policy',
        PATH: '/privacyPolicy',
    },
    TERMS: {
        TITLE: 'Terms',
        PATH: '/terms',
    },
    USER_PROFILE: {
        TITLE: 'Profile',
        PATH: '/profile'
    },
    FORMS: {
        PATH: '/forms'
    },
    APP: {
        PATH: '/app'
    }
};

const FORMS_ROUTES = {
    JOIN: {
        TITLE: 'Join Interviewly',
        PATH: '/forms/join',
    },
};

const APP_ROUTES = {
    MY_ACCOUNT: {
        TITLE: 'My Account',
        PATH: '/app/myAccount',
    },
    PROJECTS: {
        TITLE: 'Projects',
        PATH: '/app/projects',
    },
    MY_TEAM: {
        TITLE: 'My Team',
        PATH: '/app/myTeam',
    },
    CALENDAR: {
        TITLE: 'Calendar',
        PATH: '/app/calendar',
    },
    LIBRARY: {
        TITLE: 'Library',
        PATH: '/app/library',
    },
};

const APP_FORMS_ROUTES = {
    EDIT_PROJECT: {
        TITLE: 'Edit project',
        PATH: '/app/projects/:projectId/edit'
    },
};

export {
    FORMS_ROUTES,
    APP_ROUTES,
    APP_FORMS_ROUTES,
};

export default ROUTES;