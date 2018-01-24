import React from "react";

const RoommatesList = ({ areRoommatesFetching, roommates, leaveHome, leaveHomeMessage }) => {
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
            <label className="roommates__table-label">Współlokatorzy:</label>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Punkty</th>
                        <th>Punkty w tym miesiącu</th>
                        <th>Zadanie wykonane/Zadania do wykonania</th>
                        <th>Zadanie wykonane/Zadania do wykonania (w tym miesiącu)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roommates.map(r =>
                            <tr key={r.Id}>
                                <td>{(r.Picture && <img src={r.Picture} className="roommates__photo-image" />) || <img src="../images/unknown-photo.png" className="roommates__photo-image" />}</td>
                                <td>{r.FirstName}</td>
                                <td>{r.LastName}</td>
                                <td>{r.TotalPoints}</td>
                                <td>{r.CurrentMonthPoints}</td>
                                <td>{r.TotalNumberOfCompletedTasks +'/' + r.TotalNumberOfTasks}</td>
                                <td>{r.CurrentMonthNumberOfCompletedTasks + '/' + r.CurrentMonthNumberOfTasks}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            Aby opuścić grupę kliknij w poniższy przycisk.
                <button className="roommates__button" onClick={() => leaveHome()}>Opuść grupę</button>
        </div>
    );
}

export default RoommatesList;