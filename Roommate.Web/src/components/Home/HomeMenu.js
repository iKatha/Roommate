import React from 'react';
import SecondaryMenuLink from '../../containers/Header/SecondaryMenuLink';

const HomeMenu = () => {
    return (
        <div className="secondary-menu" >
            <SecondaryMenuLink filter='mieszkanie'>
                Główna
        </SecondaryMenuLink>
            <SecondaryMenuLink filter='mieszkanie/zakupy'>
                Zakupy
        </SecondaryMenuLink>
            <SecondaryMenuLink filter='mieszkanie/rachunki'>
                Rachunki
        </SecondaryMenuLink>
            <SecondaryMenuLink filter='mieszkanie/grafik'>
                Grafik
        </SecondaryMenuLink>
            <SecondaryMenuLink filter='mieszkanie/mieszkancy'>
                Mieszkańcy
        </SecondaryMenuLink>
            {localStorage.getItem('homeAdmin') &&
                <SecondaryMenuLink filter='mieszkanie/konfiguracja'>
                    Konfiguracja
            </SecondaryMenuLink>
            }
        </div>
    );
};

export default HomeMenu;
