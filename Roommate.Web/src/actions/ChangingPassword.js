import { getIsFetching } from '../reducers/fetching';
import axios from 'axios';

export const onPasswordChange = (password, password2) => (dispatch) => {
    var regexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;
    var message = null;
    if (password.value == null || password.value == '') {
        message = "To pole nie może być puste";
        password.style.border = "1px solid red";
    }
    else if (!regexp.test(password.value)) {
        message = "Hasło musi zawierać conajmniej 8 znaków, w tym liczbę, literę i znak specjalny";
        password.style.border = "1px solid red";
    }
    else {
        password.style.border = "1px solid #30f2a0";
    }
    dispatch({
        type: 'SET_CHANGE_PASSWORD_VALIDATION_ERROR',
        message: message,
        name: 'Password'
    });
    dispatch({
        type: 'CHANGE_CHANGE_PASSWORD_FORM',
        value: password.value,
        name: 'Password',
    });
    var password2Input = password.nextElementSibling;
    while (password2Input.tagName != "INPUT") {
        password2Input = password2Input.nextElementSibling;
    }
    if (password.value != password2) {
        message = "Hasła się nie zgadzają";
        password2Input.style.border = "1px solid red";
    } else {
        password2Input.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: 'SET_CHANGE_PASSWORD_VALIDATION_ERROR',
        message: message,
        name: 'Password2'
    });
};

export const onPassword2Change = (password, password2) => (dispatch) => {
    var message = null;
    if (password != password2.value) {
        message = "Hasła się nie zgadzają";
        password2.style.border = "1px solid red";
    }
    else {
        password2.style.border = "1px solid #30f2a0";
    }
    dispatch({
        type: 'SET_CHANGE_PASSWORD_VALIDATION_ERROR',
        message: message,
        name: 'Password2'
    });
    dispatch({
        type: 'CHANGE_CHANGE_PASSWORD_FORM',
        value: password2.value,
        name: 'Password2',
    });
};

export const changePassword = (changePasswordForm) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });

    return axios.post('http://localhost:50682/api/Account/SetNewPassword', changePasswordForm)
        .then(function (response) {
            if (response.data) {
                dispatch({
                    type: 'CHANGE_PASSWORD_SUCCESS',
                    message: 'Zmieniono hasło.'
                });
            }
            else
                dispatch({
                    type: 'CHANGE_PASSWORD_ERROR',
                    message: 'Nie masz uprawnień do dokonania zmiany.'
                });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_FAILURE'
            });
        });
};

export const setIdAndToken = (id, token) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CHANGE_PASSWORD_FORM',
        value: id,
        name: 'Id',
    });
    dispatch({
        type: 'CHANGE_CHANGE_PASSWORD_FORM',
        value: token,
        name: 'Token',
    });
};