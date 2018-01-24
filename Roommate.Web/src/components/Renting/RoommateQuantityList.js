import React from 'react';
import { toggleList } from '../../actions/Renting';

const RoommateQuantityList = ({ roommateQuantity, onRoommateQuantityClick}) => (
    <div className="roommate-quantity">
        Ilość współlokatorów
        <div className="roommate-quantity__list">
            <input
                onClick={toggleList}
                readOnly="readOnly"
                value={roommateQuantity}
            />
            <ul>
                <li onClick={() => onRoommateQuantityClick('Wszystko')}> Wszystko </li>
                <li onClick={() => onRoommateQuantityClick('1')}> 1 </li>
                <li onClick={() => onRoommateQuantityClick('2')}> 2 </li>
                <li onClick={() => onRoommateQuantityClick('3')}> 3 </li>
                <li onClick={() => onRoommateQuantityClick('4')}> 4 </li>
                <li onClick={() => onRoommateQuantityClick('5 i więcej')}> 5 i więcej </li>
            </ul>
        </div>
    </div>
);

export default RoommateQuantityList;