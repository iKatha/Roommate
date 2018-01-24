import { combineReducers } from 'redux';
import cleaningToilet from './cleaningToilet';
import cleaningKitchen from './cleaningKitchen';
import cleaningHall from './cleaningHall';
import cleaningBathroom from './cleaningBathroom';
import cleaningSalon from './cleaningSalon';
import dishWashing from './dishWashing';
import wateringPlants from './wateringPlants';

const cleaning = combineReducers({
    cleaningKitchen,
    cleaningToilet,
    cleaningBathroom,
    cleaningSalon,
    cleaningHall
});

const configurationMessage = (state = null, action) => {
    switch (action.type) {
        case 'SET_CONFIGURATION_SUCCESS':
            return "Ustawienia zostały zapisane.";
        default:
            return null;
    }
};

const tasksMessage = (state = null, action) => {
    switch (action.type) {
        case 'GENERATE_TASKS_SUCCESS':
            return "Grafik został wygenerowany.";
        default:
            return null;
    }
};

const configuration = combineReducers({
    cleaning,
    dishWashing,
    wateringPlants,
    configurationMessage,
    tasksMessage
});

export default configuration;
export const getConfiguration = (state) => state.home.configuration;