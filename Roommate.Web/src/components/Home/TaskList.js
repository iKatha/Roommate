import React from "react";

const TaskList = ({ tasks, completeTask, onMarkTaskClick }) => {
    return (
        <div className="tasks__table-cover">
            <table>
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Zadanie</th>
                    <th>Pomieszczenie</th>
                    <th>Data</th>
                    <th>Wykonano</th>
                    <th>Średnia ocena</th>
                    <th>Moja ocena</th>
                </tr>
            </thead>
                <tbody>
            {
                tasks.map(t =>
                    <tr key={t.Id}>
                        <td>{t.User.FirstName}</td>
                        <td>{t.User.LastName}</td>
                        <td>{t.Name}</td>
                        <td>{t.RoomName}</td>
                        <td>{t.Date}</td>

                        {t.IsCompleted ?
                            <td>Tak</td> :
                            t.User.Email == localStorage.getItem('user') && t.CanBeCompleted ?
                                <td className="tasks__edit-column" onClick={() => completeTask(t.Id)}>Wykonaj</td> :
                                <td>Nie</td>
                        }

                        {t.AverageMark == 0 ?
                            <td>Brak</td> :
                            <td>{t.AverageMark}</td>
                        }
                        
                        {t.IsCompleted ?
                            t.User.Email == localStorage.getItem('user') ?
                                <td></td> :
                                t.MyMark == '0' ?
                                    <td className="tasks__edit-column" onClick={() => onMarkTaskClick(t.Id)}>Oceń</td> :
                                    <td>{t.MyMark}</td> :
                            <td></td>
                        }

                    </tr>
                )
            }
                    </tbody>
        </table>
        </div>
    );
}

export default TaskList;