import { getIsConfigurationFetching, getIsGeneratingTasks } from '../reducers/fetching';
import axios from 'axios';

export const fetchConfiguration = () => (dispatch, getState) => {
    if (getIsConfigurationFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_CONFIGURATION_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Duty/FetchConfiguration', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'FETCH_CONFIGURATION_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_CONFIGURATION_FAILURE'
            });
        });
};

export const setConfiguration = (configuration) => (dispatch, getState) => {
    return axios.post('http://localhost:50682/api/Duty/SetConfiguration', { configuration: configuration, email: localStorage.getItem('user') })
        .then(function (response) {
            dispatch({
                type: 'SET_CONFIGURATION_SUCCESS',
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const generateTasks = () => (dispatch, getState) => {
    if (getIsGeneratingTasks(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'GENERATE_TASKS_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Duty/GenerateTasks', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'GENERATE_TASKS_SUCCESS',
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'GENERATE_TASKS_FAILURE',
            });
        });
};

export const onKitchenCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_KITCHEN'
    });
};

export const onHallCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_HALL'
    });
};

export const onSalonCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_SALON'
    });
};

export const onBathroomCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_BATHROOM'
    });
};

export const onToiletCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_TOILET'
    });
};

export const onWateringPlantsCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_WATERING_PLANTS'
    });
};

export const onDishWashingCheckboxChange = () => (dispatch) => {
    dispatch({
        type: 'CHANGE_DISH_WASHING'
    });
};

export const onDishWashingDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_DISH_WASHING_DAYS',
        name: day.value,
        value: day.checked
    });
};

export const onWateringPlantsDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_WATERING_PLANTS_DAYS',
        name: day.value,
        value: day.checked
    });
};

export const onCleaningKitchenDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_KITCHEN_DAYS',
        name: day.value,
        value: day.checked
    });
};

export const onCleaningSalonDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_SALON_DAYS',
        name: day.value,
        value: day.checked
    });
};

export const onCleaningHallDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_HALL_DAYS',
        name: day.value,
        value: day.checked
    });
};

export const onCleaningBathroomDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_BATHROOM_DAYS',
        name: day.value,
        value: day.checked
    });
};

export const onCleaningToiletDayCheckboxChange = (day) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CLEANING_TOILET_DAYS',
        name: day.value,
        value: day.checked
    });
};