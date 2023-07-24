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

    await ContactRequestService.sendRequest(email, message);

    return {
        success: true,
    };
}