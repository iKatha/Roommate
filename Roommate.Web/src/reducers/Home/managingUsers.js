import { combineReducers } from 'redux';

const roommates = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ROOMMATES_SUCCESS':
            return action.response;
        case 'KICK_ROOMMATE':
            const list = state;
            return list.filter(e =>e.Email != action.email);
        default:
            return state;
    }
};

const invitationLink = (state = null, action) => {
    switch (action.type) {
        case 'CREATE_INVITATION_LINK':
            return action.response;
        default:
            return null;
    }
};

const kickRoommateMessage = (state = null, action) => {
    switch (action.type) {
        case 'KICK_ROOMMATE':
            return action.response;
        default:
            return null;
    }
};

const leaveHomeMessage = (state = null, action) => {
    switch (action.type) {
        case 'LEAVE_HOME':
            return action.response;
        default:
            return null;
    }
};

const changeAdminMessage = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ADMIN':
            return action.response;
        default:
            return null;
    }
};

const joinHomeMessage = (state = null, action) => {
    switch (action.type) {
        case 'JOIN_HOME_MESSAGE':
            return action.response;
        default:
            return null;
    }
};

const joinHomeForm = (state = { HomeId: null, Token: null, Email: localStorage.getItem('user') }, action) => {
    switch (action.type) {
        case 'CHANGE_JOIN_HOME_FORM':
            return Object.assign({}, state, {
                [action.name]: action.value
            });
        default:
            return state;
    }
};

const managingUsers = combineReducers({
    roommates,
    invitationLink,
    leaveHomeMessage,
    kickRoommateMessage,
    changeAdminMessage,
    joinHomeMessage,
    joinHomeForm,
});

export default managingUsers;
export const getRoommates = (state) => state.home.managingUsers.roommates;
export const getInvitationLink = (state) => state.home.managingUsers.invitationLink;
export const getLeaveHomeMessage = (state) => state.home.managingUsers.leaveHomeMessage;
export const getKickRoommateMessage = (state) => state.home.managingUsers.kickRoommateMessage;
export const getChangeAdminMessage = (state) => state.home.managingUsers.changeAdminMessage;
export const getJoinHomeMessage = (state) => state.home.managingUsers.joinHomeMessage;
export const getJoinHomeForm = (state) => state.home.managingUsers.joinHomeForm;