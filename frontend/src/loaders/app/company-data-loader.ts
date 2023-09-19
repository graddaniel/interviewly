import CompanyService from "../../services/company-service";


export default async function CompanyDataLoader() {
    try {
        const companyData = await CompanyService.getCompanyData();

        return {
            success: true,
            companyData,
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}