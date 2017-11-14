import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Renting from '../Renting/Renting';

const Main = () => (
    <div >
        <Switch>
            <Route path="/wynajem" component={Renting} />
        </Switch>
    </div>
);

export default Main;