import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import * as actions from '../../actions/Home';
import { getAreRoommatesFetching } from '../../reducers/fetching';
import { getChangeAdminMessage, getRoommates, getInvitationLink, getLeaveHomeMessage, getKickRoommateMessage} from '../../reducers/Home/managingUsers';
import RoommatesAdmin from '../../components/Home/RoommatesAdmin';
import RoommatesList from '../../components/Home/RoommatesList';

class Roommates extends React.Component {
    componentDidMount() {
        const { fetchRoommates } = this.props;
        fetchRoommates();
    }

    render() {
        const { areRoommatesFetching, roommates, invitationLink, leaveHomeMessage, kickRoommateMessage, changeAdminMessage, inviteRoommate, changeAdmin, leaveHome, kickRoommate } = this.props;
        if (leaveHomeMessage == "Opuściłeś grupę mieszkania.")
            return (
                <Route render={(props) => (
                    <Redirect to="/" />
                )} />
            );
        if(localStorage.getItem('homeAdmin'))
            return (
                <RoommatesAdmin areRoommatesFetching={areRoommatesFetching} roommates={roommates} invitationLink={invitationLink} leaveHomeMessage={leaveHomeMessage} kickRoommateMessage={kickRoommateMessage} changeAdminMessage={changeAdminMessage} inviteRoommate={inviteRoommate} changeAdmin={changeAdmin} leaveHome={leaveHome} kickRoommate={kickRoommate}/>
            );
        return <RoommatesList areRoommatesFetching={areRoommatesFetching} roommates={roommates} leaveHome={leaveHome} leaveHomeMessage={leaveHomeMessage}/>
    }
}

const mapStateToProps = (state) => {
    return {
        areRoommatesFetching: getAreRoommatesFetching(state),
        changeAdminMessage: getChangeAdminMessage(state),
        roommates: getRoommates(state),
        invitationLink: getInvitationLink(state),
        leaveHomeMessage: getLeaveHomeMessage(state),
        kickRoommateMessage: getKickRoommateMessage(state),
    };
};

Roommates = withRouter(connect(
    mapStateToProps,
    actions
)(Roommates));

export default Roommates;