import { combineReducers } from 'redux';

const tittle = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_TITTLE':
            return action.response;
        default:
            return state;
    }
}

const description = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_DESCRIPTION':
            return action.response;
        default:
            return state;
    }
}

const roomType = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ROOM_TYPE':
            return action.response;
        default:
            return state;
    }
}

const roommateQuantity = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ROOMMATE_QUANTITY':
            return action.response;
        default:
            return state;
    }
}

const arePetsAllowed = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ARE_PETS_ALLOWED':
            return action.response;
        default:
            return state;
    }
}

const isEquipped = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_IS_EQUIPPED':
            return action.response;
        default:
            return state;
    }
}

const areMediaIncluded = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_ARE_MEDIA_INCLUDED':
            return action.response;
        default:
            return state;
    }
}

const district = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_LOCATION':
            return action.district;
        default:
            return state;
    }
}

const province = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_LOCATION':
            return action.province;
        default:
            return state;
    }
}

const city = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_LOCATION':
            return action.city;
        default:
            return state;
    }
}

const price = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_PRICE':
            return action.response;
        default:
            return state;
    }
}

const surfaceArea = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_SURFACEAREA':
            return action.response;
        default:
            return state;
    }
}

const images = (state = [], action) => {
    switch (action.type) {
        case 'ADD_IMAGE':
            return [...state, action.response];
        case 'REMOVE_IMAGE':
            return state.filter((element,index) => index !== action.index);
        default:
            return state;
    }
}

const apartamentNumber = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_APARTAMENT_NUMBER':
            return action.response;
        default:
            return state;
    }
}

const buildingNumber = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_BUILDING_NUMBER':
            return action.response;
        default:
            return state;
    }
}

const floorNumber = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_FLOOR_NUMBER':
            return action.response;
        default:
            return state;
    }
}

const street = (state = null, action) => {
    switch (action.type) {
        case 'CHANGE_STREET':
            return action.response;
        default:
            return state;
    }
}

const myOffertForm = combineReducers({
    tittle,
    description,
    images,
    price,
    surfaceArea,
    roomType,
    roommateQuantity,
    province,
    district,
    city,
    arePetsAllowed,
    isEquipped,
    areMediaIncluded,
    street,
    buildingNumber,
    floorNumber,
    apartamentNumber,
});

const charactersToUse = (state = 750, action) => {
    switch (action.type) {
        case 'OFFERT_CHARACTERS_CHANGE':
            return action.response;
        default:
            return state;
    }
};

const validationError = (state = { Tittle: null, Description: null, Price: null, SurfaceArea: null, RoomType: null, RoommateQuantity: null, Street: null, BuildingNumber: null, ApartamentNumber: null, FloorNumber: null, Images: null}, action) => {
    switch (action.type) {
        case 'SET_OFFERT_VALIDATION_ERROR':
            return Object.assign({}, state, {
                [action.name]: action.message
            });
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case 'OFFERT_ERROR':
            return action.message;
        case 'OFFERT_SUCCESS':
            return null;
        default:
            return state;
    }
};

const successMessage = (state = null, action) => {
    switch (action.type) {
        case 'ADD_OFFERT_SUCCESS':
            return action.message;
        default:
            return null;
    }
};

const myOffert = combineReducers({
    myOffertForm,
    charactersToUse,
    validationError,
    successMessage,
    errorMessage,
});

export default myOffert;
export const getOffertErrorMessage = (state) => state.renting.myOffert.errorMessage;
export const getOffertSuccessMessage = (state) => state.renting.myOffert.successMessage;
export const getOffertForm = (state) => state.renting.myOffert.myOffertForm;
export const getValidationError = (state) => state.renting.myOffert.validationError;
export const getCharactersToUse = (state) => state.renting.myOffert.charactersToUse;