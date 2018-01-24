const locations = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_LOCATION_SUCCESS':
            return action.response;
        default: return state;
    }
};

export default locations;

export const getLocations = (state) => state.renting.locations;
