import jwtDecode from 'jwt-decode';
import { AccountTypes, ProfileTypes } from 'shared';

// import consts from './consts.json';


export type User = {
    uuid: string;
    email: string;
    type: AccountTypes.Type; 
    companyUuid?: string;
    role?: ProfileTypes.Role;
}

class Auth {
    private _currentUser: User | null;

    constructor(jwtToken: string | null) {
        this._currentUser = jwtToken ? jwtDecode(jwtToken) : null;
    }

    public get currentUser() {
        return this._currentUser;
    }

    currentUserHasRole(roles: ProfileTypes.Role[]) {
        if (!this._currentUser) {
            return false;
        }

        const { role } = this._currentUser;
        if (!role) {
            return false;
        }    

        return roles.includes(role);
    }

    get type () {
        if (!this._currentUser) {
            return null;
        }

        return this._currentUser.type;
    }

    clearSession = () => {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('accessToken');
    }
}

const useAuth = (): Auth => {
    const jwtToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

    return new Auth(jwtToken);
}

// To decouple hook from generic auth functionality, which currently do not differ
const getAuth = () => {
    const jwtToken = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

    return new Auth(jwtToken);
}

export default useAuth;
export { getAuth };