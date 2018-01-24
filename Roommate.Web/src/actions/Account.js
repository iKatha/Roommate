import { getIsFetching, getIsAnotherFetching } from '../reducers/fetching';
import axios from 'axios';

export const fetchAccountInfo = (login) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });
   
    return axios.get('http://localhost:50682/api/Account/GetAccountInfo', { params: { login: login } })
        .then(function (response) {
                dispatch({
                    type: 'GET_ACCOUNT_INFO',
                    response: response.data
                });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_FAILURE'
            });
        });
};

export const onPhotoChange = (input) => (dispatch) => {
    var message = null;
    var fileType = input.files[0].type;
    var photoName = input.files[0].name;
    var photoSize = input.files[0].size;
    if (fileType.indexOf('image') == -1) {
        input.nextElementSibling.style.border = "1px solid red";
        input.nextElementSibling.innerText = '';
        message = "Błędny format pliku.";
        dispatch({
            type: 'SET_ACCOUNT_VALIDATION_ERROR',
            message: message
        });
    } else if (photoSize > 7200000) {
        input.nextElementSibling.style.border = "1px solid red";
        input.nextElementSibling.innerText = '';
        message = "Plik nie może być większy niż 900Kb.";
        dispatch({
            type: 'SET_ACCOUNT_VALIDATION_ERROR',
            name: 'Photo',
            message: message
        });
    } else {
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            input.nextElementSibling.style.border = "1px solid #30f2a0";
            input.nextElementSibling.innerText = photoName;
            dispatch({
                type: 'CHANGE_ACCOUNT_FORM',
                value: dataURL,
                name: 'Photo',
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}

export const onPhoneChange = (phone) => (dispatch) => {
    var regexp = /^[0-9]{9}$/;
    var message = null;
    if (!regexp.test(phone.value)) {
        message = "Błędny format numeru";
        phone.style.border = "1px solid red";
    }
    else {
        phone.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: 'SET_ACCOUNT_VALIDATION_ERROR',
        message: message,
        name: 'Phone',
    });
    dispatch({
        type: 'CHANGE_ACCOUNT_FORM',
        value: phone.value,
        name: 'Phone',
    });
};

export const onNewPasswordChange = (oldPassword, newPassword, newPassword2) => (dispatch) => {
    var regexp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,30}$/;
    var oldPasswordMessage = null;
    var newPasswordMessage = null;
    var newPassword2Message = null;

    if (newPassword.value == null || newPassword.value == "") {
        var newPassword2Input = document.getElementById('account-new-password2');
        var oldPasswordInput = document.getElementById('account-old-password');
        newPassword.style.border = "none";
        newPassword2Input.style.border = "none";
        oldPasswordInput.style.border = "none";
    }else if (!regexp.test(newPassword.value)) {
        newPasswordMessage = "Hasło musi zawierać co najmniej 8 znaków, w tym liczbę, literę i znak specjalny";
        newPassword.style.border = "1px solid red";
    } else {
        newPassword.style.border = "1px solid #30f2a0";
    }
    if (newPassword.value != null && newPassword.value != "") {
        if (oldPassword == null || oldPassword == "") {
            oldPasswordMessage = "Należy podać stare hasło";
            var oldPasswordInput = document.getElementById('account-old-password');
            oldPasswordInput.style.border = "1px solid red";
        }
        if (newPassword2 != newPassword.value) {
            newPassword2Message = "Hasła muszą się zgadzać.";
            var newPassword2Input = document.getElementById('account-new-password2');
            newPassword2Input.style.border = "1px solid red";
        } else {
            var newPassword2Input = document.getElementById('account-new-password2');
            newPassword2Input.style.border = "1px solid #30f2a0";
        }
    }
    dispatch({
        type: 'CHANGE_ACCOUNT_FORM',
        value: newPassword.value,
        name: 'NewPassword',
    });
    dispatch({
        type: 'SET_ACCOUNT_VALIDATION_ERROR',
        message: newPasswordMessage,
        name: 'NewPassword',
    });
    dispatch({
        type: 'SET_ACCOUNT_VALIDATION_ERROR',
        message: newPassword2Message,
        name: 'NewPassword2',
    });
    dispatch({
        type: 'SET_ACCOUNT_VALIDATION_ERROR',
        message: oldPasswordMessage,
        name: 'Password',
    });
};

export const onNewPassword2Change = (newPassword, newPassword2) => (dispatch) => {
    var message = null;
    if (newPassword != null && newPassword != "") {
        if (newPassword2.value != newPassword) {
            newPassword2.style.border = "1px solid red";
            message ="Hasła muszą się zgadzać."
        } else {
            newPassword2.style.border = "1px solid #30f2a0";
        }
    } else {
        newPassword2.style.border = "none";
    }
    dispatch({
        type: 'SET_ACCOUNT_VALIDATION_ERROR',
        message: message,
        name: 'NewPassword2',
    });
    dispatch({
        type: 'CHANGE_ACCOUNT_FORM',
        value: newPassword2.value,
        name: 'NewPassword2',
    });
};

export const onPasswordChange = (newPassword, oldPassword) => (dispatch) => {
    var message = null;
    if (newPassword != null && newPassword != "") {
        if (oldPassword.value == null || oldPassword.value == '') {
            oldPassword.style.border = "1px solid red";
            message = "Należy podać stare hasło";
        } else {
            oldPassword.style.border = "1px solid #30f2a0";
        }
    } else {
        oldPassword.style.border = "none";
    }
    dispatch({
        type: 'SET_ACCOUNT_VALIDATION_ERROR',
        message: message,
        name: 'Password',
    });
    dispatch({
        type: 'CHANGE_ACCOUNT_FORM',
        value: oldPassword.value,
        name: 'Password',
    });
};

export const changeAccountInfo = (accountForm) => (dispatch, getState) => {

    if (getIsAnotherFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_ANOTHER_REQUEST'
    });

    return axios.post('http://localhost:50682/api/Account/ChangeAccountInfo', accountForm)
        .then(function (response) {
            if (response.data == "Zmiany w koncie zostały zapisane.")
                dispatch({
                    type: 'CHANGE_ACCOUNT_INFO_SUCCESS',
                    message: response.data
                });
            else
                dispatch({
                    type: 'CHANGE_ACCOUNT_INFO_ERROR',
                    message: response.data
                });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_ANOTHER_FAILURE'
            });
        });
}
