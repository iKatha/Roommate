import { combineReducers } from 'redux';

const allOfferts = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_OFFERTS_SUCCESS':
            return action.response;
        default:
            return state;
    }
}

const myOfferts = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_MY_OFFERTS_SUCCESS':
            return action.response;
        case 'DELETE_OFFERT':
            return state.filter(e => e.Id != action.response);
        default:
            return state;
    }
}

const offertInfo = (state = null, action) => {
    switch (action.type) {
        case 'GET_MY_OFFERT':
            return action.response;
        default:
            return state;
    }
};

const chosenOffert = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_CHOSEN_OFFERT_SUCCESS':
            return action.response;
        default:
            return state;
    }
};

const offerts = combineReducers({
    allOfferts,
    myOfferts,
    offertInfo,
    chosenOffert
});

export default offerts;

export const getAllOfferts = (state) => state.renting.offerts.allOfferts;
export const getMyOfferts = (state) => state.renting.offerts.myOfferts;
export const getOffertInfo = (state) => state.renting.offerts.offertInfo;
export const getChosenOffert = (state) => state.renting.offerts.chosenOffert;