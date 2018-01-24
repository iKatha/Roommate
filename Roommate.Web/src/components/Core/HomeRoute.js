import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { setAuthenticationNeeded, setHomeAuthenticationNeeded } from '../../actions/Authentication';

let HomeRoute = ({ location, dispatch, component: Component, ...rest }) => {
    if (localStorage.getItem("user") === null) {
        dispatch(setAuthenticationNeeded(location.pathname));
        return (
            <Route {...rest} render={(props) => (
                <Redirect to='/logowanie' />
            )} />
        );
    }

    if (location.pathname != "/mieszkanie" && localStorage.getItem("home") === null) {
        dispatch(setHomeAuthenticationNeeded(location.pathname));
        return (
            <Route {...rest} render={(props) => (
                <Redirect to='/mieszkanie' />
            )} />
        );
    }

    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )} />
    );
};

HomeRoute = withRouter(connect()(HomeRoute));

export default HomeRoute;