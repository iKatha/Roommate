import React from 'react';

const MyOffertTittle = ({ tittle, validationError, onTittleBlur}) => (
    <div className="my-offert__tittle">
        <label className="my-offert__label">Tytuł</label>
        <textarea maxLength="120" className="my-offert__textarea my-offert__textarea--tittle" defaultValue={tittle} onBlur={e => onTittleBlur(e.target)}></textarea>
        <div className="my-offert__tip">Maksymalnie 120 znaków.</div>
        {validationError.Tittle && <div className="my-offert__validation-error">{validationError.Tittle}</div>}
    </div>
);

export default MyOffertTittle;