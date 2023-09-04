import { getAuth } from "../../hooks/useAuth";
import ProfileService from "../../services/profile-service";

export default async function PersonalDataLoader() {
    const auth = getAuth();
    if (!auth.currentUser) {
        return null;
    }

    const profileData = await ProfileService.getProfile();

    return profileData;
}