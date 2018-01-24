import { getIsPaymentListFetching } from '../reducers/fetching';
import axios from 'axios';

export const fetchPaymentList = () => (dispatch, getState) => {
    if (getIsPaymentListFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_PAYMENT_LIST_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Payment/GetPaymentList', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'FETCH_PAYMENT_LIST_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_PAYMENT_FAILURE'
            });
        });
};

export const showMore = () => (dispatch) => {
    dispatch({
        type: 'LOAD_MORE_PAYMENTS',
    });
};

export const addPayment = (paymentForm) => (dispatch) => {
    return axios.post('http://localhost:50682/api/Payment/AddPayment', paymentForm)
        .then(function (response) {
            dispatch({
                type: 'ADD_PAYMENT',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const onCostInputBlur = (cost) => (dispatch) => {
    var regexp = /^[0-9]+([,][0-9]{1,2})?$/;
    var message = null;
    if (cost.value == null || cost.value == "") {
        cost.style.border = "1px solid red";
        message = "Pole nie może być puste.";
    } else if (!regexp.test(cost.value)) {
        message = "Błędny format.";
        cost.style.border = "1px solid red";
    } else {
        cost.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_PAYMENT_FORM",
        value: cost.value,
        name: 'TotalCost'
    });

    dispatch({
        type: "SET_PAYMENT_VALIDATION_ERROR",
        message: message
    });
}

export const onReasonInputBlur = (reason) => (dispatch) => {
    if (reason.value == null || reason.value == "") {
        reason.style.border = "1px solid red";
    }
    else 
        reason.style.border = "1px solid #30f2a0";

    dispatch({
        type: "CHANGE_PAYMENT_FORM",
        value: reason.value,
        name: 'Reason'
    });
}