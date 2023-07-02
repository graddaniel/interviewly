import AuthService from '../services/auth-service';
import Validator from '../utils/validator';


type JoinData = {
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    gender: string;
    repeatPassword: string;
    step: string;
    agreement?: string;
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
            await Validator.validateJoinData(formData);

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
    } else if (step === 4) {
        const {
            email,
            password,
            name,
            surname,
            role,
            gender,
        } = formData;

        await AuthService.register(
            email,
            password,
            name,
            surname,
            role,
            gender,
        );
    }

    return {
        success: true,
    };
};

export default JoinPageAction;