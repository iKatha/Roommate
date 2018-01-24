import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Renting';
import { getAreMyOffertsFetching } from '../../reducers/fetching';
import { getMyOfferts } from '../../reducers/Renting/offerts';
import { withRouter } from 'react-router-dom';
import Offert from '../../components/Renting/Offert';

class MyOfferts extends React.Component {
    componentDidMount() {
        const { fetchMyOfferts} = this.props;
        fetchMyOfferts();
    }

    render() {
        if (!localStorage.getItem('user'))
            return (
                <div className="my-offerts--not-logged">
                    <span>Aby przejrzeć swoje oferty lub dodać nową ofertę musisz się najpierw </span>
                    <div className="my-offerts__link"><NavLink className="my-offerts__link" activeClassName="my-offerts--active" to="/logowanie"> zalogować</NavLink></div>.
            </div>
            );
        const { offerts, isFetching, deleteOffert} = this.props;
        if (isFetching && !offerts.length)
            return (
                <div className="offert__loader">
                    Loading
                    <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        else
            return (
                <div className="my-offerts">
                    <NavLink to="/wynajem/moje-oferty/nowa-oferta" className="my-offerts__button"> Dodaj ofertę </NavLink>
                    {!offerts && <div className="my-offerts__empty">Brak ofert.</div>}
                <ul className="offert__list">
                    {offerts.map(offert =>
                        <Offert
                            key={offert.id}
                                offert={offert}
                                deleteOffert={deleteOffert}
                        />
                    )}
                </ul>
            </div>
            );
    }
}

const mapStateToProps = (state, { match }) => {
    const currentPage = match.params.pageNumber || '1';
    return {
        offerts: getMyOfferts(state),
        isFetching: getAreMyOffertsFetching(state),
    };
};

MyOfferts = withRouter(connect(
    mapStateToProps,
    actions
)(MyOfferts));

export default MyOfferts;