const error = (state = false, action) => {
    switch (action.type) {
        case 'FETCH_FAILURE':
        case 'FETCH_ANOTHER_FAILURE':
        case 'ADD_OFFERT_FAILURE':
        case 'FETCH_ALL_OFFERTS_FAILURE':
        case 'FETCH_ROOMMATES_FAILURE':
            return true;
        case 'CHANGE_ERROR_STATE':
            return false;
        default:
            return state;
    }
}
export default error;

export const getIsError = (state) => state.error;