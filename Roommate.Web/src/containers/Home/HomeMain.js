import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Redirect } from 'react-router-dom';
import * as actions from '../../actions/Home';
import {getIsAuthNeeded } from '../../reducers/Account/authentication';
import { getIsFetching } from '../../reducers/fetching';
import { getCreateHomeMessage } from '../../reducers/Home';
import AnnouncementList from './AnnouncementList';

class HomeMain extends React.Component {
    render() {
        const {isAuthNeeded, createHomeMessage, isLoading, createHome } = this.props;
        if(!localStorage.getItem('home'))
            return (
                <div className="home-main">
                    {isAuthNeeded && <div className="home-main__auth-needed"> Aby mieć dostęp do tej strony musisz należeć do grupy mieszkania. </div>}
                    W celu utworzenia grupy mieszkania kliknij w poniższy przycisk:
                    <button className="home-main__button" onClick={createHome}>Utwórz</button>
                    {isLoading && <div className="home-main__loader">
                        Trwa tworzenie grupy
                        <div className="first-dot"></div>
                        <div className="second-dot"></div>
                        <div className="third-dot"></div>
                    </div>}
                    {createHomeMessage && { createHomeMessage }}
                    < br />
                    Aby dołączyć do istniejącej już grupy - poproś admina o wysłanie linku z zaproszeniem.
                </div>
            );
        return (
            <AnnouncementList />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthNeeded: getIsAuthNeeded(state),
        isLoading: getIsFetching(state),
        createHomeMessage: getCreateHomeMessage(state)
    };
};

HomeMain = withRouter(connect(
    mapStateToProps,
    actions
)(HomeMain));

export default HomeMain;