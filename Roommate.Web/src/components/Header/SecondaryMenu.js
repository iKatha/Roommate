import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RentingMenu from '../Renting/RentingMenu'

const SecondaryMenu = () => (
        <Switch>
            <Route path = "/wynajem" component = {RentingMenu} />
        </Switch>
);

export default SecondaryMenu;