import CompanyService from '../../services/company-service';


const MyTeamLoader = async () => {
    const companysAccounts = await CompanyService.getCompanyAccounts();

    return companysAccounts;
};

export default MyTeamLoader;