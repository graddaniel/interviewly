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

    switch (action) {
        case 'add':
            return await createCompanyAccount(requestData);
        case 'edit':
            return await editCompanyAccount(requestData);
        default:
            console.error('Unrecognized MyTeam action')
    }
};

export default MyTeamAction;

const createCompanyAccount = async (teamMemberData) => {
    try {
        await TeamMemberValidator.validateData(teamMemberData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    await CompanyService.createCompanyAccount(teamMemberData);    

    return { success: true };
};

const editCompanyAccount = async (teamMemberData) => {
    try {
        await TeamMemberValidator.validateData(teamMemberData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    await CompanyService.editCompanyAccount(teamMemberData);

    return { success: true };
};