import { Errors } from 'shared';
const { ErrorsTranslations } = Errors;

const en = {
    translation: {
        email: {
            accountCreated_fakedoor: {
                subject: 'Welcome to the Interviewly website! Activate your account and discover the world of employee recruitment!',
                welcome: 'Welcome',
                paragraphs: {
                    first: `We warmly welcome you as a new user of the Interviewly platform! We would like to thank you for registering and for the trust you have placed in us. We are confident that our service will help you succeed in recruiting employees from all over the world.`,
                    second: `Now that your account has been registered, it only takes one click to activate your account, click on the link below:`,
                    third: `We are currently working on key functionalities of our service that will effectively minimize the time to recruit employees. However, for good things you should wait :) Our service is in the process of preparation, you will be the first person to be informed once we start working comprehensively. So expect an email from us with information in the coming days.`,
                },
                signature: `Best regards,\nInterviewly team`
            },
            accountCreated_setPassword: {
                subject: 'Welcome to the Interviewly website! Activate your account and discover the world of employee recruitment!',
                welcome: 'Welcome',
                paragraphs: {
                    first: `You have been invited to Interviewly! We warmly welcome you as a new user of the Interviewly platform!.`,
                    second: `Now that your account has been registered, it only takes one click to set the password and activate your account, click on the link below:`,
                },
                signature: `Best regards,\nInterviewly team`
            },
        },
        errors: {
            ...ErrorsTranslations.en.translation,
        },
    }
};

export default en;