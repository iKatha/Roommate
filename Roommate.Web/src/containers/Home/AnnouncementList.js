import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/Announcement';
import { getIsAnnouncementListFetching } from '../../reducers/fetching';
import { getCreateHomeMessage } from '../../reducers/Home';
import Announcement from '../../components/Home/Announcement';
import { getCharactersToUse, getMessage, getAnnouncementList } from '../../reducers/Home/announcement';

class AnnouncementList extends Component {
    componentDidMount() {
        const { fetchAnnouncementList } = this.props;
        fetchAnnouncementList();
    }

    render() {
        const { isAnnouncementListFetching, announcementList, addAnnouncement, message, onMessageBlur, charactersToUse, onMessageChange, deleteAnnouncement } = this.props;
        var isListEmpty = announcementList.length == 0
        if (isAnnouncementListFetching && !announcementList.length) {
            return (
                <div className="announcement announcement__loader">
                    Loading
                <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        }
        return (
            <div className="announcement">
                <div className="column-one">
                    <textarea className="announcement__message" maxLength="750" defaultValue={message} onChange={e => onMessageChange(e.target.value)} onBlur={event => onMessageBlur(event.target.value)}></textarea>
                    <label className="announcement__label">pozostało {charactersToUse} znaków.</label>
                </div>
                <div className="column-two">
                    {message && <button className="announcement__button" onClick={() => addAnnouncement(message)}>Dodaj</button>}
                    {!message && <button className="announcement__button disabled">Dodaj</button>}
                </div>
                {isListEmpty &&
                    <div className="announcement__empty">Brak ogłoszeń.</div>
                }
                <ul className="announcement__list">
                    {announcementList.map(item =>
                        <Announcement
                            deleteMessage={deleteAnnouncement}
                            key={item.Id}
                            {...item}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAnnouncementListFetching: getIsAnnouncementListFetching(state),
        announcementList: getAnnouncementList(state),
        message: getMessage(state),
        charactersToUse: getCharactersToUse(state)
    };
};

AnnouncementList = withRouter(connect(
    mapStateToProps,
    actions
)(AnnouncementList));

export default AnnouncementList;