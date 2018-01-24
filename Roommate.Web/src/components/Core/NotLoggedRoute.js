import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

let NotLoggedRoute = ({ location, dispatch, component: Component, ...rest }) => {

    if (localStorage.getItem("user") !== null) {
        return (
            <Route {...rest} render={(props) => (
                <div className="auth-for-logged-user">Strona dostępna tylko dla niezalogowanych użytkowników</div>
            )} />
        );
    }

    return (
        <Route {...rest} render={(props) => (
            <Component {...props} />
        )} />
    );
};

NotLoggedRoute = withRouter(connect()(NotLoggedRoute));

export default NotLoggedRoute;