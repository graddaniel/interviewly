import CompanyService from '../../services/company-service';
import TeamMemberValidator from '../../validators/team-member-validator';


const MyTeamAction = async ({
    request,
}) => {
    const formData = Object.fromEntries(await request.formData());

    const {
        action,
        ...requestData
    } = formData;

    try {
        switch (action) {
            case 'add':
                await createCompanyAccount(requestData);
                break;
            case 'edit':
                await editCompanyAccount(requestData);
                break;
            default:
                console.error('Unrecognized MyTeam action')
        }
    } catch (errors) {
        return errors;
    }

    return null;
};

export default MyTeamAction;

const createCompanyAccount = async (teamMemberData) => {
    await TeamMemberValidator.validateData(teamMemberData);

    return await CompanyService.createCompanyAccount(teamMemberData);
};

const editCompanyAccount = async (teamMemberData) => {
    await TeamMemberValidator.validateData(teamMemberData);

    return await CompanyService.editCompanyAccount(teamMemberData);
};