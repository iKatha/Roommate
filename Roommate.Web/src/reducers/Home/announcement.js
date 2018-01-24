import { combineReducers } from 'redux';

const announcementList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ANNOUNCEMENT_LIST_SUCCESS':
            return action.response;
        case 'ADD_ANNOUNCEMENT':
            return [action.response, ...state];
        case 'DELETE_ANNOUNCEMENT':
            return state.filter(e => e.Id!=action.response);
        default:
            return state;
    }
};

const message = (state = null, action) => {
    switch (action.type) {
        case 'MESSAGE_CHANGE':
            return action.response;
        default:
            return state;
    }
};

const charactersToUse = (state = 500, action) => {
    switch (action.type) {
        case 'MESSAGE_CHARACTERS_CHANGE':
            return action.response;
        default:
            return state;
    }
};

const announcement = combineReducers({
    announcementList,
    message,
    charactersToUse
});

export default announcement;
export const getAnnouncementList = (state) => state.home.announcement.announcementList;
export const getMessage = (state) => state.home.announcement.message;
export const getCharactersToUse = (state) => state.home.announcement.charactersToUse;
