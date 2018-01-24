import React from "react";

const RoommatesAdmin = ({ areRoommatesFetching, roommates, invitationLink, leaveHomeMessage, kickRoommateMessage, changeAdminMessage, inviteRoommate, changeAdmin, leaveHome, kickRoommate }) => {
    if (areRoommatesFetching && !roommates.length)
        return (
            <div className="roommates__loader">
                Loading
                <div className="first-dot"></div>
                <div className="second-dot"></div>
                <div className="third-dot"></div>
            </div>
            );
    return (
        <div className="roommates">
            W celu zaproszenia współlokatora do grupy kliknij w poniższy przycisk. Następnie wyślij utworzony link. 
            <button className="roommates__button" onClick={inviteRoommate}>Link</button>
            {invitationLink && <label className="roommates__link">{invitationLink}</label>}

            <label className="roommates__table-label">Współlokatorzy:</label>
            <table>
                <tr>
                    <th></th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Punkty</th>
                    <th>Punkty w tym miesiącu</th>
                    <th>Zadanie wykonane/Zadania do wykonania</th>
                    <th>Zadanie wykonane/Zadania do wykonania (w tym miesiącu)</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                {
                    roommates.map(r => 
                        <tr k={r.Id}>
                            <td>{(r.Picture && <img src={r.Picture} className="roommates__photo-image" />) || <img src="../images/unknown-photo.png" className="roommates__photo-image" />}</td>
                            <td>{r.FirstName}</td>
                            <td>{r.LastName}</td>
                            <td>{r.TotalPoints}</td>
                            <td>{r.CurrentMonthPoints}</td>
                            <td>{r.TotalNumberOfCompletedTasks + '/' + r.TotalNumberOfTasks}</td>
                            <td>{r.CurrentMonthNumberOfCompletedTasks + '/' + r.CurrentMonthNumberOfTasks}</td>
                            {r.Email != localStorage.getItem('user') &&
                                <td className="roommates__edit-column" onClick={() => kickRoommate(r.Email)}>Usuń</td>
                            }
                            {r.Email != localStorage.getItem('user') &&
                                <td className="roommates__edit-column" onClick={() => changeAdmin(r.Email)}>Nadaj admina</td>
                            }
                        </tr>
                    )
                }
                </tbody>
            </table>
            {kickRoommateMessage && kickRoommateMessage }
            {changeAdminMessage && changeAdminMessage }
            Aby opuścić grupę kliknij w poniższy przycisk.
            <button className="roommates__button" onClick={leaveHome}>Opuść grupę</button>
            {leaveHomeMessage && leaveHomeMessage }
        </div>
    );
};

export default RoommatesAdmin;