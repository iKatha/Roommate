import { combineReducers } from 'redux';

const days = (state = { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true }, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.WateringPlants.Days;
        case 'CHANGE_WATERING_PLANTS_DAYS':
            return { ...state, [action.name]: action.value }
        default:
            return state;
    }
};

const isChecked = (state = true, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.WateringPlants.IsChecked;
        case 'CHANGE_WATERING_PLANTS':
            return !state;
        default:
            return state;
    }
};

const wateringPlants = combineReducers({
    isChecked,
    days
});

export default wateringPlants;