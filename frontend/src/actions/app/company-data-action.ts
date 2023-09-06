import CompanyService from "../../services/company-service";
import CompanyValidator from "../../validators/company-validator";


export default async function CompanyDataAction({
    request,
}) {
    const requestEntries = await request.formData();
    const formData = Object.fromEntries(requestEntries);

    // previous entries object's properties are not enumerable, so we can't iterate over them
    // thus the entries parsing logic is performed again
    const formDataEntries = Object.entries(formData);
    const filteredFormData = Object.fromEntries(
        formDataEntries.filter(
            e => typeof e[1] === 'string'
            ? e[1] !== ''
            : true,
        )
    );
    
    try {
        await CompanyValidator.validateData(filteredFormData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    try {
        await CompanyService.editCompanyData(filteredFormData);
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
    };
}