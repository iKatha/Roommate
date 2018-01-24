import React from 'react';

const MyOffertAddress = ({validationError, onBuildingNumberBlur, onApartamentNumberBlur, onFloorNumberBlur, buildingNumber, apartamentNumber, floorNumber }) => (
    <div className="my-offert__address">

        <label className="my-offert__label">Numer budynku</label>
            <input type="number" className="my-offert__input" defaultValue={buildingNumber} onBlur={e => onBuildingNumberBlur(e.target)}></input>
        {validationError.BuildingNumber && <div className="my-offert__validation-error">{validationError.BuildingNumber}</div>}

        <label className="my-offert__label">Numer mieszkania</label>
            <input type="number" className="my-offert__input" defaultValue={apartamentNumber} onBlur={e => onApartamentNumberBlur(e.target)}></input>
            {validationError.ApartamentNumber && <div className="my-offert__validation-error">{validationError.ApartamentNumber}</div> }

            <label className="my-offert__label">Piętro</label>
            <input type="number" className="my-offert__input" defaultValue={floorNumber} onBlur={e => onFloorNumberBlur(e.target)}></input>
            {validationError.FloorNumber && <div className="my-offert__validation-error">{validationError.FloorNumber}</div> }
    </div>
);

export default MyOffertAddress;