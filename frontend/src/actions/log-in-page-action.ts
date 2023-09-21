import { redirect } from 'react-router-dom';

import AuthService from '../services/auth-service';

import ROUTES, { APP_ROUTES } from '../consts/routes';
import LogInValidator from '../validators/log-in-validator';


const LogInPageAction = async ({ request }) => {
    const formData =  Object.fromEntries(await request.formData());
    const { actionType } = formData;

    switch (actionType) {
        case 'logIn':
            try {
                const {
                    email,
                    password,
                    // remember,
                } = formData;

                await LogInValidator.validateData(formData);

                const jwtToken = await AuthService.login(email, password);

                // (remember ? localStorage : sessionStorage)
                //     .setItem('accessToken', jwtToken);

                localStorage.setItem('accessToken', jwtToken);

                return redirect(APP_ROUTES.MY_ACCOUNT.PATH);

            } catch (errors) {
                console.error("Login validation failed", errors);
                if (errors.name === 'AxiosError') {
                    return {
                        success: false,
                        errors: errors?.response?.data?.error?.message === 'Incorrect password'
                            ? {
                                password: 'Incorrect password',
                            }
                            : {
                                generic: errors?.response?.data?.error?.message || 'Unknown error'
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