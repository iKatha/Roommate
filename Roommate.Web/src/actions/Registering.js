import { getIsFetching } from '../reducers/fetching';
import axios from 'axios';

export const onEmailChange = (email) => (dispatch) => {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var message = null;
    if (email.value == null || email.value == '') {
        message = "To pole nie może być puste";
        email.style.border = "1px solid red";
    }
    else if (!regexp.test(email.value)) {
        message = "Błędny adres email";
        email.style.border = "1px solid red";
    }
    else {
        email.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'Email',
    });
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
        value: email.value,
        name: 'Email',
    });
};

export const onPhoneChange = (phone) => (dispatch) => {
    var regexp = /^[0-9]{9}$/;
    var message = null;
    if (phone.value == null || phone.value == '') {
        message = "To pole nie może być puste";
        phone.style.border = "1px solid red";
    }
    else if (!regexp.test(phone.value)) {
        message = "Błędny format numeru";
        phone.style.border = "1px solid red";
    }
    else {
        phone.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'Phone',
    });
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
        value: phone.value,
        name: 'Phone',
    });
};

export const onFirstNameChange = (firstName) => (dispatch) => {
    var regexp = /^[a-zA-Z|ą|ę|ż|ź|ń|ć|ó|ś|ł|Ą|Ę|Ż|Ź|Ń|Ć|Ó|Ś|Ł]{2,30}$/;
    var message = null;
    if (firstName.value == null || firstName.value == '') {
        message = "To pole nie może być puste";
        firstName.style.border = "1px solid red";
    }
    else if (!regexp.test(firstName.value)) {
        message = "Błędna nazwa";
        firstName.style.border = "1px solid red";
    }
    else {
        firstName.style.border = "1px solid #30f2a0";
    }
    dispatch({
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'FirstName'
    });
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
        value: firstName.value,
        name: 'FirstName',
    });
};

export const onBirthdayChange = (dateObject) => (dispatch) => {
    var date = dateObject.format('L');
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
        value: date,
        name: 'Birthday',
    });
};

export const onBirthdayBlur = (date) => (dispatch) => {
    var regexp = /(^(((0[1-9]|[12][0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

    var message = null;
    if (date.value == null || date.value == '') {
        message = "To pole nie może być puste";
        date.style.border = "1px solid red";
        date.parentElement.parentElement.parentElement.style.display = "inline-block";
    } else {
        date.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'Birthday'
    });
};

export const onLastNameChange = (lastName) => (dispatch) => {
    var regexp = /^[a-zA-Z|ą|ę|ż|ź|ń|ć|ó|ś|ł|Ą|Ę|Ż|Ź|Ń|Ć|Ó|Ś|Ł]{2,30}$/;
    var message = null;
    if (lastName.value == null || lastName.value == '') {
        message = "To pole nie może być puste";
        lastName.style.border = "1px solid red";
    }
    else if (!regexp.test(lastName.value)) {
        message = "Błędna nazwa";
        lastName.style.border = "1px solid red";
    }
    else {
        lastName.style.border = "1px solid #30f2a0";
    }
    dispatch({
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'LastName'
    });
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
        value: lastName.value,
        name: 'LastName',
    });
};

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
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'Password'
    });
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
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
        type: 'SET_REGISTERING_VALIDATION_ERROR',
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
        type: 'SET_REGISTERING_VALIDATION_ERROR',
        message: message,
        name: 'Password2'
    });
    dispatch({
        type: 'CHANGE_REGISTERING_FORM',
        value: password2.value,
        name: 'Password2',
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
            type: 'SET_REGISTERING_VALIDATION_ERROR',
            message: message
        });
    } else if (photoSize > 2000000) {
        input.nextElementSibling.style.border = "1px solid red";
        input.nextElementSibling.innerText = '';
        message = "Plik nie może być większy niż 250Kb.";
        dispatch({
            type: 'SET_REGISTERING_VALIDATION_ERROR',
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
                type: 'CHANGE_REGISTERING_FORM',
                value: dataURL,
                name: 'Photo'
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
}

export const register = (registerForm) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }
    dispatch({
        type: 'FETCH_REQUEST'
    });

    return axios.post('http://localhost:50682/api/Account/Register', registerForm)
        .then(function (response) {
            if (response.data == "Zarejestrowano") {
                dispatch({
                    type: 'REGISTRATION_SUCCESS',
                    message: "Rejestracja zakończona sukcesem. \n Na podany adres e-mail został wysłany link aktywacyjny."
                });
            }
            else
                dispatch({
                    type: 'REGISTRATION_ERROR',
                    message: response.data
                });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_FAILURE'
            });
        });
};