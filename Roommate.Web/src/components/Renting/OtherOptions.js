import React from 'react';
import { toggleList } from '../../actions/Renting';

const OtherOptions = ({ onOtherOptionsChange, otherOptions, onAllOtherOptionsClick }) => {

    return (
        <div className="other-options">
            Inne
        <div className="other-options__list">
                <input
                    readOnly="readOnly"
                    onClick={toggleList}
                    value={otherOptions.filter(e => e.value == true).map(e => e.name).join(', ')}
                />
                <ul>
                    <li onClick={onAllOtherOptionsClick}>
                        Wszystko
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="animals"
                            value="Zwierzęta"
                            onChange={event => onOtherOptionsChange(event.target)}
                        />
                        <label htmlFor="animals"> Zwierzęta </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="equipment"
                            value="Wyposażenie"
                            onChange={event => onOtherOptionsChange(event.target)}
                        />
                        <label htmlFor="equipment" > Wyposażenie </label>
                        
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="media"
                            value="Media w cenie"
                            onChange={event => onOtherOptionsChange(event.target) }
                        />
                        <label htmlFor="media" > Media w cenie </label>
                        
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default OtherOptions;