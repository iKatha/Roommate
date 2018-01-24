import { combineReducers } from 'redux';

const otherOptions = (state = [{ name: 'Wszystko', value: true }, { name: 'Media w cenie', value: false }, { name: 'Zwierzęta', value: false }, { name: 'Wyposażenie', value: false}], action) => {
    switch (action.type) {
        case 'TOGGLE_OTHER_OPTION':
            var newOptions = state.map(e => {
                if (e.name == action.response)
                    return Object.assign({}, e, {
                        value: !e.value
                    })
                if (e.name == 'Wszystko')
                    return Object.assign({}, e, {
                        value: false
                    })
                return e
            });
            if (!newOptions[1].value && !newOptions[2].value && !newOptions[3].value)
                newOptions[0].value = true;
            return newOptions;
        case 'CHOOSE_ALL_OTHER_OPTIONS':
            return state.map(e => {
                if (e.name == 'Wszystko')
                    return Object.assign({}, e, {
                        value : true
                    })
                return Object.assign({}, e, {
                    value : false
                })
                return e
            });
        default: return state;
    }
};

const roomType = (state = 'Wszystkie', action) => {
    switch (action.type) {
        case 'CHANGE_ROOM_TYPE':
            return action.response;
        default:
            return state;
    }
};

const roommateQuantity = (state = 'Wszystko', action) => {
    switch (action.type) {
        case 'CHANGE_ROOMMATE_QUANTITY':
            return action.response;
        default:
            return state;
    }
};

const currentLocation = (state = ['Cała Polska'], action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_CITY':
            return [action.city, action.province];
        case 'CHANGE_CURRENT_DISTRICT':
            return [action.district, action.city, action.province];
        case 'CHANGE_CURRENT_PROVINCE':
            return [action.province];
        default:
            return state;
    }
};

const priceRange = (state = {min: 0, max: 2000}, action) => {
    switch (action.type) {
        case 'CHANGE_PRICE_RANGE':
            return {
                min: action.firstSlide,
                max: action.secondSlide
            };
        default:
            return state;
    }
};

const surfaceAreaRange = (state = { min: 0, max: 100 }, action) => {
    switch (action.type) {
        case 'CHANGE_SURFACE_AREA_RANGE':
            return {
                min: action.firstSlide,
                max: action.secondSlide
            };
        default:
            return state;
    }
};

const rentingFilter = combineReducers({
    otherOptions,
    roomType,
    roommateQuantity,
    currentLocation,
    priceRange,
    surfaceAreaRange
});

export default rentingFilter;

export const getRentingFilter = (state) => state.renting.rentingFilter;