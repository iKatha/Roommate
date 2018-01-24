import { combineReducers } from 'redux';

const days = (state = { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true }, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.DishWashing.Days;
        case 'CHANGE_DISH_WASHING_DAYS':
            return { ...state, [action.name]: action.value }
        default:
            return state;
    }
};

const isChecked = (state = true, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.DishWashing.IsChecked;
        case 'CHANGE_DISH_WASHING':
            return !state;
        default:
            return state;
    }
};

const dishWashing = combineReducers({
    isChecked,
    days
});

export default dishWashing;