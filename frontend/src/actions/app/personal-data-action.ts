import AuthService from "../../services/auth-service";
import PersonalDataValidator from "../../validators/personal-data-validator";


export default async function PersonalDataAction({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());

    const { type } = formData;

    switch (type) {
        case 'changePassword':
            return changePassword(formData);
        default:
            console.error('Unrecognized action type.');
    }

    return {
        success: true,
    };
}

async function changePassword(formData: any) {
    const {
        currentPassword,
        newPassword,
    } = formData;

    try {
        await PersonalDataValidator.validatePasswordChange(formData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await AuthService.changePassword(currentPassword, newPassword);
    } catch (error) {
        return {
            success: false,
            errors: {
                generic: error,
            },
        };
    }

    return {
        success: true,
        path: 'passwordChange'
    }
}