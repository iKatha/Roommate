﻿import { combineReducers } from 'redux';

const days = (state = { Monday: true, Tuesday: true, Wednesday: true, Thursday: true, Friday: true, Saturday: true, Sunday: true }, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningBathroom.Days;
        case 'CHANGE_CLEANING_BATHROOM_DAYS':
            return { ...state, [action.name]: action.value }
        default:
            return state;
    }
};

const isChecked = (state = true, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_SUCCESS':
            return action.response.CleaningBathroom.IsChecked;
        case 'CHANGE_CLEANING_BATHROOM':
            return !state;
        default:
            return state;
    }
};

const cleaningBathroom = combineReducers({
    isChecked,
    days
});

export default cleaningBathroom;