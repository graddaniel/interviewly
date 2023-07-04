import jwtDecode from 'jwt-decode';

// import consts from './consts.json';


// const { ROLES } = consts;

export type User = {
    email: string;
    uuid: string;
}

class Auth {
    private _currentUser: User | null;

    constructor(jwtToken: string | null) {
        this._currentUser = jwtToken ? jwtDecode(jwtToken) : null;
    }

    public get currentUser() {
        return this._currentUser;
    }

    currentUserHasRole(role) {
        return !!this._currentUser;
        // if (!this.currentUser) {
        //     return false;
        // }

        // return this.currentUser.roles.includes(role);
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

export default useAuth;