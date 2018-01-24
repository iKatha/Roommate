import { combineReducers } from 'redux';

const days = (state = { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true }, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningSalon.Days;
        case 'CHANGE_CLEANING_SALON_DAYS':
            return { ...state, [action.name]: action.value }
        default:
            return state;
    }
};

const isChecked = (state = true, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningSalon.IsChecked;
        case 'CHANGE_CLEANING_SALON':
            return !state;
        default:
            return state;
    }
};

const cleaningSalon = combineReducers({
    isChecked,
    days
});

export default cleaningSalon;