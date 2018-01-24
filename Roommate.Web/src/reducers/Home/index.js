import { combineReducers } from 'redux';
import managingUsers from './managingUsers';
import shopping from './shopping';
import announcement from './announcement';
import configuration from './configuration';
import tasks from './tasks';
import payment from './payment';

const createHomeMessage = (state = null, action) => {
    switch (action.type) {
        case 'CREATE_HOME_SUCCESS':
            return action.response;
        default:
            return null;
    }
};
const home = combineReducers({
    managingUsers,
    createHomeMessage,
    shopping,
    announcement,
    configuration,
    tasks,
    payment
});

export default home;
export const getCreateHomeMessage = (state) => state.home.createHomeMessage;