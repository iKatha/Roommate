import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNumbers = ({numberOfPages }) => {
    const pageNumbers = [];
    for (let i = 1; i < numberOfPages ; i++)
        pageNumbers.push(i);
    console.log(pageNumbers);
    const pagination = pageNumbers.map(number =>
        <NavLink
            key={number}
            exact to={'/wynajem/' + number}
            className="pagination__number"
            activeClassName="pagination__number--active"
        >
            {number}
                </NavLink>
    );
    return (
        <div className="pagination">
            {pagination}
        </div>
    );
};

export default PageNumbers;