import React from 'react';

const MyOffertRoommateQuantity = ({roommateQuantity, onRoommateQuantityBlur, validationError }) => (
    <div className="my-offert__roommate-quantity">
        <label className="my-offert__label">Ilość współlokatorów</label>
            <input type="number" className="my-offert__input" defaultValue={roommateQuantity} onBlur={e => onRoommateQuantityBlur(e.target)}></input>
            <div className="my-offert__tip">Ilość współlokatorów.</div>
        {validationError.RoommateQunatity && <div className="my-offert__validation-error">{validationError.RoommateQunatity}</div>}
    </div>
);

export default MyOffertRoommateQuantity;