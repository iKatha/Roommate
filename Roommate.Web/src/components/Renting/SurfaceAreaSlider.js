import React from 'react';

const SurfaceAreaSlider = ({onSurfaceAreaSlideChange, surfaceAreaRange}) => (
    <div className="surface-area">
        Powierzchnia pokoju
        <div className="surface-area__range">
            <div className="surface-area__range--min">{surfaceAreaRange.min} m<sup>2</sup></div>
            <div className="surface-area__range--max">{surfaceAreaRange.max} m<sup>2</sup></div>
            <input onChange={onSurfaceAreaSlideChange} defaultValue="0" min="0" max="100" step="5" type="range" id="firstSurfaceAreaSlide"/>
            <input onChange={onSurfaceAreaSlideChange} defaultValue="100" min="0" max="100" step="5" type="range" id="secondSurfaceAreaSlide"/>
        </div>
    </div>
);

export default SurfaceAreaSlider;