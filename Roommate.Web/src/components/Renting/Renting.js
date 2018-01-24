import React from "react";
import AllOfferts from './AllOfferts';
import MyOfferts from '../../containers/Renting/MyOfferts';
import ChosenOffert from '../../containers/Renting/ChosenOffert';
import { Switch, Route } from 'react-router-dom';
import NewOffert from '../../containers/Renting/NewOffert';

const Renting = () => (
    <div>
        <Switch>
            <Route exact path="/wynajem/moje-oferty/nowa-oferta" component={NewOffert} />
            <Route exact path="/wynajem/moje-oferty" component={MyOfferts} />
            <Route exact path="/wynajem/:pageNumber?" component={AllOfferts} />
            <Route path="/wynajem/oferta/:id" component={ChosenOffert} />
        </Switch>
    </div>
);

export default Renting;