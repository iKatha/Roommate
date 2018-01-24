import React from 'react';

const MyOffertDescription = ({ charactersToUse, description, validationError, onDescriptionBlur, onDescriptionChange }) => (
    <div className="my-offert__description">
        <label className="my-offert__label">Opis (pozostało {charactersToUse} znaków)</label>
        <textarea className="my-offert__textarea my-offert__textarea--description" maxLength="750" defaultValue={description} onChange={e => onDescriptionChange(e.target.value)} onBlur={e => onDescriptionBlur(e.target)}></textarea>
        {validationError.Description && <div className="my-offert__validation-error">{validationError.Description}</div>}
    </div>
);

export default MyOffertDescription;