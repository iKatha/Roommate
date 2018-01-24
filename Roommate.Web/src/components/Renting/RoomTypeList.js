import React from 'react';
import { toggleList } from '../../actions/Renting';

const RoomTypeList = ({ roomType, onRoomTypeClick}) => (
    <div className="room-type">
        Rodzaj pokoju
        <div className="room-type__list">
            <input
                onClick={toggleList}
                readOnly="readOnly"
                value = {roomType}
            />
            <ul>
                <li onClick={() => onRoomTypeClick('Wszystkie')}> Wszystkie </li>
                <li onClick={() => onRoomTypeClick('Jednoosobowy')}> Jednoosobowy </li>
                <li onClick={() => onRoomTypeClick('Dwuosobowy')}> Dwuosobowy </li>
                <li onClick={() => onRoomTypeClick('Trzyosobowy i więcej')}> Trzyosobowy i więcej </li>
            </ul>
        </div>
    </div>
);

export default RoomTypeList;