import React from 'react';
import Menu from './Menu';
import SecondaryMenu from './SecondaryMenu';

const Header = () => (
    <div className="banner">
        <Menu />
        <div className="line line--left" ></div>
        <div className="line line--right" ></div>
        <SecondaryMenu />
    </div>
);

export default Header;