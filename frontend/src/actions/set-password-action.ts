import AuthService from "../services/auth-service";
import SetPasswordValidator from "../validators/set-password-validator";

export default async function SetPasswordAction({
    params,
    request,
}) {
    const formData =  Object.fromEntries(await request.formData());
    const { password } = formData;

    const { accountId } = params;

    try {
        await SetPasswordValidator.validateData(formData);
    } catch (errors) {
        return {
            success: false,
            errors,
        }
    }

    try {
        await AuthService.setPasswordAndConfirm(accountId, password);
    } catch (error) {
        return {
            success: false,
            error,
        };
    }


    return {
        success: true,
    };
}