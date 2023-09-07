import { redirect } from "react-router-dom";

import { getAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../consts/routes";
import { AccountTypes, ProfileTypes } from "shared";

export default function PermissionsCheckLoader(
    roles: ProfileTypes.Role[],
    type?: AccountTypes.Type,
) {
    return () => {
        const auth = getAuth();

        if (roles && !auth.currentUserHasRole(roles) && auth.type !== type) {
            return redirect(APP_ROUTES.MY_ACCOUNT.PATH);
        }
        
        return null;
    }
}