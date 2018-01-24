import React from 'react';

const MyOffertStreet = ({ validationError, onStreetBlur,street }) => (
    <div className="my-offert__address">
        <label className="my-offert__label">Ulica</label>
        <input type="text" maxLength="30" defaultValue={street} className="my-offert__input" onBlur={event => onStreetBlur(event.target)}/>
        <div className="my-offert__tip">Maksymalnie 30 znaków.</div>
        {validationError.Street && <div className="my-offert__validation-error">{validationError.Street}</div>}
    </div>
);

export default MyOffertStreet;