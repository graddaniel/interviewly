import { redirect } from "react-router-dom";

import { getAuth } from "../hooks/useAuth";
import { APP_ROUTES } from "../consts/routes";

export default function PermissionsCheckLoader(roles) {
    return () => {
        const auth = getAuth();

        if (roles && !auth.currentUserHasRole(roles)) {
            return redirect(APP_ROUTES.MY_ACCOUNT.PATH);
        }
        
        return null;
    }
}