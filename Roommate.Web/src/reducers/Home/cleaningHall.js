import { combineReducers } from 'redux';

const days = (state = { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true }, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningHall.Days;
        case 'CHANGE_CLEANING_HALL_DAYS':
            return { ...state, [action.name]: action.value }
        default:
            return state;
    }
};

const isChecked = (state = true, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningHall.IsChecked;
        case 'CHANGE_CLEANING_HALL':
            return !state;
        default:
            return state;
    }
};

const cleaningHall = combineReducers({
    isChecked,
    days
});

export default cleaningHall;