import { AccountTypes } from 'shared';
import AuthService from '../services/auth-service';
import JoinValidator from '../validators/join-validator';


type JoinData = {
    name: string;
    surname: string;
    email: string;
    password: string;
    type: string;
    gender: string;
    repeatPassword: string;
    step: string;
    companyName?: string;
    agreement?: string;
    newsletter?: string;
};

const JoinPageAction = async ({
    request,
}) => {
    const {
        method,
    } = request;
    const formData = Object.fromEntries(await request.formData()) as JoinData;

    console.log('Join Action', method, formData);
    const {
        step: stepString,
        agreement
    } = formData;

    const step = parseInt(stepString, 10);

    console.log("step", step)
    if (step === 3) {
        //TODO TEMPORARY REMOVE IT AFTER THE VIDEO RECORDING IS FINISHED
        // return {
        //     success: true,
        // }
        try {
            await JoinValidator.validateData(formData);

            if (!agreement) {
                return {
                    success: false,
                    errors: {
                        agreement: 'Required',
                    },
                };
            }
        } catch (errors) {
            return {
                success: false,
                errors,
            }
        }

        const {
            email,
            password,
            name,
            surname,
            type,
            gender,
            companyName,
            newsletter,
        } = formData;

        if (type === AccountTypes.Type.RECRUITER) {   
            await AuthService.register(
                email,
                password,
                name,
                surname,
                type,
                gender,
                !!newsletter,
                companyName,
            );
        }
    } else if (step === 4) {
        const {
            email,
            password,
            name,
            surname,
            type,
            gender,
            newsletter,
        } = formData;

        await AuthService.register(
            email,
            password,
            name,
            surname,
            type,
            gender,
            !!newsletter,
        );
    }

    return {
        success: true,
    };
};

export default JoinPageAction;