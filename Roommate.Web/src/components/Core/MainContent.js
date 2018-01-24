import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Renting from '../Renting/Renting';
import Home from '../Home/Home';
import NotLoggedHomePage from '../HomePage/NotLoggedHomePage';
import Logging from '../../containers/Account/Logging';
import Registering from '../../containers/Account/Registering';
import LoggedRoute from './LoggedRoute';
import NotLoggedRoute from './NotLoggedRoute';
import HomeRoute from './HomeRoute';
import Account from '../../containers/Account/Account';
import NotFoundError from './NotFoundError';
import ChangingPassword from '../../containers/Account/ChangingPassword';
import HomeInvitation from '../../containers/Home/HomeInvitation';

const MainContent = () => (
    <div className="main">
        <Switch>
            <Route exact path="/" component={NotLoggedHomePage} />
            <NotLoggedRoute exact path="/logowanie" component={Logging} />
            <NotLoggedRoute exact path="/rejestracja" component={Registering} />
            <Route path="/wynajem" component={Renting} />
            <Route path="/odzyskiwanie-hasla" component={ChangingPassword} />
            <LoggedRoute path="/konto" component={Account} />
            <LoggedRoute path="/zaproszenie" component={HomeInvitation} />
            <HomeRoute path="/mieszkanie" component={Home} />
            <Route component={NotFoundError} />
        </Switch>
    </div>
);

export default MainContent;