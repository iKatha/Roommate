import { getIsFetching, getIsAnotherFetching, getAreRoommatesFetching} from '../reducers/fetching';
import axios from 'axios';

export const fetchRoommates = () => (dispatch, getState) => {
    if (getAreRoommatesFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_ROOMMATES_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Home/GetRoommates', { params: {email : localStorage.getItem('user')}})
        .then(function (response) {
            dispatch({
                type: 'FETCH_ROOMMATES_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_ROOMMATES_FAILURE'
            });
        });
};

export const createHome = () => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Home/CreateHome', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            localStorage.setItem('homeAdmin', "homeAdmin");
            localStorage.setItem('home', "home");
            dispatch({
                type: 'CREATE_HOME_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'CREATE_HOME_FAILURE',
            });
            console.log(error);
        });
};

export const inviteRoommate = () => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Home/CreateInvitationLink', {params: { email: localStorage.getItem('user') }})
        .then(function (response) {
            dispatch({
                type: 'CREATE_INVITATION_LINK',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const changeAdmin = (newAdminEmail) => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Home/ChangeAdmin', { params: { adminEmail: localStorage.getItem('user'), newAdminEmail: newAdminEmail } })
        .then(function (response) {
            localStorage.removeItem('homeAdmin');
            dispatch({
                type: 'CHANGE_ADMIN',
                response: "Admin zmieniony."
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const leaveHome = () => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Home/LeaveHome', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            if (response.data=="Aby opuścić grupę musisz przekazać admina innemu współlokatorowi.") {
                dispatch({
                    type: 'LEAVE_HOME',
                    response: response.data
                });
            } else {
                localStorage.removeItem('home');
                localStorage.removeItem('homeAdmin');
                dispatch({
                    type: 'LEAVE_HOME',
                    response: response.data
                });
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const kickRoommate = (email) => (dispatch, getState) => {
    return axios.get('http://localhost:50682/api/Home/LeaveHome', { params: { email: email } })
        .then(function (response) {
                dispatch({
                    type: 'KICK_ROOMMATE',
                    response: "Wskazany współlokator opuścił grupę.",
                    email: email
                });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const joinHome = (joinHomeForm) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });
    console.log(joinHomeForm);
    return axios.post('http://localhost:50682/api/Home/JoinHome', joinHomeForm)
        .then(function (response) {
            if (response.data == "Dołączono do grupy.")
                localStorage.setItem('home', "home");
            dispatch({
                type: 'JOIN_HOME_MESSAGE',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const setIdAndToken = (id, token) => (dispatch) => {
    dispatch({
        type: 'CHANGE_JOIN_HOME_FORM',
        value: id,
        name: 'HomeId',
    });
    dispatch({
        type: 'CHANGE_JOIN_HOME_FORM',
        value: token,
        name: 'Token',
    });
};