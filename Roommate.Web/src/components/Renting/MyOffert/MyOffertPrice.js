import React from 'react';

const MyOffertPrice = ({ price, onPriceBlur, validationError }) => (
    <div className="my-offert__price">
        <label className="my-offert__label">Cena</label>
        <input type="number" className="my-offert__input" defaultValue={price} onBlur={e => onPriceBlur(e.target)}></input>
        <div className="my-offert__tip">Cena za miesiąc od osoby.</div>
        {validationError.Price && <div className="my-offert__validation-error">{validationError.Price}</div>}
    </div>
);

export default MyOffertPrice;