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

const createCompanyAccount = async (newTeamMemberData) => {
    try {
        await TeamMemberValidator.validateNewAccount(newTeamMemberData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    await CompanyService.createCompanyAccount(newTeamMemberData);    

    return { success: true };
};

const editCompanyAccount = async (editedTeamMemberData) => {
    editedTeamMemberData.projects = editedTeamMemberData.projects.split(',');

    try {
        await TeamMemberValidator.validateEditedAccount(editedTeamMemberData);
    } catch (errors) {
        return {
            success: false,
            errors,
        };
    }

    await CompanyService.editCompanyAccount(editedTeamMemberData);

    return { success: true };
};