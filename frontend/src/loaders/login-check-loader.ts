import { redirect } from "react-router-dom";

import { getAuth } from "../hooks/useAuth";
import ROUTES from "../consts/routes";

export default function LoginCheckLoader() {
    const auth = getAuth();
    if (!auth.currentUser) {
        return redirect(ROUTES.LOG_IN.PATH);
    }
    
    return null;
}