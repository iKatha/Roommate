import { combineReducers } from 'redux';
import renting from './Renting';
import error from './error';
import fetching from './fetching';
import account from './Account';
import home from './Home';

const app = combineReducers({
    error,
    fetching,
    renting,
    account,
    home
});

export default app;