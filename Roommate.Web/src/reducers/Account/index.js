import { combineReducers } from 'redux';
import logging from './logging';
import authentication from './authentication';
import registering from './registering';
import changingPassword from './changingPassword';
import accountOptions from './accountOptions';


const account = combineReducers({
    logging,
    authentication,
    registering,
    changingPassword,
    accountOptions
});

export default account;