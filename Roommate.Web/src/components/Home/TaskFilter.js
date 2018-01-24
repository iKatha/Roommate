import React from "react";

const TaskFilter = ({ tasks, changeIsCompletedFilter, changeUserFilter, changeNameFilter, changeMyMarkFilter, filter, filterTasks}) => {
    return (
        <div >
            <div className="tasks__filter">
                <label className="tasks__filter-label">Nazwa: </label>
                <input
                    defaultChecked="checked"
                    type="radio"
                    id="filterNameAll"
                    name="name"
                    value="all"
                    onClick={e => changeNameFilter(e.target.value)} />
                <label htmlFor="filterNameAll"> wszystko </label>
                <input
                    type="radio"
                    id="filterNameCleaning"
                    name="name"
                    value="sprzątanie"
                    onClick={e => changeNameFilter(e.target.value)} />
                <label htmlFor="filterNameCleaning"> sprzątanie </label>
                <input
                    type="radio"
                    id="filterNameWashing"
                    name="name"
                    value="mycie naczyń"
                    onClick={e => changeNameFilter(e.target.value)} />
                <label htmlFor="filterNameWashing"> mycie naczyń </label>
                <input
                    type="radio"
                    id="filterNameWatering"
                    name="name"
                    value="podlewanie kwiatków"
                    onClick={e => changeNameFilter(e.target.value)} />
                <label htmlFor="filterNameWatering"> podlewanie kwiatków </label>
            </div>

            <div className="tasks__filter">
                <label className="tasks__filter-label">Osoby: </label>
                <input
                    defaultChecked="checked"
                    type="radio"
                    id="filterUserAll"
                    name="user"
                    value="all"
                    onClick={e => changeUserFilter(e.target.value)} /> 
                <label htmlFor="filterUserAll"> wszyscy </label>
                <input
                    type="radio"
                    id="filterUserMe"
                    name="user"
                    value="me"
                    onClick={e => changeUserFilter(e.target.value)} />
                <label htmlFor="filterUserMe"> tylko ja </label>
            </div>

            <div className="tasks__filter">
                <label className="tasks__filter-label">Wykonane: </label>
                <input
                    defaultChecked="checked"
                    type="radio"
                    id="filterIsCompletedAll"
                    name="isCompleted"
                    value="all"
                    onClick={e => changeIsCompletedFilter(e.target.value)} />
                <label htmlFor="filterIsCompletedAll"> wszystkie </label>
                <input
                    type="radio"
                    id="filterIsCompletedTrue"
                    name="isCompleted"
                    value="true"
                    onClick= {() => changeIsCompletedFilter(true)} />
                <label htmlFor="filterIsCompletedTrue"> tak </label>
                <input
                    type="radio"
                    id="filterIsCompletedFalse"
                    name="isCompleted"
                    value="false"
                    onClick={() => changeIsCompletedFilter(false)} />
                <label htmlFor="filterIsCompletedFalse"> nie </label>
            </div>

            <div className="tasks__filter">
                <label className="tasks__filter-label">Oceniono: </label>
                <input
                    defaultChecked="checked"
                    type="radio"
                    id="filterMyMarkAll"
                    name="myMark"
                    value="all"
                    onClick={e => changeMyMarkFilter(e.target.value)} />
                <label htmlFor="filterMyMarkAll"> wszystko </label>
                <input
                    type="radio"
                    id="filterMyMarkFalse"
                    name="myMark"
                    value="nie"
                    onClick={e => changeMyMarkFilter(e.target.value)} />
                <label htmlFor="filterMyMarkFalse"> nie </label>

                <button onClick={()=>filterTasks(tasks, filter)} className="tasks__filter-button">Filtruj</button>
            </div>
        </div>
    );
}

export default TaskFilter;