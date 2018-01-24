import React from 'react';
import { toggleList } from '../../actions/Renting';
import { v4 } from 'uuid';

const LocationList = ({ locations, isFetching, currentLocation, onProvinceClick, onCityClick, onDistrictClick}) => {

    const handleOnMouseEnter = (event) => {
        var parent = event.target;
        var parentWidth = parent.getBoundingClientRect().width;
        var parentListHeight = parent.parentElement.getBoundingClientRect().height;
        var childrenListHeight = parent.firstElementChild.getBoundingClientRect().height;
        var heightDifference = parentListHeight - childrenListHeight;
        var subMenu = parent.querySelector('div');
        subMenu.style.top = heightDifference / 2;
        subMenu.style.left = parent.offsetLeft + parentWidth;
    };

    if (!isFetching && locations.length)
        return (
            <div className="location">
                Lokalizacja
                <div className="location-list">
                    <input
                        readOnly="readOnly"
                        onClick={toggleList}
                        value={currentLocation.join(', ')}
                    />
                    <div className="location-list__wrapper">
                        <ul>
                            <li onClick={() => onProvinceClick('Cała Polska')}> Cała Polska </li>
                            {locations.map(location =>
                                <li
                                    key={location.Province.Id}
                                    onClick={() => onProvinceClick(location.Province)}
                                    className="location-list__parent "
                                    onMouseEnter={handleOnMouseEnter}>
                                    {location.Province}
                                    <div className="location-list__wrapper location-list__wrapper--sub">
                                        <ul>
                                            {location.Cities.map(city =>
                                                <li
                                                    key={city.Id}
                                                    onClick={event => onCityClick(event, location.Province, city.Name)}
                                                    className="location-list__parent"
                                                    onMouseEnter={handleOnMouseEnter}>
                                                    {city.Name}
                                                    <div className="location-list__wrapper location-list__wrapper--sub">
                                                        <ul>
                                                            {city.Districts.map((district,index) =>
                                                                <li
                                                                    key={index}
                                                                    onClick={event => onDistrictClick(event, location.Province, city.Name, district)}>
                                                                    {district}
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                    </div >
                </div>
        );
    else
        return (
            <div className="location">
                Lokalizacja
                <div className="location-list">
                    <input
                        readOnly="readOnly"
                        value={currentLocation.join(', ')}
                        onClick={toggleList}
                    />
                    <div className="location-list__wrapper">
                        <ul>
                            <li> Loading... </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
};

export default LocationList;