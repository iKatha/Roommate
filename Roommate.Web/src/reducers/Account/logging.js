import { combineReducers } from 'redux';

const forgottenPasswordMessage = (state = null, action) => {
    switch (action.type) {
        case 'SET_FORGOTTEN_PASSWORD_MESSAGE':
            return action.message;
        default:
            return null;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case 'SET_LOGGING_ERROR_MESSAGE':
            return action.message;
        case 'LOGIN_SUCCESS':
            return null;
        default:
            return state;
    }
};

const logging = combineReducers({
    errorMessage,
    forgottenPasswordMessage
});

export default logging;
export const getForgottenPasswordMessage = (state) => state.account.logging.forgottenPasswordMessage;
export const getErrorMessage = (state) => state.account.logging.errorMessage;
