import React from 'react';
import { toggleList } from '../../../actions/Renting';

const MyOffertOtherOptions = ({ onIsEquippedChange, onArePetsAllowedChange, onAreMediaIncludedChange, areMediaIncluded, isEquipped, arePetsAllowed  }) => (
    <div className="my-offert__other-options">
        <label className="my-offert__label"> Inne </label>
        <input
            readOnly="readOnly"
            onClick={toggleList}
            value="Dodatkowe opcje"
        />
        <ul>
            <li>
                {arePetsAllowed ?
                    <input
                    checked
                    type="checkbox"
                    id="arePetsAllowed"
                    value="Zwierzęta"
                    onChange={event => onArePetsAllowedChange(event.target)}
                    /> :
                    <input
                        type="checkbox"
                        id="arePetsAllowed"
                        value="Zwierzęta"
                        onChange={event => onArePetsAllowedChange(event.target)}
                    />
                }
                <label htmlFor="arePetsAllowed"> Zwierzęta </label>
            </li>
            <li>
                {isEquipped ?
                    <input
                        checked
                        type="checkbox"
                        id="isEquipment"
                        value="Wyposażenie"
                        onChange={event => onIsEquippedChange(event.target)}
                    /> :
                    <input
                        type="checkbox"
                        id="isEquipment"
                        value="Wyposażenie"
                        onChange={event => onIsEquippedChange(event.target)}
                    />
                }
                <label htmlFor="isEquipment" > Wyposażenie </label>
            </li>
            <li>
                {areMediaIncluded ? 
                    <input
                        checked
                        type="checkbox"
                        id="areMediaIncluded"
                        value="Media w cenie"
                        onChange={event => onAreMediaIncludedChange(event.target)}
                    /> :
                    <input
                        type="checkbox"
                        id="areMediaIncluded"
                        value="Media w cenie"
                        onChange={event => onAreMediaIncludedChange(event.target)}
                    />}
                <label htmlFor="areMediaIncluded" > Media w cenie </label>
            </li>
        </ul>
    </div>
);

export default MyOffertOtherOptions;