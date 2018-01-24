import { combineReducers } from 'redux';
import locations from './locations';
import rentingFilter from './rentingFilter';
import offerts from './offerts';
import myOffert from './myOffert';

const renting = combineReducers({
    locations,
    rentingFilter,
    offerts,
    myOffert
});

export default renting;