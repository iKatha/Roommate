import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/Home';
import { withRouter } from 'react-router-dom';
import { getIsFetching } from '../../reducers/fetching';
import { getJoinHomeMessage, getJoinHomeForm } from '../../reducers/Home/managingUsers';
import queryString from 'query-string';

class HomeInvitation extends React.Component {

    componentDidMount() {
        const { location, setIdAndToken } = this.props;
        const queryParams = queryString.parse(location.search);
        setIdAndToken(queryParams.id, queryParams.token);
    }

    render() {
        const { isLoading, joinHomeForm, joinHomeMessage, joinHome} = this.props;
        return (
            <div className="join-home">
                W celu dołączenia do grupy mieszkania kliknij w poniższy przycisk.
                <button onClick={() => joinHome(joinHomeForm)} className="join-home__button">Dołącz</button>
                {isLoading &&
                    <div className="join-home__loader">
                        Trwa dołączanie do mieszkania
                <div className="first-dot"></div>
                        <div className="second-dot"></div>
                        <div className="third-dot"></div>
                    </div>
                }
                {joinHomeMessage && joinHomeMessage}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: getIsFetching(state),
        joinHomeMessage: getJoinHomeMessage(state),
        joinHomeForm: getJoinHomeForm(state)
    };
};

HomeInvitation = withRouter(connect(
    mapStateToProps,
    actions
)(HomeInvitation));


export default HomeInvitation;