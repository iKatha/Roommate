import axios from 'axios';
import { getIsFetching, getIsAnotherFetching, getIsAllOffertsFetching, getIsOffertFetching, getAreMyOffertsFetching } from '../reducers/fetching';

export const toggleList = (event) => {
    var target = event.target;
    var list = target.nextElementSibling;
    if (list.style.display == 'block') {
        list.style.display = 'none';
        target.style.borderRadius = '10px';
    } else {
        list.style.display = 'block';
        target.style.borderRadius = '10px 10px 0 0';
    }
};

export const fetchLocations = () => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_REQUEST'
    });

    return axios.get('http://localhost:50682/api/Location/GetLocationList')
        .then(function (response) {
            dispatch({
                type: 'FETCH_LOCATION_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            dispatch({
                type: 'FETCH_FAILURE'
            });
        });
};

export const onOtherOptionsChange = (checkbox) => (dispatch) =>{
        dispatch({
            type: 'TOGGLE_OTHER_OPTION',
            response: checkbox.value
        });
};

export const onAllOtherOptionsClick = () => (dispatch) => {
    document.getElementById("animals").checked = false;
    document.getElementById("equipment").checked = false;
    document.getElementById("media").checked = false;
    dispatch({
        type: 'CHOOSE_ALL_OTHER_OPTIONS'
    });
};

export const onRoommateQuantityClick = (roommateQuantity) => (dispatch) => {
    dispatch({
        type: 'CHANGE_ROOMMATE_QUANTITY',
        response: roommateQuantity
    });
}

export const onRoomTypeClick = (roomType) => (dispatch) => {
    dispatch({
        type: 'CHANGE_ROOM_TYPE',
        response: roomType
    });
}

export const onProvinceClick = (province) => (dispatch) => {
    dispatch({
        type: 'CHANGE_CURRENT_PROVINCE',
        province: province
    });
}

export const onCityClick = (event, province, city) => (dispatch) => {
    event.stopPropagation();
    dispatch({
        type: 'CHANGE_CURRENT_CITY',
        province: province,
        city: city
    });
}

export const onDistrictClick = (event, province, city, district) => (dispatch) => {
    event.stopPropagation();
    dispatch({
        type: 'CHANGE_CURRENT_DISTRICT',
        province: province,
        city: city,
        district: district
    });
}

export const onPriceSlideChange = () => (dispatch) => {
    var firstSlide = parseFloat(document.getElementById('firstPriceSlide').value);
    var secondSlide = parseFloat(document.getElementById('secondPriceSlide').value);
    if (firstSlide > secondSlide) {
        var tmp = secondSlide;
        secondSlide = firstSlide;
        firstSlide = tmp;
    }
    dispatch({
        type: 'CHANGE_PRICE_RANGE',
        firstSlide: firstSlide,
        secondSlide: secondSlide
    });
};

export const onSurfaceAreaSlideChange = () => (dispatch) => {
    var firstSlide = parseFloat(document.getElementById('firstSurfaceAreaSlide').value);
    var secondSlide = parseFloat(document.getElementById('secondSurfaceAreaSlide').value);
    if (firstSlide > secondSlide) {
        var tmp = secondSlide;
        secondSlide = firstSlide;
        firstSlide = tmp;
    }
    dispatch({
        type: 'CHANGE_SURFACE_AREA_RANGE',
        firstSlide: firstSlide,
        secondSlide: secondSlide
    });
};

export const fetchOfferts = (rentingFilter) => (dispatch, getState) => {
    if (getIsAllOffertsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_ALL_OFFERTS_REQUEST'
    });

    return axios.post('http://localhost:50682/api/RentingOffert/GetOffertList', rentingFilter)
        .then(function (response) {
            dispatch({
                type: 'FETCH_ALL_OFFERTS_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_ALL_OFFERTS_FAILURE'
            });
        });
};

export const addNewOffert = (newOffert) => (dispatch, getState) => {
    if (getIsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'ADD_OFFERT_REQUEST'
    });

    newOffert.login = localStorage.getItem('user');

    return axios.post('http://localhost:50682/api/RentingOffert/AddOffert', newOffert)
        .then(function (response) {
            dispatch({
                type: 'ADD_OFFERT_SUCCESS',
                message: "Dodano nowe ogłoszenie."
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'ADD_OFFERT_FAILURE'
            });
        });
};

export const onMyOffertDistrictClick = (event, province, city, district) => (dispatch) => {
    event.stopPropagation();
    dispatch({
        type: 'CHANGE_CURRENT_LOCATION',
        province: province,
        city: city,
        district: district
    });
}

export const onTittleBlur = (tittle) => (dispatch) => {
    var message = null;
    if (tittle.value.length > 120) {
        message = "Tytuł za długi.";
        tittle.style.border = "1px solid red";
    } else if(tittle.value == null || tittle.value == "" ){
        message = "Pole nie może być puste.";
        tittle.style.border = "1px solid red";
    } else {
        tittle.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_TITTLE",
        response: tittle.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "Tittle",
        message: message
    });
};

export const onDescriptionBlur = (description) => (dispatch) => {
    var message = null;
    if (description.value.length > 750) {
        message = "Opis za długi.";
        description.style.border = "1px solid red";
    } else if (description.value == null || description.value == "") {
        message = "Pole nie może być puste.";
        description.style.border = "1px solid red";
    } else {
        description.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_DESCRIPTION",
        response: description.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "Description",
        message: message
    });
};

export const onDescriptionChange = (description) => (dispatch) => {
    var charactersLeft = 750 - description.length;
    dispatch({
        type: "OFFERT_CHARACTERS_CHANGE",
        response: charactersLeft
    });
};

export const onFloorNumberBlur = (floor) => (dispatch) => {
    var regexp = /^[0-9]{1,2}$/;
    var message = null;
    if (floor.value== null || floor.value=="") {
        floor.style.border = "none";
    } else if (!regexp.test(floor.value)) {
        message = "Błędny format.";
        floor.style.border = "1px solid red";
    } else {
        floor.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_FLOOR_NUMBER",
        response: floor.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "FloorNumber",
        message: message
    });
};

export const onApartamentNumberBlur = (apartament) => (dispatch) => {
    var regexp = /^[0-9]{1,3}$/;
    var message = null;
    if (apartament.value == null || apartament.value == "") {
        apartament.style.border = "none";
    } else if (!regexp.test(apartament.value)) {
        message = "Błędny format.";
        apartament.style.border = "1px solid red";
    } else {
        apartament.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_APARTAMENT_NUMBER",
        response: apartament.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "ApartamentNumber",
        message: message
    });
};

export const onBuildingNumberBlur = (building) => (dispatch) => {
    var regexp = /^[0-9]{1,3}$/;
    var message = null;
    if (building.value == null || building.value == "") {
        message = "Pole nie może być puste.";
        building.style.border = "1px solid red";
    } else if (!regexp.test(building.value)) {
        message = "Błędny format.";
        building.style.border = "1px solid red";
    } else {
        building.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_BUILDING_NUMBER",
        response: building.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "BuildingNumber",
        message: message
    });
};

export const onStreetBlur = (street) => (dispatch) => {
    var message = null;
    console.log(street.value);
    if (street.value.length > 30) {
        message = "Nazwa ulicy zbyt długa.";
        street.style.border = "1px solid red";
    } else if (street.value == null || street.value == "") {
        message = "Pole nie może być puste.";
        street.style.border = "1px solid red";
    } else {
        street.style.border = "1px solid #30f2a0";
    }
    dispatch({
        type: "CHANGE_STREET",
        response: street.value
    });
    console.log(street.value);
    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "Street",
        message: message
    });
    
    
};


export const onRoomTypeBlur = (roomType) => (dispatch) => {
    var regexp = /^[0-9]{1,3}$/;
    var message = null;
    if (roomType.value == null || roomType.value == "") {
        message = "Pole nie może być puste.";
        roomType.style.border = "1px solid red";
    } else if (!regexp.test(roomType.value)) {
        message = "Błędny format.";
        roomType.style.border = "1px solid red";
    } else {
        roomType.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_ROOM_TYPE",
        response: roomType.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "RoomType",
        message: message
    });
};

export const onRoommateQuantityBlur = (roommateQuantity) => (dispatch) => {
    var regexp = /^[0-9]{1,3}$/;
    var message = null;
    if (roommateQuantity.value == null || roommateQuantity.value == "") {
        roommateQuantity.style.border = "1px solid red";
        message = "Pole nie może być puste.";
    } else if (!regexp.test(roommateQuantity.value)) {
        message = "Błędny format.";
        roommateQuantity.style.border = "1px solid red";
    } else {
        roommateQuantity.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_ROOMMATE_QUANTITY",
        response: roommateQuantity.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "RoommateQuantity",
        message: message
    });
};

export const onSurfaceAreaBlur = (surfaceArea) => (dispatch) => {
    var regexp = /^[0-9]+([,][0-9]{1,2})?$/;
    var message = null;
    if (surfaceArea.value == null || surfaceArea.value == "") {
        surfaceArea.style.border = "1px solid red";
        message = "Pole nie może być puste.";
    } else if (!regexp.test(surfaceArea.value)) {
        message = "Błędny format.";
        surfaceArea.style.border = "1px solid red";
    } else {
        surfaceArea.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_SURFACEAREA",
        response: surfaceArea.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "SurfaceArea",
        message: message
    });
};

export const onPriceBlur = (price) => (dispatch) => {
    var regexp = /^[0-9]+([,][0-9]{1,2})?$/;
    var message = null;
    if (price.value == null || price.value == "") {
        price.style.border = "1px solid red";
        message = "Pole nie może być puste.";
    } else if (!regexp.test(price.value)) {
        message = "Błędny format.";
        price.style.border = "1px solid red";
    } else {
        price.style.border = "1px solid #30f2a0";
    }

    dispatch({
        type: "CHANGE_PRICE",
        response: price.value
    });

    dispatch({
        type: "SET_OFFERT_VALIDATION_ERROR",
        name: "Price",
        message: message
    });
};

export const onIsEquippedChange = (isEquipped) => (dispatch) => {
    dispatch({
        type: "CHANGE_IS_EQUIPPED",
        response: isEquipped.checked
    });
};

export const onArePetsAllowedChange = (arePetsAllowed) => (dispatch) => {
    dispatch({
        type: "CHANGE_ARE_PETS_ALLOWED",
        response: arePetsAllowed.checked
    });
};

export const onAreMediaIncludedChange = (areMediaIncluded) => (dispatch) => {
    dispatch({
        type: "CHANGE_ARE_MEDIA_INCLUDED",
        response: areMediaIncluded.checked
    });
};

export const onOffertImageChange = (input, imagesAmount) => (dispatch) => {
    var message = null;
    var fileType = input.files[0].type;
    var photoSize = input.files[0].size;
    if (imagesAmount == 10) {
        message = "Przekroczono limit zdjęć.";
        dispatch({
            type: 'SET_OFFERT_VALIDATION_ERROR',
            message: message,
            name: "Images"
        });
    }
    else if (fileType.indexOf('image') == -1) {
        input.nextElementSibling.style.border = "1px solid red";
        input.nextElementSibling.innerText = '';
        message = "Błędny format pliku.";
        dispatch({
            type: 'SET_OFFERT_VALIDATION_ERROR',
            message: message,
            name: "Images"
        });
    } else if (photoSize > 2000000) {
        input.nextElementSibling.style.border = "1px solid red";
        input.nextElementSibling.innerText = '';
        message = "Plik nie może być większy niż 250Kb.";
        dispatch({
            type: 'SET_OFFERT_VALIDATION_ERROR',
            message: message,
            name: "Images"
        });
    } else {
        var reader = new FileReader();
        reader.onload = function () {
            var dataURL = reader.result;
            input.nextElementSibling.style.border = "1px solid #30f2a0";
            dispatch({
                type: 'SET_OFFERT_VALIDATION_ERROR',
                message: message,
                name: "Images"
            });
            dispatch({
                type: 'ADD_IMAGE',
                response: dataURL,
            });
        }
        reader.readAsDataURL(input.files[0]);
    }
};

export const removeImage = (index) => (dispatch) => {
    dispatch({
        type: 'REMOVE_IMAGE',
        index: index,
    });
};

export const fetchOffert = (id) => (dispatch, getState) => {
    if (getIsOffertFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_CHOSEN_OFFERT_REQUEST'
    });

    return axios.get('http://localhost:50682/api/RentingOffert/GetChosenOffert', { params: {id: id}})
        .then(function (response) {
            dispatch({
                type: 'FETCH_CHOSEN_OFFERT_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_CHOSEN_OFFERT_FAILURE'
            });
        });
};

export const openModal = (src) => () => {
    var image = document.getElementById('offertPicture');
    image.src = src;
    var modal = document.getElementById('pictureModal');
    modal.style.display = "block";
}

export const closeModal = () => () => {
    var modal = document.getElementById('pictureModal');
    modal.style.display = "none";
}

export const fetchMyOfferts = () => (dispatch, getState) => {
    if (getAreMyOffertsFetching(getState())) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_MY_OFFERTS_REQUEST'
    });

    return axios.get('http://localhost:50682/api/RentingOffert/GetMyOfferts', { params: { email: localStorage.getItem('user') } })
        .then(function (response) {
            dispatch({
                type: 'FETCH_MY_OFFERTS_SUCCESS',
                response: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type: 'FETCH_MY_OFFERTS_FAILURE'
            });
        });
};

export const deleteOffert = (id) => (dispatch) => {
    return axios.get('http://localhost:50682/api/RentingOffert/RemoveOffert', { params: { id: id } })
        .then(function (response) {
            dispatch({
                type: 'DELETE_OFFERT',
                response: id
            });
        })
        .catch(function (error) {
            console.log(error);
        });
};