import { combineReducers } from 'redux';

const accountInfo = (state = null, action) => {
    switch (action.type) {
        case 'GET_ACCOUNT_INFO':
            return action.response;
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ACCOUNT_INFO_ERROR':
            return action.message;
        case 'CHANGE_ACCOUNT_INFO_SUCCESS':
            return null;
        default:
            return state;
    }
};

const successMessage = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ACCOUNT_INFO_SUCCESS':
            return action.message;
        default:
            return null;
    }
};

const accountForm = (state = { Email: localStorage.getItem('user'), Phone: null, Password: null, NewPassword: null, NewPassword2: null, Photo: null }, action) => {
    switch (action.type) {
        case 'CHANGE_ACCOUNT_FORM':
            return Object.assign({}, state, {
                [action.name]: action.value
            });
        default:
            return state;
    }
};

const validationError = (state = { Phone: null, Password: null, NewPassword: null, NewPassword2: null, Birthday: null, Phone: null }, action) => {
    switch (action.type) {
        case 'SET_ACCOUNT_VALIDATION_ERROR':
            return Object.assign({}, state, {
                [action.name]: action.message
            });
        default:
            return state;
    }
};

const accountOptions = combineReducers({
    errorMessage,
    successMessage,
    accountForm,
    validationError,
    accountInfo
});

export default accountOptions;

export const getAccountErrorMessage = (state) => state.account.accountOptions.errorMessage;
export const getAccountSuccessMessage = (state) => state.account.accountOptions.successMessage;
export const getAccountForm = (state) => state.account.accountOptions.accountForm;
export const getValidationError = (state) => state.account.accountOptions.validationError;
export const getAccountInfo = (state) => state.account.accountOptions.accountInfo;