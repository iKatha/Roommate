import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Account';
import { getIsFetching, getIsAnotherFetching } from '../../reducers/fetching';
import { getAccountSuccessMessage, getAccountErrorMessage, getAccountForm, getValidationError, getAccountInfo } from '../../reducers/Account/accountOptions';

class Account extends React.Component {
    componentDidMount() {
        const { fetchAccountInfo } = this.props;
        fetchAccountInfo(localStorage.getItem('user'));
    }

    render() {
        const { successMessage, errorMessage, accountForm, validationError, isLoading, isAnotherLoading, account, onPhoneChange, onPhotoChange, onNewPassword2Change, onNewPasswordChange, onPasswordChange, changeAccountInfo } = this.props;
        if (!isLoading && account != null)
            return (
                <div className="account">
                    <form onSubmit={e => {
                        e.preventDefault();
                        changeAccountInfo(accountForm);
                    }}>
                        <label className="account__label">Numer telefonu komórkowego</label>
                        <div data-tip="Musi zawierać 9 znaków.">
                            <input className="account__input account__phone" type="text" maxLength="30" defaultValue={account.Phone} onBlur={event => onPhoneChange(event.target)} />
                            {validationError.Phone && <div className="account__validation-error">{validationError.Phone}</div>}
                        </div>

                        <label className="account__label">Zdjęcie</label>
                        {(accountForm.Photo && <img src={accountForm.Photo} className="account__photo-image" />) || (account.Photo && <img src={account.Photo} className="account__photo-image" />) || <img src="./images/unknown-photo.png" className="account__photo-image" />}
                        <div data-tip="Maksymalna wielkość zdjęcia to 250Kb.">
                            <input id="account-photo" className="account__photo" type="file" accept="image/*" onChange={event => onPhotoChange(event.target)} />
                            <label htmlFor="account-photo"></label>
                            {validationError.Photo && <div className="account__validation-error">{validationError.Photo}</div>}
                        </div>

                        <label className="account__label">Stare hasło</label>
                        <input className="account__input account__password" type="password" maxLength="16" id="account-old-password" onBlur={event => onPasswordChange(accountForm.NewPassword, event.target)}/>
                        {validationError.Password && <div className="account__validation-error">{validationError.Password}</div>}

                        <label className="account__label">Nowe hasło</label>
                        <div data-tip="Musi składać się z co najmniej 8 znaków, w tym z litery, liczby i znaku specjalnego.">
                            <input className="account__input account__password" type="password" maxLength="16" onBlur={event => onNewPasswordChange(accountForm.Password, event.target ,accountForm.NewPassword2)} />
                            {validationError.NewPassword && <div className="account__validation-error">{validationError.NewPassword}</div>}
                        </div>


                        <label className="account__label">Potwierdzenie hasła</label>
                        <input className="account__input account__password" type="password" maxLength="16" onBlur={event => onNewPassword2Change(accountForm.NewPassword, event.target)} id="account-new-password2"/>
                        {validationError.NewPassword2 && <div className="account__validation-error">{validationError.NewPassword2}</div>}
                  

                        {errorMessage && <div className="account__error-message">{errorMessage}</div> }
                        { successMessage && <div className="account__success-message">{successMessage}</div> }

                        { isAnotherLoading &&
                            <div className="account__loader account__loader--change-account">
                            Trwa próba zmiany danych
                            <div className="first-dot"></div>
                            <div className="second-dot"></div>
                            <div className="third-dot"></div>
                        </div>
                        }

                        {!validationError.Phone && !validationError.Photo && !validationError.Password && !validationError.NewPassword && !validationError.NewPassword && (accountForm.Photo || accountForm.Phone || accountForm.NewPassword)?
                        <button className="account__button" type="submit">Zarejestruj</button>
                        : <button className="account__button" type="submit" disabled>Zarejestruj</button>
                        }
                    </form >
                </div>
            );
        else
            return (
                <div className="account__loader">
                    Loading
                        <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
    }
};

const mapStateToProps = (state) => {
    return {
        successMessage: getAccountSuccessMessage(state),
        errorMessage: getAccountErrorMessage(state),
        accountForm: getAccountForm(state),
        validationError: getValidationError(state),
        isLoading: getIsFetching(state),
        isAnotherLoading: getIsAnotherFetching(state),
        account: getAccountInfo(state)
    };
};

Account = connect(
    mapStateToProps,
    actions
)(Account);

export default Account;