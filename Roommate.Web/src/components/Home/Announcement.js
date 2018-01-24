import React from 'react';

const Announcement = ({deleteMessage, Message, ShownDate, User, Id }) => (
    <li
        className="announcement__item"
    >
        {User.FirstName} {User.LastName}, {ShownDate}
        <div className="announcement__item--message">{Message}</div>
        {User.Email == localStorage.getItem('user') && <div className="announcement__delete" onClick={()=>deleteMessage(Id)}>Usuń</div>}
    </li>
);

export default Announcement;