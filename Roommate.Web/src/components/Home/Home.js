import React from "react";
import { Switch, Route } from 'react-router-dom';
import HomeMain from '../../containers/Home/HomeMain';
import Roommates from '../../containers/Home/Roommates';
import ShoppingList from '../../containers/Home/ShoppingList';
import Payment from '../../containers/Home/Payment';
import Configuration from '../../containers/Home/Configuration';
import Tasks from '../../containers/Home/Tasks';


const Home = () => (
    <div>
        <Switch>
            <Route exact path="/mieszkanie" component={HomeMain} />
            <Route exact path="/mieszkanie/mieszkancy" component={Roommates} />
            <Route exact path="/mieszkanie/zakupy" component={ShoppingList} />
            <Route exact path="/mieszkanie/rachunki" component={Payment} />
            <Route exact path="/mieszkanie/konfiguracja" component={Configuration} />
            <Route exact path="/mieszkanie/konfiguracja" component={Configuration} />
            <Route exact path="/mieszkanie/grafik" component={Tasks} />
        </Switch>
    </div>
);

export default Home;