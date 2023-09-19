import AuthService from "../services/auth-service";

export default async function RegistrationConfirmationPageLoader ({
    params
}) {
    const { accountId } = params;

    try {
        await AuthService.confirm(accountId);
    } catch (error) {
        return {
            success: false,
            error,
        }
    }

    return {
        success: true,
    };
}