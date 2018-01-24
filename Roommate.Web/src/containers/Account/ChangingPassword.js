import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/ChangingPassword';
import { withRouter } from 'react-router-dom';
import { getIsFetching } from '../../reducers/fetching';
import { getMessage, getValidationError, getChangePasswordForm } from '../../reducers/Account/changingPassword';
import queryString from 'query-string';

class ChangingPassword extends React.Component {

    componentDidMount() {
        const { location, setIdAndToken } = this.props;
        const queryParams = queryString.parse(location.search);
        setIdAndToken(queryParams.id, queryParams.token);
    }

    render() {
        const { isLoading, changePasswordForm, message, onPasswordChange, onPassword2Change, validationError, changePassword } = this.props;
        return (
            <div className="changing-password" >
                <form onSubmit={e => {
                    e.preventDefault();
                    changePassword(changePasswordForm);
                }}>
                    <label>Nowe hasło</label>
                    <input
                        className="changing-password__password"
                        type="password"
                        maxLength="30"
                        onBlur={event => onPasswordChange(event.target, changePasswordForm.Password2)}
                    />
                    {validationError.Password && <div className="changing-password__validation-error">{validationError.Password}</div>}

                    <label>Potwierdzenie nowego hasła</label>
                    <input
                        className="changing-password__password"
                        type="password"
                        maxLength="30"
                        onBlur={event => onPassword2Change(changePasswordForm.Password, event.target)}
                    />
                    {validationError.Password2 && <div className="changing-password__validation-error">{validationError.Password2}</div>}

                    {isLoading &&
                        <div className="three-dots-loader">
                            Trwa próba zmiany hasła
                            <div className="first-dot"></div>
                            <div className="second-dot"></div>
                            <div className="third-dot"></div>
                        </div>
                    }
                    {(message && message == 'Zmieniono hasło.') && <div className="changing-password__message changing-password__message--success">{message}</div>}
                    {(message && message == 'Nie masz uprawnień do dokonania zmiany.') && <div className="changing-password__message changing-password__message-error">{message}</div>}

                    {!validationError.Password && !validationError.Password2 && changePasswordForm.Password && changePasswordForm.Password2 ?
                        <button className="changing-password__button" type="submit">Zmień hasło.</button>
                        : <button className="changing-password__button" type="submit" disabled>Zmień hasło</button>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: getIsFetching(state),
        changePasswordForm: getChangePasswordForm(state),
        message: getMessage(state),
        validationError: getValidationError(state),
    };
};

ChangingPassword = withRouter(connect(
    mapStateToProps,
    actions
)(ChangingPassword));


export default ChangingPassword;