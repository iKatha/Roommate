import React from 'react';
import MenuLink from '../../containers/Header/MenuLink';

const NotLoggedMenu = () => (
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
            <MenuLink className="menu__item menu__item--right" filter="logowanie">
                Logowanie
                </MenuLink>
            <MenuLink className="menu__item menu__item--right" filter="rejestracja">
                Rejestracja
                </MenuLink>
        </div>
    </div>
);

export default NotLoggedMenu;