import { combineReducers } from 'redux';

const shouldRedirect = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return true;
        default:
            return false;
    }
};

const redirectPath = (state = "/", action) => {
    switch (action.type) {
        case 'AUTHENTICATION_NEEDED':
        case 'HOME_AUTHENTICATION_NEEDED':
            return action.redirectPath;
        case 'LOGIN_SUCCES':
            return "/";
        default:
            return state;
    }
};

const isAuthNeeded = (state = false, action) => {
    switch (action.type) {
        case 'AUTHENTICATION_NEEDED':
        case 'HOME_AUTHENTICATION_NEEDED':
            return true;
        case 'LOGIN_SUCCES':
        case 'CREATE_HOME_SUCCESS':
            return false;
        default:
            return state;
    }
};

const authentication = combineReducers({
    shouldRedirect,
    redirectPath,
    isAuthNeeded
});

export default authentication;

export const getShouldRedirect = (state) => state.account.authentication.shouldRedirect;
export const getRedirectPath = (state) => state.account.authentication.redirectPath;
export const getIsAuthNeeded = (state) => state.account.authentication.isAuthNeeded;