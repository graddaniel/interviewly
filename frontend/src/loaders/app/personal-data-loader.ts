import { getAuth } from "../../hooks/useAuth";
import ProfileService from "../../services/profile-service";

export default async function PersonalDataLoader() {
    const auth = getAuth();
    if (!auth.currentUser) {
        return null;
    }

    try {
        const profile = await ProfileService.getProfile();

        return {
            success: true,
            profile,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}