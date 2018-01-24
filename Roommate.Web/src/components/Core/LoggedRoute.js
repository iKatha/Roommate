import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { setAuthenticationNeeded } from '../../actions/Authentication';

let LoggedRoute = ({location, dispatch, component: Component, ...rest }) => {
    if (localStorage.getItem("user") === null) {
        dispatch(setAuthenticationNeeded(location.pathname));
        return (
            <Route {...rest} render={(props) => (
                <Redirect to='/logowanie' />
            )} />
        );
    }

    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )} />
    );
};

LoggedRoute = withRouter(connect()(LoggedRoute));

export default LoggedRoute;