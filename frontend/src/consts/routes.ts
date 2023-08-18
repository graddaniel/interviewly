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
    REGISTRATION_CONFIRMATION: {
        TITLE: 'Registration confirmation',
        PATH: '/confirm/:accountId',
    },
    SET_PASSWORD: {
        PATH: '/setPassword/:accountId',
    },
    PRIVACY_POLICY: {
        TITLE: 'PrivacyPolicy',
        PATH: '/privacyPolicy'
    },
    TERMS_AND_CONDITIONS: {
        TITLE: 'Terms and conditions',
        PATH: '/termsAndConditions',
    },
    PERSONAL_DATA_PROCESSING_AGREEMENT: {
        TITLE: 'Agreement on the Processing of Personal Data',
        PATH: '/personalDataProcessingAgreement',
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
        PATH: '/app/myAccount',
    },
    PERSONAL_DATA: {
        PATH: '/app/personalData',
    },
    COMPANY_DATA: {
        PATH: '/app/companyData',
    },
    PROJECTS: {
        PATH: '/app/projects',
    },
    VIEW_PROJECT: {
        PATH: '/app/projects/:projectId',
    },
    PROJECT_RESPONDENT: {
        PATH: '/app/projects/:projectId/:respondentId',
    },
    ONLINE_COMMUNITY_ROOM: {
        PATH: '/app/projects/:projectId/rooms/:roomId',
    },
    MY_TEAM: {
        PATH: '/app/myTeam',
    },
    CALENDAR: {
        PATH: '/app/calendar',
    },
    LIBRARY: {
        PATH: '/app/library',
    },
};

const APP_FORMS_ROUTES = {
    EDIT_PROJECT: {
        TITLE: 'Edit project',
        PATH: '/app/projects/:projectId/edit'
    },
    NEW_TEMPLATE: {
        PATH: '/app/library/template'
    },
    EDIT_TEMPLATE: {
        PATH: '/app/library/template/:templateId'
    },
    MEETING: {
        PATH: '/app/meeting/:meetingId'
    }
};

export {
    FORMS_ROUTES,
    APP_ROUTES,
    APP_FORMS_ROUTES,
};

export default ROUTES;