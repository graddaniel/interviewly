import { redirect } from 'react-router-dom';

import ROUTES from '../consts/routes';


const LogInPageAction = async ({ request }) => {
    const formData = await request.formData();
    const actionType = formData.get('actionType');

    switch (actionType) {
        case 'logIn':
            return {
                generic: 'Cannot connect to the server',
            };

        case 'resetPassword':
            console.error("TODO call password reset endpoint");

            return redirect(`/${ROUTES.LOG_IN.PATH}?confirmPasswordReset`);

        default:
            console.error(`Unrecognized action type: ${actionType}`);
    }

    return null;
};

export default LogInPageAction;