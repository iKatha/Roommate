import { combineReducers } from 'redux';

const days = (state = { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true }, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningKitchen.Days;
        case 'CHANGE_CLEANING_KITCHEN_DAYS':
            return {...state, [action.name]: action.value}
        default:
            return state;
    }
};

const isChecked = (state = true, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningKitchen.IsChecked;
        case 'CHANGE_CLEANING_KITCHEN':
            return !state;
        default:
            return state;
    }
};

const cleaningKitchen = combineReducers({
    isChecked,
    days
});

export default cleaningKitchen;