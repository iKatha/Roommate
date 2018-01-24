import { combineReducers } from 'redux';

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case 'REGISTRATION_ERROR':
            return action.message;
        case 'REGISTRATION_SUCCESS':
            return null;
        default:
            return state;
    }
};

const successMessage = (state = null, action) => {
    switch (action.type) {
        case 'REGISTRATION_SUCCESS':
            return action.message;
        default:
            return null;
    }
};

const registerForm = (state = { FirstName: null, LastName: null, Email: null,Phone:null, Password: null, Password2: null, Birthday: null, Photo: null }, action) => {
    switch (action.type) {
        case 'CHANGE_REGISTERING_FORM':
            return Object.assign({}, state, {
                [action.name]: action.value
            });
        default:
            return state;
    }
};

const validationError = (state = {FirstName: null, LastName: null, Email: null, Phone: null,Password: null, Password2: null, Birthday: null, Phone: null}, action) => {
    switch (action.type) {
        case 'SET_REGISTERING_VALIDATION_ERROR':
            return Object.assign({}, state, {
                [action.name] : action.message
            });
        default:
            return state;
    }
};

const registering = combineReducers({
    errorMessage,
    successMessage,
    registerForm,
    validationError,
});

export default registering;

export const getRegisteringErrorMessage = (state) => state.account.registering.errorMessage;
export const getRegisteringSuccessMessage = (state) => state.account.registering.successMessage;
export const getRegisterForm = (state) => state.account.registering.registerForm;
export const getValidationError = (state) => state.account.registering.validationError;