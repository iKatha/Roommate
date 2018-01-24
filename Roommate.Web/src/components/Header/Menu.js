import React from 'react';
import LoggedMenu from './LoggedMenu';
import NotLoggedMenu from './NotLoggedMenu';

const Menu = () => {
    if (localStorage.getItem('user'))
        return <LoggedMenu/>;
    else
        return <NotLoggedMenu />;
};

export default Menu;