import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Renting';
import { getIsFetching, getIsOffertBeingAdded } from '../../reducers/fetching';
import { getLocations } from '../../reducers/Renting/locations';
import MyOffertLocationList from '../../components/Renting/MyOffert/MyOffertLocationList';
import MyOffertAddress from '../../components/Renting/MyOffert/MyOffertAddress';
import MyOffertDescription from '../../components/Renting/MyOffert/MyOffertDescription';
import MyOffertTittle from '../../components/Renting/MyOffert/MyOffertTittle';
import MyOffertStreet from '../../components/Renting/MyOffert/MyOffertStreet';
import MyOffertOtherOptions from '../../components/Renting/MyOffert/MyOffertOtherOptions';
import MyOffertRoomType from '../../components/Renting/MyOffert/MyOffertRoomType';
import MyOffertRoommateQuantity from '../../components/Renting/MyOffert/MyOffertRoommateQuantity';
import MyOffertSurfaceArea from '../../components/Renting/MyOffert/MyOffertSurfaceArea';
import MyOffertPrice from '../../components/Renting/MyOffert/MyOffertPrice';
import MyOffertPictures from '../../components/Renting/MyOffert/MyOffertPictures';
import { getOffertForm, getValidationError, getCharactersToUse, getOffertErrorMessage, getOffertSuccessMessage } from '../../reducers/Renting/myOffert';
import { getOffertInfo } from '../../reducers/Renting/offerts';


class NewOffert extends React.Component {
    componentDidMount() {
        const { fetchLocations } = this.props;
        fetchLocations();
    }

    render() {
        const { isLoading, addNewOffert, isFetching, myOffertForm, onMyOffertDistrictClick, onMyOffertOtherOptionsChange, onMyOffertAllOtherOptionsClick, validationError, charactersToUse, onTittleBlur, onDescriptionBlur, onDescriptionChange, offertInfo, locations, onFloorNumberBlur, onApartamentNumberBlur, onBuildingNumberBlur, onStreetBlur, onRoomTypeBlur, onRoommateQuantityBlur, onSurfaceAreaBlur, onPriceBlur, onIsEquippedChange, onArePetsAllowedChange, onAreMediaIncludedChange, onOffertImageChange, removeImage, successMessage} = this.props;
        return (
            <div className="my-offert">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        addNewOffert(myOffertForm);
                    }}
                >
                    <div className="column-one column-one--new-offert">
                        <MyOffertLocationList locations={locations} isFetching={isFetching} city={myOffertForm.city} district={myOffertForm.district} province={myOffertForm.province} onDistrictClick={onMyOffertDistrictClick} />

                        <MyOffertStreet validationError={validationError} onStreetBlur={onStreetBlur} />

                        <MyOffertAddress validationError={validationError} onBuildingNumberBlur={onBuildingNumberBlur} onApartamentNumberBlur={onApartamentNumberBlur} onFloorNumberBlur={onFloorNumberBlur} />

                        <MyOffertSurfaceArea validationError={validationError} onSurfaceAreaBlur={onSurfaceAreaBlur} />

                        <MyOffertPrice validationError={validationError} onPriceBlur={onPriceBlur} />
                    </div>

                    <div className="column-two column-two--new-offert">
                        <MyOffertTittle validationError={validationError} onTittleBlur={onTittleBlur} />

                        <MyOffertDescription  charactersToUse={charactersToUse} validationError={validationError} onDescriptionBlur={onDescriptionBlur} onDescriptionChange={onDescriptionChange} />

                        <MyOffertOtherOptions onIsEquippedChange={onIsEquippedChange} onArePetsAllowedChange={onArePetsAllowedChange} onAreMediaIncludedChange={onAreMediaIncludedChange} />

                        <MyOffertRoomType onRoomTypeBlur={onRoomTypeBlur} validationError={validationError} />

                        <MyOffertRoommateQuantity onRoommateQuantityBlur={onRoommateQuantityBlur} validationError={validationError} />

                        <MyOffertPictures removeImage={removeImage} validationError={validationError} onOffertImageChange={onOffertImageChange} myOffertForm={myOffertForm} />

                        {isLoading &&
                            <div className="my-offert__loader">
                                Trwa dodawanie oferty
                            <div className="first-dot"></div>
                                <div className="second-dot"></div>
                                <div className="third-dot"></div>
                            </div>
                        }
                            {successMessage && <div className="my-offert__success-message">{successMessage}</div>}

                         {!validationError.RoommateQuantity && !validationError.RoomType && !validationError.Description && !validationError.Tittle && !validationError.BuldingNumber && !validationError.Street && !validationError.ApartamentNumber && !validationError.FloorNumber && !validationError.Price && !validationError.SurfaceArea && myOffertForm.roommateQuantity && myOffertForm.roomType && myOffertForm.street && myOffertForm.buildingNumber && myOffertForm.surfaceArea && myOffertForm.price && myOffertForm.description && myOffertForm.tittle ? <button className="my-offert__button" type="submit"> Utwórz </button> : <button className="my-offert__button" type="submit" disabled> Utwórz </button>}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps= (state) => {
    return {
        locations: getLocations(state),
        isLoading: getIsOffertBeingAdded(state),
        isFetching: getIsFetching(state),
        myOffertForm: getOffertForm(state),
        validationError: getValidationError(state),
        charactersToUse: getCharactersToUse(state),
        errorMessage: getOffertErrorMessage(state),
        successMessage: getOffertSuccessMessage(state),
        offertInfo: getOffertInfo(state)
    };
};

NewOffert = connect(
    mapStateToProps,
    actions
)(NewOffert);

export default NewOffert;