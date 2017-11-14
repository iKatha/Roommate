import React from 'react';
import { NavLink} from 'react-router-dom';

class MenuLink extends React.Component {
    render() {
        const { className, filter, children } = this.props;
        if (filter === 'home') {
            return (
                <NavLink
                    exact to='/'
                    className={className}
                    activeClassName="menu__item--active"
                >
                    {children}
                </NavLink>
            );
        } else {
            return (
                <NavLink
                    to= {'/' + filter}
                    className={className}
                    activeClassName="menu__item--active"
                >
                    {children}
                </NavLink>
            );
        }
    }
    
}

export default MenuLink;