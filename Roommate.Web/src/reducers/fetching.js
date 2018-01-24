import { combineReducers } from 'redux';

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return true;
        case 'FETCH_LOCATION_SUCCESS':
        case 'LOGIN_SUCCESS':
        case 'SET_LOGGING_ERROR_MESSAGE':
        case 'SET_FORGOTTEN_PASSWORD_MESSAGE':
        case 'REGISTRATION_SUCCESS':
        case 'REGISTRATION_ERROR':
        case 'CHANGE_PASSWORD_SUCCESS':
        case 'CHANGE_PASSWORD_ERROR':
        case 'GET_ACCOUNT_INFO':
        case 'FETCH_FAILURE':
        case 'CREATE_HOME_SUCCESS':
        case 'CREATE_HOME_FAILURE':
        case 'JOIN_HOME_MESSAGE':
            return false;
        default:
            return state;
    }
};

const isLogging = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return true;
        case 'LOGIN_SUCCESS':
        case 'LOGIN_FAILURE':
            return false;
        default:
            return state
    }
};

const isAccountInfoFetching = (state = false, action) => {
    switch (action.type) {
        case 'GET_ACCOUNT_INFO':
            return true;
        case 'GET_ACCOUNT_INFO_SUCCESS':
        case 'GET_ACCOUNT_INFO_FAILURE':
            return false;
        default:
            return state
    }
};

const isAnotherFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_ANOTHER_REQUEST':
            return true;
        case 'SET_FORGOTTEN_PASSWORD_MESSAGE':
        case 'CHANGE_ACCOUNT_INFO_SUCCESS':
        case 'CHANGE_ACCOUNT_INFO_ERROR':
        case 'FETCH_ANOTHER_FAILURE':
            return false;
        default:
            return state;
    }
};

const isAllOffertsFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_ALL_OFFERTS_REQUEST':
            return true;
        case 'FETCH_ALL_OFFERTS_SUCCESS':
        case 'FETCH_ALL_OFFERTS_FAILURE':
            return false;
        default:
            return state
    }
};

const isOffertBeingAdded = (state = false, action) => {
    switch (action.type) {
        case 'ADD_OFFERT_REQUEST':
            return true;
        case 'ADD_OFFERT_SUCCESS':
        case 'ADD_OFFERT_FAILURE':
            return false;
        default:
            return state
    }
};

const areRoommatesFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_ROOMMATES_REQUEST':
            return true;
        case 'FETCH_ROOMMATES_SUCCESS':
        case 'FETCH_ROOMMATES_FAILURE':
            return false;
        default:
            return state
    }
};


const isShoppingListFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_SHOPPING_LIST_REQUEST':
            return true;
        case 'FETCH_SHOPPING_LIST_SUCCESS':
        case 'FETCH_SHOPPING_LIST_FAILURE':
            return false;
        default:
            return state
    }
};

const isAnnouncementListFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_ANNOUNCEMENT_LIST_REQUEST':
            return true;
        case 'FETCH_ANNOUNCEMENT_LIST_SUCCESS':
        case 'FETCH_ANNOUNCEMENT_LIST_FAILURE':
            return false;
        default:
            return state
    }
};

const isConfigurationFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_CONFIGURATION_REQUEST':
            return true;
        case 'FETCH_CONFIGURATION_SUCCESS':
        case 'FETCH_CONFIGURATION_FAILURE':
            return false;
        default:
            return state
    }
};

const isGeneratingTasks = (state = false, action) => {
    switch (action.type) {
        case 'GENERATE_TASKS_REQUEST':
            return true;
        case 'GENERATE_TASKS_SUCCESS':
        case 'GENERATE_TASKS_FAILURE':
            return false;
        default:
            return state
    }
};

const areTasksFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_TASKS_REQUEST':
            return true;
        case 'FETCH_TASKS_SUCCESS':
        case 'FETCH_TASKS_FAILURE':
            return false;
        default:
            return state
    }
};

const isPaymentListFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_PAYMENT_LIST_REQUEST':
            return true;
        case 'FETCH_PAYMENT_LIST_SUCCESS':
        case 'FETCH_PAYMENT_LIST_FAILURE':
            return false;
        default:
            return state
    }
};

const isOffertFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_CHOSEN_OFFERT_REQUEST':
            return true;
        case 'FETCH_CHOSEN_OFFERT_SUCCESS':
        case 'FETCH_CHOSEN_OFFERT_FAILURE':
            return false;
        default:
            return state
    }
};

const areMyOffertsFetching = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_MY_OFFERTS_REQUEST':
            return true;
        case 'FETCH_MY_OFFERTS_SUCCESS':
        case 'FETCH_MY_OFFERTS_FAILURE':
            return false;
        default:
            return state
    }
};

const fetching = combineReducers({
    isFetching,
    isAnotherFetching,
    isAllOffertsFetching,
    isOffertBeingAdded,
    areRoommatesFetching,
    isShoppingListFetching,
    isAnnouncementListFetching,
    isConfigurationFetching,
    isGeneratingTasks,
    areTasksFetching,
    isPaymentListFetching,
    isOffertFetching,
    areMyOffertsFetching,
    isLogging,
    isAccountInfoFetching
});

export default fetching;
export const getIsFetching = (state) => state.fetching.isFetching;
export const getIsAnotherFetching = (state) => state.fetching.isAnotherFetching;
export const getIsAllOffertsFetching = (state) => state.fetching.isAllOffertsFetching;
export const getIsOffertBeingAdded = (state) => state.fetching.isOffertBeingAdded;
export const getAreRoommatesFetching = (state) => state.fetching.areRoommatesFetching;
export const getIsShoppingListFetching = (state) => state.fetching.isShoppingListFetching;
export const getIsAnnouncementListFetching = (state) => state.fetching.isAnnouncementListFetching;
export const getIsConfigurationFetching = (state) => state.fetching.isConfigurationFetching;
export const getIsGeneratingTasks = (state) => state.fetching.isGeneratingTasks;
export const getAreTasksFetching = (state) => state.fetching.areTasksFetching;
export const getIsPaymentListFetching = (state) => state.fetching.isPaymentFetching;
export const getIsOffertFetching = (state) => state.fetching.isOffertFetching;
export const getAreMyOffertsFetching = (state) => state.fetching.areMyOffertsFetching;
export const getIsLogging= (state) => state.fetching.isLogging;
export const getIsAccountInfoFetching = (state) => state.fetching.isAccountInfoFetching;

