import { AccountTypes } from "shared";
import { getAuth } from "../../hooks/useAuth";
import MeetingService from "../../services/meeting-service";
import ProfileService from "../../services/profile-service";
import CompanyService from "../../services/company-service";
import ProjectService from "../../services/project-service";
import promisesMap from "../../utils/promises-map";

export default async function MyAccountLoader() {
    const auth = getAuth();
    if (!auth.currentUser) {
        return null;
    }

    try {
        const dataRequests = {
            upcomingMeeting: MeetingService.getAllMeetings({
                sort: 'date',
                limit: 1,
            }),
            profile: ProfileService.getProfile(),
        } as any;

        if (auth.type === AccountTypes.Type.RECRUITER) {
            dataRequests.teamMembers = await CompanyService.getCompanyAccounts();
            dataRequests.projects = await ProjectService.getProjects();
        }

        const myAccountRawData = await promisesMap(dataRequests) as any;
    
    
        const myAccountData: any = {
            upcomingMeeting: myAccountRawData.upcomingMeeting.length > 0
                ? myAccountRawData.upcomingMeeting[0]
                : {},
            profile: myAccountRawData.profile,
        };
    
        if (auth.type === AccountTypes.Type.RECRUITER) {
            myAccountData.teamMembers = myAccountRawData.teamMembers.slice(0, 2);
                myAccountData.projects = myAccountRawData.projects.slice(0, 3);
        }

        return {
            success: true,
            ...myAccountData,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}