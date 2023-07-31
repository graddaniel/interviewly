import CompanyService from "../../services/company-service";


export default async function CompanyDataLoader() {
    try {
        return {
            success: true,
            data: await CompanyService.getCompanyData(),
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}