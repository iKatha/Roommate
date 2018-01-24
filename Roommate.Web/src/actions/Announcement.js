import {getIsAnnouncementListFetching } from '../reducers/fetching';
import axios from 'axios';

export const fetchAnnouncementList = () => (dispatch, getState) => {
    if (getIsAnnouncementListFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_ANNOUNCEMENT_LIST_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Announcement/GetAnnouncementList', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'FETCH_ANNOUNCEMENT_LIST_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_ANNOUNCEMENT_FAILURE'
            });
        });
};

export const addAnnouncement = (message) => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Announcement/AddAnnouncement', { params: { message: message, email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'ADD_ANNOUNCEMENT',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const deleteAnnouncement = (id) => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Announcement/DeleteAnnouncement', { params: { id: id } })
        .then(function (response) {
            dispatch({
                type: 'DELETE_ANNOUNCEMENT',
                response: id
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const onMessageBlur = (message) => (dispatch) => {
    dispatch({
        type: 'MESSAGE_CHANGE',
        response: message
    });
};

export const onMessageChange = (message) => (dispatch) => {
    var charactersLeft = 500 - message.length;
    dispatch({
        type: "MESSAGE_CHARACTERS_CHANGE",
        response: charactersLeft
    });
};