import React from 'react';

const MyOffertRoomType = ({ roomType, onRoomTypeBlur, validationError }) => (
    <div className="my-offert__room-type">
        <label className="my-offert__label">Rodzaj pokoju</label>
        <input type="number" className="my-offert__input" defaultValue={roomType} onBlur={e => onRoomTypeBlur(e.target)}></input>
        <div className="my-offert__tip">Ilość współlokatorów w wynajmowanym pokoju.</div>
        {validationError.RoomType && <div className="my-offert__validation-error">{validationError.RoomType}</div>}
    </div>
);

export default MyOffertRoomType;