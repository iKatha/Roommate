import React from "react";
import AllOfferts from './AllOfferts';
import MyChosenOffert from './MyChosenOffert';
import MyOfferts from './MyOfferts';
import ChosenOffert from './ChosenOffert';
import { Switch, Route } from 'react-router-dom';

const Renting = () => (
    <Switch>
        <Route exact path="/wynajem" component={AllOfferts} />
        <Route exact path="/wynajem/moje-oferty" component={MyOfferts} />
        <Route path="/wynajem/moje-oferty/:id" component={MyChosenOffert} /> 
        <Route path="/wynajem/:id" component={ChosenOffert} />
    </Switch>
);

export default Renting;