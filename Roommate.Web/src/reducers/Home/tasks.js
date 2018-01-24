import { combineReducers } from 'redux';

const taskList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TASKS_SUCCESS':
            return action.response;
        case 'COMPLETE_TASK':
            var newOptions = state.map(e => {
                if (e.Id == action.response)
                    return Object.assign({}, e, {
                        IsCompleted: true
                    })
                return e
            });
            return newOptions;
        case 'MARK_TASK':
            var newOptions = state.map(e => {
                if (e.Id == action.id)
                    return Object.assign({}, e, {
                        MyMark: action.myMark,
                        AverageMark: action.averageMark
                    })
                return e
            });
            return newOptions;
        default:
            return state;
    }
};

const visibleTaskList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TASKS_SUCCESS':
            return action.response;
        case 'COMPLETE_TASK':
            var newOptions = state.map(e => {
                if (e.Id == action.response)
                    return Object.assign({}, e, {
                        IsCompleted: true
                    })
                return e
            });
            return newOptions;
        case 'MARK_TASK':
            var newOptions = state.map(e => {
                if (e.Id == action.id)
                    return Object.assign({}, e, {
                        MyMark: action.myMark,
                        AverageMark: action.averageMark
                    })
                return e
            });
            return newOptions;
        case 'FILTER_TASKS':
            return action.response;
        default:
            return state;
    }
};

const IsCompleted = (state = "all", action) => {
    switch (action.type) {
        case 'CHANGE_IS_COMPLETED_TASK_FILTER':
            return action.response;
        default:
            return state;
    }
};

const MyMark = (state = "all", action) => {
    switch (action.type) {
        case 'CHANGE_MY_MARK_TASK_FILTER':
            return action.response;
        default:
            return state;
    }
};

const User = (state = "all", action) => {
    switch (action.type) {
        case 'CHANGE_USER_TASK_FILTER':
            return action.response;
        default:
            return state;
    }
};

const Name = (state = "all", action) => {
    switch (action.type) {
        case 'CHANGE_NAME_TASK_FILTER':
            return action.response;
        default:
            return state;
    }
};

const currentTaskIdToMark = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_ID_TASK_TO_MARK':
            return action.response;
        default:
            return state;
    }
};

const mark = (state = null, action) => {
    switch (action.type) {
        case 'SET_MARK':
            return action.response;
        default:
            return state;
    }
};

const filter = combineReducers({
    IsCompleted,
    MyMark,
    User,
    Name
});

const tasks = combineReducers({
    taskList,
    visibleTaskList,
    filter,
    currentTaskIdToMark,
    mark
});

export default tasks;

export const getTaskList = (state) => state.home.tasks.taskList;
export const getFilter = (state) => state.home.tasks.filter;
export const getVisibleTaskList = (state) => state.home.tasks.visibleTaskList;
export const getCurrentTaskIdToMark = (state) => state.home.tasks.currentTaskIdToMark;
export const getMark = (state) => state.home.tasks.mark;