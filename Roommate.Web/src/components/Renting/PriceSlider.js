import React from 'react';

const PriceSlider = ({onPriceSlideChange, priceRange}) => (
    <div className="price">
        Cena za miesiąc
        <div className="price__range">
            <div className="price__range--min">{priceRange.min} zł</div>
            <div className="price__range--max">{priceRange.max} zł</div>
            <input onChange={onPriceSlideChange} defaultValue="0" min="0" max="2000" step="100" type="range" id="firstPriceSlide"/>
            <input onChange={onPriceSlideChange} defaultValue="2000" min="0" max="2000" step="100" type="range" id="secondPriceSlide"/>
        </div>
    </div>
);

export default PriceSlider;