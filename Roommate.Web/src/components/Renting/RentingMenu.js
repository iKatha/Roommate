import React from 'react';
import SecondaryMenuLink from '../../containers/Header/SecondaryMenuLink';

const SecondaryMenu = () => (
    <div className= "secondary-menu" >
        <SecondaryMenuLink filter='wynajem'>
            Oferty
        </SecondaryMenuLink>
        <SecondaryMenuLink filter='wynajem/moje-oferty'>
            Moje oferty
        </SecondaryMenuLink>
    </div>
);

export default SecondaryMenu;
