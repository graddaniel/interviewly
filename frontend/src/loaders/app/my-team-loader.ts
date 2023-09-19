import CompanyService from '../../services/company-service';


const MyTeamLoader = async () => {
    try {
        const companysAccounts = await CompanyService.getCompanyAccounts();

        return {
            success: true,
            data: {
                teamMembers: companysAccounts,
            },
        };

    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

export default MyTeamLoader;