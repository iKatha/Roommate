import { getAreTasksFetching } from '../reducers/fetching';
import axios from 'axios';

export const fetchTasks = () => (dispatch, getState) => {
    if (getAreTasksFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_TASKS_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Duty/LoadTasks', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'FETCH_TASKS_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_TASKS_FAILURE'
            });
        });
};

export const markTask = (id, mark) => (dispatch) => {
    return axios.post('http://localhost:50682/api/Duty/MarkTask', { Email: localStorage.getItem('user'), TaskId: id, Mark: mark })
        .then(function (response) {
            closeModal()();
            dispatch({
                type: 'MARK_TASK',
                id: id,
                myMark: mark,
                averageMark: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const completeTask = (id) => (dispatch) => {
    return axios.get('http://localhost:50682/api/Duty/CompleteTask', { params: { id: id} })
        .then(function (response) {
            dispatch({
                type: 'COMPLETE_TASK',
                response: id
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};

export const setMark = (img, mark) => (dispatch) => {
    img.src = "../images/mark_task_colored.png";
    if (mark == 1) {
        document.getElementById("mark2").src = "../images/mark_task_empty.png";
        document.getElementById("mark3").src = "../images/mark_task_empty.png";
        document.getElementById("mark4").src = "../images/mark_task_empty.png";
        document.getElementById("mark5").src = "../images/mark_task_empty.png";
    } else if (mark == 2) {
        document.getElementById("mark1").src = "../images/mark_task_colored.png";
        document.getElementById("mark3").src = "../images/mark_task_empty.png";
        document.getElementById("mark4").src = "../images/mark_task_empty.png";
        document.getElementById("mark5").src = "../images/mark_task_empty.png";
    } else if (mark == 3) {
        document.getElementById("mark1").src = "../images/mark_task_colored.png";
        document.getElementById("mark2").src = "../images/mark_task_colored.png";
        document.getElementById("mark4").src = "../images/mark_task_empty.png";
        document.getElementById("mark5").src = "../images/mark_task_empty.png";
    } else if (mark == 4) {
        document.getElementById("mark1").src = "../images/mark_task_colored.png";
        document.getElementById("mark2").src = "../images/mark_task_colored.png";
        document.getElementById("mark3").src = "../images/mark_task_colored.png";
        document.getElementById("mark5").src = "../images/mark_task_empty.png";
    } else {
        document.getElementById("mark1").src = "../images/mark_task_colored.png";
        document.getElementById("mark2").src = "../images/mark_task_colored.png";
        document.getElementById("mark3").src = "../images/mark_task_colored.png";
        document.getElementById("mark4").src = "../images/mark_task_colored.png";
    }

    dispatch({
        type: 'SET_MARK',
        response: mark
    });
};

export const onMarkTaskClick = (id) => (dispatch) => {
    var modal = document.getElementById('markTaskModal');
    modal.style.display = "block";
    dispatch({
        type: 'CHANGE_CURRENT_ID_TASK_TO_MARK',
        response: id
    });
};

export const closeModal = () => () => {
    var modal = document.getElementById('markTaskModal');
    modal.style.display = "none";
    document.getElementById("mark1").src = "../images/mark_task_empty.png";
    document.getElementById("mark2").src = "../images/mark_task_empty.png";
    document.getElementById("mark3").src = "../images/mark_task_empty.png";
    document.getElementById("mark4").src = "../images/mark_task_empty.png";
    document.getElementById("mark5").src = "../images/mark_task_empty.png";
};


export const filterTasks = (tasks, filter) => (dispatch) => {
    var filteredTasks = [];

    for (let i = 0; i < tasks.length; i++) {
        if ((filter.IsCompleted == "all" || tasks[i].IsCompleted == filter.IsCompleted) &&
            (filter.MyMark == "all" || tasks[i].MyMark == null && tasks[i].User.Email != localStorage.getItem('user')) &&
            (filter.Name == "all" || tasks[i].Name == filter.Name) &&
            (filter.User == "all" || tasks[i].User.Email == localStorage.getItem('user')))
            filteredTasks.push(tasks[i]);
    }

    dispatch({
        type: 'FILTER_TASKS',
        response: filteredTasks
    });
};

export const changeUserFilter = (filter) => (dispatch) => {
    dispatch({
        type: 'CHANGE_USER_TASK_FILTER',
        response: filter
    });
};

export const changeNameFilter = (filter) => (dispatch) => {
    dispatch({
        type: 'CHANGE_NAME_TASK_FILTER',
        response: filter
    });
};

export const changeMyMarkFilter = (filter) => (dispatch) => {
    dispatch({
        type: 'CHANGE_MY_MARK_TASK_FILTER',
        response: filter
    });
};

export const changeIsCompletedFilter = (filter) => (dispatch) => {
    dispatch({
        type: 'CHANGE_IS_COMPLETED_TASK_FILTER',
        response: filter
    });
};

