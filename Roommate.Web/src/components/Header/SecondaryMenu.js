import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RentingMenu from '../Renting/RentingMenu';
import HomeMenu from '../Home/HomeMenu';

const SecondaryMenu = () => (
        <Switch>
            <Route path="/wynajem" component={RentingMenu} />
            <Route path="/mieszkanie" component={HomeMenu} />
        </Switch>
);

export default SecondaryMenu;