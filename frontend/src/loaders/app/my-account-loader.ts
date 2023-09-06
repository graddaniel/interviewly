import { AccountTypes } from "shared";
import { getAuth } from "../../hooks/useAuth";
import MeetingService from "../../services/meeting-service";
import ProfileService from "../../services/profile-service";
import CompanyService from "../../services/company-service";
import ProjectService from "../../services/project-service";

export default async function MyAccountLoader({

}) {
    const auth = getAuth();
    if (!auth.currentUser) {
        return null;
    }

    try {
        const upcomingMeeting = await MeetingService.getAllMeetings({
            sort: 'date',
            limit: 1,
        });
    
        const profile = await ProfileService.getProfile();
    
        const myAccountData: any = {
            upcomingMeeting: upcomingMeeting.length > 0 ? upcomingMeeting[0] : {},
            profile,
        };
    
        if (auth.type === AccountTypes.Type.RECRUITER) {
            const teamMembers = await CompanyService.getCompanyAccounts();
            myAccountData.teamMembers = teamMembers.slice(0, 2);
    
            const projects = await ProjectService.getProjects();
            myAccountData.projects = projects.slice(0, 3);
        }

        return {
            success: true,
            data: myAccountData,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}