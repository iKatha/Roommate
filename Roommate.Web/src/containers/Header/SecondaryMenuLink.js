import React from 'react';
import { NavLink } from 'react-router-dom';

const SecondaryMenuLink = ({filter, children }) => (
    <NavLink
        exact to={'/' + filter}
        className="secondary-menu__item"
        activeClassName="secondary-menu__item--active"
    >
        {children}
    </NavLink>
);

export default SecondaryMenuLink;