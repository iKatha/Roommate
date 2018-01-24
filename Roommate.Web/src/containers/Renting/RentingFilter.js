import React from 'react';
import LocationList from '../../components/Renting/LocationList';
import PriceSlider from '../../components/Renting/PriceSlider';
import RoomTypeList from '../../components/Renting/RoomTypeList';
import SurfaceAreaSlider from '../../components/Renting/SurfaceAreaSlider';
import RoommateQuantityList from '../../components/Renting/RoommateQuantityList';
import OtherOptions from '../../components/Renting/OtherOptions';
import { connect } from 'react-redux';
import * as actions from '../../actions/Renting';
import { getLocations } from '../../reducers/Renting/locations';
import { getRentingFilter} from '../../reducers/Renting/rentingFilter';
import { getIsFetching } from '../../reducers/fetching';

class RentingFilter extends React.Component {

    componentDidMount() {
        const { fetchLocations } = this.props;
        fetchLocations();
    }

    render() {
        const { locations, isFetching, onOtherOptionsChange, onAllOtherOptionsClick, onRoomTypeClick, onRoommateQuantityClick, onProvinceClick, rentingFilter, onCityClick, onDistrictClick, onPriceSlideChange, onSurfaceAreaSlideChange} = this.props;
        return (
            <div className='renting-filters'>
                <LocationList locations={locations} isFetching={isFetching} currentLocation={rentingFilter.currentLocation} onProvinceClick={onProvinceClick} onCityClick={onCityClick} onDistrictClick={onDistrictClick}/>
                <PriceSlider onPriceSlideChange={onPriceSlideChange} priceRange={rentingFilter.priceRange}/>
                <RoomTypeList onRoomTypeClick={onRoomTypeClick} roomType={rentingFilter.roomType} />
                <SurfaceAreaSlider onSurfaceAreaSlideChange={onSurfaceAreaSlideChange} surfaceAreaRange={rentingFilter.surfaceAreaRange} />
                <OtherOptions onOtherOptionsChange={onOtherOptionsChange} otherOptions={rentingFilter.otherOptions} onAllOtherOptionsClick={onAllOtherOptionsClick} />
                <RoommateQuantityList onRoommateQuantityClick={onRoommateQuantityClick} roommateQuantity={rentingFilter.roommateQuantity} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        locations: getLocations(state),
        isFetching: getIsFetching(state),
        rentingFilter: getRentingFilter(state)
    };
};

RentingFilter = connect(
    mapStateToProps,
    actions
)(RentingFilter);


export default RentingFilter;