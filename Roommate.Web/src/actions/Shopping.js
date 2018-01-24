import { getIsFetching, getIsShoppingListFetching } from '../reducers/fetching';
import axios from 'axios';

export const fetchShoppingList = () => (dispatch, getState) => {
    if (getIsShoppingListFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_SHOPPING_LIST_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Shopping/GetShoppingList', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'FETCH_SHOPPING_LIST_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_SHOPPING_FAILURE'
            });
        });
};

export const toggleItem = (id) => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Shopping/ToggleIsCompleted', { params: {id: id} })
        .then(function (response) {
            dispatch({
                type: 'TOGGLE_SHOPPING_ITEM',
                response: id
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const clearList = () => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Shopping/ClearList', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'CLEAR_SHOPPING_LIST',
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const addItem = (name) => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Shopping/AddItem', { params: {name: name, email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'ADD_SHOPPING_ITEM',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const onItemNameBlur = (name) => (dispatch) => {
    dispatch({
        type: 'ITEM_NAME_CHANGE',
        response: name
    });
};