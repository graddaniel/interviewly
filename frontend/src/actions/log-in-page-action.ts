import { redirect } from 'react-router-dom';

import Validator from '../utils/validator';
import AuthService from '../services/auth-service';

import ROUTES from '../consts/routes';


const LogInPageAction = async ({ request }) => {
    const formData =  Object.fromEntries(await request.formData());
    const { actionType } = formData;
    console.log(formData)

    switch (actionType) {
        case 'logIn':
            console.log("logIn action")
            try {
                const {
                    email,
                    password,
                    remember,
                } = formData;

                await Validator.validateLogInData(formData);

                const jwtToken = await AuthService.login(email, password);
                console.log(sessionStorage, localStorage);
                (remember ? localStorage : sessionStorage)
                    .setItem('accessToken', jwtToken);

                return redirect(ROUTES.USER_PROFILE.PATH);

            } catch (errors) {
                console.error("Login validation failed", errors);
                if (errors.name === 'AxiosError') {
                    return {
                        success: false,
                        errors: errors?.response?.data === 'Incorrect password'
                            ? {
                                password: 'Incorrect password',
                            }
                            : {
                                generic: errors?.response?.data || 'Unknown error'
                            },
                    }
                }

                return {
                    success: false,
                    errors,
                };
            }

        case 'resetPassword':
            console.error("TODO call password reset endpoint");

            return redirect(`${ROUTES.LOG_IN.PATH}?confirmPasswordReset`);

        default:
            console.error(`Unrecognized action type: ${actionType}`);
    }

    return null;
};

export default LogInPageAction;