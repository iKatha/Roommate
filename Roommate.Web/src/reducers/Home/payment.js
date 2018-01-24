import { combineReducers } from 'redux';

const paymentList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_PAYMENT_LIST_SUCCESS':
            return action.response;
        case 'ADD_PAYMENT':
            return [action.response, ...state];
        default:
            return state;
    }
};

const paymentForm = (state = { Email: localStorage.getItem('user'), TotalCost: null, Reason:null }, action) => {
    switch (action.type) {
        case 'CHANGE_PAYMENT_FORM':
            return Object.assign({}, state, {
                [action.name]: action.value
            });
        default:
            return state;
    }
};

const visiblePaymentNumber = (state = 10, action) => {
    switch (action.type) {
        case 'LOAD_MORE_PAYMENTS':
            var newState = state + 10;
            return newState;
        default:
            return state;
    }
};

const validationError = (state = null, action) => {
    switch (action.type) {
        case 'SET_PAYMENT_VALIDATION_ERROR':
            return action.message;
        default:
            return state;
    }
}

const payment = combineReducers({
    paymentList,
    paymentForm,
    visiblePaymentNumber,
    validationError
});

export default payment;
export const getPaymentList = (state) => state.home.payment.paymentList;
export const getPaymentForm = (state) => state.home.payment.paymentForm;
export const getVisiblePaymentNumber = (state) => state.home.payment.visiblePaymentNumber;
export const getValidationError = (state) => state.home.payment.validationError; 