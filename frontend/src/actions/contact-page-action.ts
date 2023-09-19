import ContactRequestService from "../services/contact-request-service";
import ContactRequestValidator from "../validators/contact-request-validator";


export default async function ({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());
    const {
        email,
        message,
    } = formData;

    try {
        await ContactRequestValidator.validateNewRequest(formData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await ContactRequestService.sendRequest(email, message);
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