import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Logging';
import { Route, Redirect, NavLink } from 'react-router-dom';
import { getForgottenPasswordMessage, getErrorMessage } from '../../reducers/Account/logging';
import { getShouldRedirect, getRedirectPath, getIsAuthNeeded } from '../../reducers/Account/authentication';
import { getIsFetching, getIsAnotherFetching } from '../../reducers/fetching';

class Logging extends React.Component {
    render() {
        let pswInput, loginInput;
        const { isAnotherLoading, shouldRedirect, redirectPath, errorMessage, isAuthNeeded, forgottenPasswordMessage, setEmptyLoginValuesError, login, isLoading, onForgottenPasswordClick} = this.props;
        if (shouldRedirect)
            return (
            <Route render={(props) => (
                    <Redirect to={redirectPath} />
            )} />
        );
        return (
            <div className="logging">
                {isAuthNeeded && <div className="logging__auth-needed"> Aby mieć dostęp do tej strony musisz być zalogowany. </div>}

                <form onSubmit={e => {
                    e.preventDefault();
                    if (!loginInput.value.trim() || !pswInput.value.trim()) {
                        setEmptyLoginValuesError();
                        return;
                    }
                    login(loginInput.value, pswInput.value);
                    pswInput.value = '';
                }}>
                    <label>Login (adres e-mail)</label>
                    <input
                        className="logging__login"
                        type="text"
                        placeholder="Login"
                        maxLength="30"
                        ref={node => {
                           loginInput = node;
                        }}
                    />
                    <label>Hasło</label>
                    <input
                        className="logging__password"
                        type="password"
                        maxLength="16"
                        ref={node => {
                            pswInput = node;
                        }}
                    />
                    {isLoading &&
                        <div className="logging__loader">
                            Trwa logowanie
                            <div className="first-dot"></div>
                            <div className="second-dot"></div>
                            <div className="third-dot"></div>
                        </div>
                    }
                    {isAnotherLoading &&
                        <div className="logging__loader">
                            Trwa próba odzyskania dostępu do konta
                            <div className="first-dot"></div>
                            <div className="second-dot"></div>
                            <div className="third-dot"></div>
                        </div>
                    }
                    {errorMessage && <div className="logging__error">{errorMessage}</div>}
                    <button type="submit">
                        Zaloguj się
                    </button>
                </form>
                <div className="logging__remind-password" onClick={() => onForgottenPasswordClick(loginInput.value)}>Nie pamiętam hasła.</div>
                {(forgottenPasswordMessage && forgottenPasswordMessage == "Dalsze instrukcje zostały wysłane na podany adres e-mail.") &&
                    <div className="logging__remind-password-message logging__remind-password-message--success">{forgottenPasswordMessage}</div>
                }
                {(forgottenPasswordMessage && forgottenPasswordMessage == "Podany adres e-mail nie istnieje.") &&
                    <div className="logging__remind-password-message logging__remind-password-message--error">{forgottenPasswordMessage}</div>
                }
                <div className = "logging__register-now">
                    Nie masz konta? <NavLink className="logging__register-now--link" path to='/rejestracja'>Zarejestruj się już dziś</NavLink>.
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        shouldRedirect: getShouldRedirect(state),
        redirectPath: getRedirectPath(state),
        errorMessage: getErrorMessage(state),
        isAuthNeeded: getIsAuthNeeded(state),
        forgottenPasswordMessage: getForgottenPasswordMessage(state),
        isLoading: getIsFetching(state),
        isAnotherLoading: getIsAnotherFetching(state),
    };
};

Logging = connect(
    mapStateToProps,
    actions
)(Logging);

export default Logging;