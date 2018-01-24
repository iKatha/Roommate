import React from 'react';
import { NavLink } from 'react-router-dom';

const Offert = ({offert, url, deleteOffert}) => (
    <li className="offert__element">
        <div className="offert__value--tittle">{offert.Tittle}</div>
        <div className="offert__column">
            <div className="offert__small-column offert__small-column--labels">
                <label className="offert__label">Lokalizacja: </label>
                <label className="offert__label">Cena: </label>
                <label className="offert__label">Powierzchnia: </label>
            </div>
            <div className="offert__small-column">
                <div className="offert__value">{offert.District}, {offert.City}, {offert.Province}</div>
                <div className="offert__value">{offert.Price}</div>
                <div className="offert__value">{offert.SurfaceArea}</div>
            </div>
        </div>
        <div className="offert__column">
            <div className="offert__small-column offert__small-column--labels">
                <label className="offert__label">Rodzaj pokoju: </label>
                <label className="offert__label">Ilość współlokatorów: </label>
                <label className="offert__label">Data dodania: </label>
            </div>
            <div className="offert__small-column">
                <div className="offert__value">{offert.RoomType}</div>
                <div className="offert__value">{offert.RoommateQuantity}</div>
                <div className="offert__value">{offert.ShownCreateDate}</div>
            </div>
        </div>
        {deleteOffert ? <button className="offert__button" onClick={()=>deleteOffert(offert.Id)}>Usuń</button> : <NavLink to={url + offert.Id} className="offert__link">Zobacz</NavLink>}
        
    </li>
);

export default Offert