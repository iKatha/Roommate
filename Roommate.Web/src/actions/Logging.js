import { getIsFetching, getIsAnotherFetching } from '../reducers/fetching';
import axios from 'axios';


export const login = (login, password) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });

    return axios.post('http://localhost:50682/api/Account/Login', { login: login, password: password })
        .then(function (response) {
            if (response.data.Message == 'HomeAdmin') {
                localStorage.setItem('user', login);
                localStorage.setItem('homeAdmin', "homeAdmin");
                localStorage.setItem('home', "home");
                dispatch({
                    type: 'LOGIN_SUCCESS',
                });
            }
            else if (response.data.Message == 'HasHome') {
                localStorage.setItem('user', login);
                localStorage.setItem('home', "home");
                dispatch({
                    type: 'LOGIN_SUCCESS',
                });
            }
            else if (response.data.Message == 'NoHome') {
                localStorage.setItem('user', login);
                dispatch({
                    type: 'LOGIN_SUCCESS',
                });
            }
            else
                dispatch({
                    type: 'SET_LOGGING_ERROR_MESSAGE',
                    message: response.data.Message
                });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_FAILURE'
            });
        });
};

export const setEmptyLoginValuesError = () => (dispatch) => {
    dispatch({
        type: 'SET_LOGGING_ERROR_MESSAGE',
        message: "Login ani hasło nie mogą być puste."
    });
};

export const onForgottenPasswordClick = (login) => (dispatch, getState) => {
    if (getIsAnotherFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_ANOTHER_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Account/RetrivePassword', { params: {login: login}})
        .then(function (response) {
            var message;
            response.data ? message = 'Dalsze instrukcje zostały wysłane na podany adres e-mail.' : message = 'Podany adres e-mail nie istnieje.';
            dispatch({
                type: 'SET_FORGOTTEN_PASSWORD_MESSAGE',
                message: message
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_ANOTHER_FAILURE'
            });
        });
};

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('home');
    localStorage.removeItem('homeAdmin');
}

export const showModal = (response) => () => {
    respone.RoommatesWhoHaveBirthday.map(e => {
        
    });
}