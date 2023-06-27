import { redirect } from 'react-router-dom';

import Validator from '../utils/validator';

import ROUTES from '../consts/routes';


const LogInPageAction = async ({ request }) => {
    const formData =  Object.fromEntries(await request.formData());
    const { actionType } = formData;

    switch (actionType) {
        case 'logIn':
            console.log("logIn action")
            try {
                await Validator.validateLogInData(formData);
            } catch (errors) {
                return {
                    success: false,
                    errors,
                }
            }

            //TODO call server

        case 'resetPassword':
            console.error("TODO call password reset endpoint");

            return redirect(`${ROUTES.LOG_IN.PATH}?confirmPasswordReset`);

        default:
            console.error(`Unrecognized action type: ${actionType}`);
    }

    return null;
};

export default LogInPageAction;