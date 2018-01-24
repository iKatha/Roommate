import React from 'react';

const MyOffertSurfaceArea = ({ surfaceArea, onSurfaceAreaBlur, validationError }) => (
    <div className="my-offert__surface-area">
        <label className="my-offert__label">Powierzchnia pokoju</label>
        <input type="number" className="my-offert__input" defaultValue={surfaceArea} onBlur={e => onSurfaceAreaBlur(e.target)}></input>
        <div className="my-offert__tip">W metrach kwadratowych.</div>
        {validationError.SurfaceArea && <div className="my-offert__validation-error">{validationError.SurfaceArea}</div>}
    </div>
);

export default MyOffertSurfaceArea;
