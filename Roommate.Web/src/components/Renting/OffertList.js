import React from 'react';
import Offert from './Offert';
import PageNumbers from '../Core/PageNumbers';
import NotFoundPageError from '../Core/NotFoundError';

const OffertList = ({ offerts, currentPage }) => {
    const offertsPerPage = 10;
    const indexOfLastOffert = currentPage * offertsPerPage;
    const indexOfFirstOffert = indexOfLastOffert - offertsPerPage;
    const currentOfferts = offerts.slice(indexOfFirstOffert, indexOfLastOffert);
    const numberOfPages = Math.ceil(offerts.length / offertsPerPage);
    if (currentPage != 1 && currentPage > numberOfPages)
        return (<NotFoundPageError />);
    return (
        <div>
            <ul className="offert__list">
                {currentOfferts.map(offert =>
                    <Offert
                        key={offert.id}
                        offert={offert}
                        url="/wynajem/oferta/"
                    />
                )}
            </ul>
            {(numberOfPages > 1) && <PageNumbers numberOfPages={numberOfPages} />}
        </div>
    );
};

export default OffertList;