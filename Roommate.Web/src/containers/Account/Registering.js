import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Registering';
import { Redirect, NavLink } from 'react-router-dom';
import { getRegisteringSuccessMessage, getRegisteringErrorMessage, getRegisterForm, getValidationError } from '../../reducers/Account/registering';
import { getIsFetching } from '../../reducers/fetching';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Registering extends React.Component {
    render() {
        const { register, registerForm, isValid, onEmailChange, onFirstNameChange, onLastNameChange, onPasswordChange, onPassword2Change, validationError, errorMessage, successMessage, onPhoneChange, isLoading, onBirthdayChange, onBirthdayBlur, onPhotoChange } = this.props;
        return (
            <div className="registering">
                <form onSubmit={e => {
                    e.preventDefault();
                    register(registerForm);
                }}>
                    <label className="registering__label">Imię</label>
                    <input className="registering__input registering__name" type="text" maxLength="16" onBlur={event => onFirstNameChange(event.target)} />
                    {validationError.FirstName && <div className="registering__validation-error">{validationError.FirstName}</div>}

                    <label className="registering__label">Nazwisko</label>
                    <input className="registering__input registering__name" type="text" maxLength="16" onBlur={event => onLastNameChange(event.target)} />
                    {validationError.LastName && <div className="registering__validation-error">{validationError.LastName}</div>}

                    <label className="registering__label">E-mail</label>
                    <input className="registering__input registering__email" type="text" maxLength="30" onBlur={event => onEmailChange(event.target)} />
                    {validationError.Email && <div className="registering__validation-error">{validationError.Email}</div>}

                    <label className="registering__label">Numer telefonu komórkowego</label>
                    <div data-tip="Musi zawierać 9 znaków.">
                        <input className="registering__input registering__phone" type="text" maxLength="30" onBlur={event => onPhoneChange(event.target)} />
                        {validationError.Phone && <div className="registering__validation-error">{validationError.Phone}</div>}
                    </div>

                    <label className="registering__label">Data urodzenia</label>
                    <div data-tip="Użytkownik musi mieć co najmniej 18 lat. Wymagany format to dd/mm/yyyy">
                        <DatePicker onChange={(date) => onBirthdayChange(date)}
                            onBlur={(event) => onBirthdayBlur(event.target)}
                            className="registering__date registering__input"
                            dateFormat="YYYY-MM-DD"
                            value={registerForm.Birthday}
                            minDate={moment().subtract(100, "years")}
                            maxDate={moment().subtract(18, "years")}
                            readOnly
                        />
                        {validationError.Birthday && <div className="registering__validation-error">{validationError.Birthday}</div>}
                    </div>

                    <label className="registering__label">Zdjęcie</label>
                    {registerForm.Photo && <img src={registerForm.Photo} className="registering__photo-image" />}
                    <div data-tip="Maksymalna wielkość zdjęcia to 250Kb.">
                        <input id="photo" className="registering__photo" type="file" accept="image/*" onChange={event => onPhotoChange(event.target)} />
                        <label htmlFor="photo"></label>
                        {validationError.Photo && <div className="registering__validation-error">{validationError.Photo}</div>}
                    </div>

                    <label className="registering__label">Hasło</label>
                    <div data-tip="Musi składać się z co najmniej 8 znaków, w tym z litery, liczby i znaku specjalnego.">
                        <input className="registering__input registering__password" type="password" maxLength="16" onBlur={event => onPasswordChange(event.target, registerForm.Password2)} />
                        {validationError.Password && <div className="registering__validation-error">{validationError.Password}</div>}
                    </div>
                    

                    <label className="registering__label">Potwierdzenie hasła</label>
                    <input className="registering__input registering__password" type="password" maxLength="16" onBlur={event => onPassword2Change(registerForm.Password, event.target)} />
                    {validationError.Password2 && <div className="registering__validation-error">{validationError.Password2}</div>}

                    {errorMessage && <div className="registering__error-message">{errorMessage}</div>}
                    {successMessage && <div className="registering__success-message">{successMessage}</div>}

                    {isLoading &&
                        <div className="registering__loader">
                            Trwa rejestracja
                            <div className="first-dot"></div>
                            <div className="second-dot"></div>
                            <div className="third-dot"></div>
                        </div>
                    }

                    {!validationError.Birthday && !validationError.LastName && !validationError.FirstName && !validationError.Email && !validationError.Phone && !validationError.Password2 && !validationError.Password && registerForm.FirstName && registerForm.LastName && registerForm.Email && registerForm.Password && registerForm.Password2 && registerForm.Phone && registerForm.Birthday?
                        <button className="registering__button" type="submit">Zarejestruj</button>
                        : <button className="registering__button" type="submit" disabled>Zarejestruj</button>
                    }
                </form>
                
            </div> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        successMessage: getRegisteringSuccessMessage(state),
        errorMessage: getRegisteringErrorMessage(state),
        registerForm: getRegisterForm(state),
        validationError: getValidationError(state),
        isLoading: getIsFetching(state)
    };
};

Registering = connect(
    mapStateToProps,
    actions
)(Registering);

export default Registering;