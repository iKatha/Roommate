import { combineReducers } from 'redux';

const message = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_PASSWORD_SUCCESS':
        case 'CHANGE_PASSWORD_ERROR':
            return action.message;
        default:
            return null;
    }
};

const changePasswordForm = (state = { Password: null, Password2: null, Id: null, Token: null }, action) => {
    switch (action.type) {
        case 'CHANGE_CHANGE_PASSWORD_FORM':
            return Object.assign({}, state, {
                [action.name]: action.value
            });
        default:
            return state;
    }
};

const validationError = (state = { Password: null, Password2: null }, action) => {
    switch (action.type) {
        case 'SET_CHANGE_PASSWORD_VALIDATION_ERROR':
            return Object.assign({}, state, {
                [action.name]: action.message
            });
        default:
            return state;
    }
};

const changingPassword = combineReducers({
    message,
    changePasswordForm,
    validationError,
});

export default changingPassword;

export const getChangePasswordForm = (state) => state.account.changingPassword.changePasswordForm;
export const getMessage = (state) => state.account.changingPassword.message;
export const getValidationError = (state) => state.account.changingPassword.validationError;