import { AccountTypes } from 'shared';
import AuthService from '../services/auth-service';
import JoinValidator from '../validators/join-validator';
import { STEPS } from '../pages/join/join-page';

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
    recordingId?: number;
};

const JoinPageAction = async ({
    request,
}) => {
    const formData = Object.fromEntries(await request.formData()) as JoinData;

    const {
        step: stepString,
    } = formData;

    const step = parseInt(stepString, 10);

    const {
        email,
        password,
        name,
        surname,
        type,
        gender,
        newsletter,
    } = formData;

    if (step === STEPS.DATA_FORM) {
        try {
            await JoinValidator.validateData(formData);
        } catch (errors) {
            return {
                success: false,
                errors,
            }
        }

        const {
            type,
            companyName,
        } = formData;
        
        if (type === AccountTypes.Type.RECRUITER) {
            try {
                await AuthService.register({
                    email,
                    password,
                    name,
                    surname,
                    type,
                    gender,
                    newsletter: !!newsletter,
                    companyName,
                });
                
            } catch (error) {
                console.log(error)
                return {
                    success: false,
                    error,
                }
            }            
        }
    } else if (step === STEPS.VIDEO_RECORDING) {
        const {
            recordingId,
        } = formData;

        try {
            await AuthService.register({
                email,
                password,
                name,
                surname,
                type,
                gender,
                newsletter: !!newsletter,
                recordingId,
            });

        } catch (error) {
            console.log(error)
            return {
                success: false,
                error,
            }
        }
    }

    return {
        success: true,
    };
};

export default JoinPageAction;