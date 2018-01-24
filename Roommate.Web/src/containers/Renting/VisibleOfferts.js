import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Renting';
import { getIsAllOffertsFetching } from '../../reducers/fetching';
import { getAllOfferts } from '../../reducers/Renting/offerts';
import { getRentingFilter } from '../../reducers/Renting/rentingFilter';
import OffertList from '../../components/Renting/OffertList';
import { withRouter } from 'react-router-dom';


class VisibleOfferts extends React.Component {
    componentDidMount() {
        const { fetchOfferts, rentingFilter} = this.props;
        fetchOfferts(rentingFilter);
    }

    componentDidUpdate(prevProps) {
        const { fetchOfferts, rentingFilter } = this.props;
        if (rentingFilter !== prevProps.rentingFilter) {
            fetchOfferts(rentingFilter);
        }
    }

    render() {
        const { offerts, isFetching, currentPage } = this.props;
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
                <OffertList offerts={offerts} currentPage={currentPage}/>
            );
    }
}

const mapStateToProps = (state, { match }) => {
    const currentPage = match.params.pageNumber || '1';
    return {
        offerts: getAllOfferts(state),
        rentingFilter: getRentingFilter(state),
        isFetching: getIsAllOffertsFetching(state),
        currentPage
    };
};

VisibleOfferts = withRouter(connect(
    mapStateToProps,
    actions
)(VisibleOfferts));

export default VisibleOfferts;