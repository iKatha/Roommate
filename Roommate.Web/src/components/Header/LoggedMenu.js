import React from 'react';
import MenuLink from '../../containers/Header/MenuLink';
import { logout } from '../../actions/Logging';
import { NavLink } from 'react-router-dom';


const LoggedMenu = () => (
    <div>
        <div className="menu menu--left">
            <MenuLink className="menu__item menu__item--left" filter="home">
                Home
            </MenuLink>
            <MenuLink className="menu__item menu__item--left" filter="wynajem">
                Wynajem
            </MenuLink>
            <MenuLink className="menu__item menu__item--left" filter="kontakt">
                Kontakt
            </MenuLink>
        </div>
        <div className="menu menu--right">
            <MenuLink className="menu__item menu__item--right" filter="mieszkanie">
                Mieszkanie
            </MenuLink>
            <MenuLink className="menu__item menu__item--right" filter="konto">
                Konto
            </MenuLink>
            
            <NavLink
                exact to='/'
                className="menu__item menu__item--right"
                onClick={logout}
            >
                Wyloguj
            </NavLink>
            
        </div>
    </div>
);

export default LoggedMenu;