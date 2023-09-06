import ProfileService from "../../services/profile-service";

export default async function AppLoader() {
    try {
        return {
            success: true,
            data: await ProfileService.getProfile(),
        }
    } catch (error) {
        return {
            success: false,
            error,
        }
    }
}