import CompanyService from "../../services/company-service";
import CompanyValidator from "../../validators/company-validator";


export default async function CompanyDataAction({
    request,
}) {
    const formData = Object.fromEntries(await request.formData());
    
    try {
        await CompanyValidator.validateData(formData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await CompanyService.editCompanyData(formData);
    } catch (error) {
        console.log("CAUGHT", error)
        return {
            success: false,
            errors: {
                generic: error,
            },
        };
    }

    return {
        success: true,
    };
}