import ProfileService from "../../services/profile-service";

export default async function AppLoader() {
    try {
        const profile = await ProfileService.getProfile();

        return {
            success: true,
            profile,
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}