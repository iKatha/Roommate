import React from 'react';

const MyOffertPictures = ({validationError, onOffertImageChange, myOffertForm, removeImage}) => (
    <div>
        <label className="my-offert__label">Zdjęcia</label>
        {myOffertForm.images.map((img, index) => 
            <div key={index} className="my-offert__image-outer">
                <div className="my-offert__image-outer">
                    <img src={img} className="my-offert__image" />
                </div>
                <img className="my-offert__image-delete" src="/images/x_icon.png" onClick={() => removeImage(index)}/>
            </div>
        )}
        
        <input id="images" className="my-offert__image-input" type="file" accept="image/*" onChange={event => onOffertImageChange(event.target, myOffertForm.images.length)} />
        <label htmlFor="images">Wybierz zdjęcie</label>
        <div className="my-offert__tip">Maksymalna wielkość zdjęcia to 250Kb. Mkasymalnie 10 zdjęć.</div>
        {validationError.Images && <div className="my-offert__validation-error">{validationError.Images}</div>}
    </div>
);

export default MyOffertPictures;