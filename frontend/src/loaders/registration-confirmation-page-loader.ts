import AuthService from "../services/auth-service";

export default async function RegistrationConfirmationPageLoader ({
    params
}) {
    const { accountId } = params;

    await AuthService.confirm(accountId);

    //TODO if already active error, redirect to login with an error, else if regular error return to home with error

    return null;
}