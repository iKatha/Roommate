import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/Tasks';
import { getAreTasksFetching } from '../../reducers/fetching';
import { getTaskList, getVisibleTaskList, getFilter, getCurrentTaskIdToMark, getMark } from '../../reducers/Home/tasks';
import TaskList from '../../components/Home/TaskList';
import TaskFilter from '../../components/Home/TaskFilter';
import Modal from '../../components/Core/Modal';

class Tasks extends Component {
    componentDidMount() {
        const { fetchTasks } = this.props;
        fetchTasks();
    }

    render() {
        const { areTasksFetching, taskList, markTask, completeTask, onMarkTaskClick, visibleTaskList, changeIsCompletedFilter, changeUserFilter, changeNameFilter, changeMyMarkFilter, filter, filterTasks, closeModal, currentTaskIdToMark, setMark, mark } = this.props;
        if (areTasksFetching) {
            return (
                <div className="tasks tasks__loader">
                    Loading
                <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        }
        return (
            <div className="tasks">
                <TaskFilter tasks={taskList} changeIsCompletedFilter={changeIsCompletedFilter} changeUserFilter={changeUserFilter} changeNameFilter={changeNameFilter} changeMyMarkFilter={changeMyMarkFilter} filter={filter} filterTasks={filterTasks}/>
                <TaskList tasks={visibleTaskList} onMarkTaskClick={onMarkTaskClick} completeTask={completeTask} />

                <Modal closeModal={closeModal} header="Oceń zadanie" modalId="markTaskModal">
                    <div className="tasks__mark-task">
                        <img id="mark1" onClick={e => setMark(e.target, 1)} className="tasks__image" src="../images/mark_task_empty.png"/>
                        <img id="mark2" onClick={e => setMark(e.target, 2)} className="tasks__image" src="../images/mark_task_empty.png"/>
                        <img id="mark3" onClick={e => setMark(e.target, 3)} className="tasks__image" src="../images/mark_task_empty.png"/>
                        <img id="mark4" onClick={e => setMark(e.target, 4)} className="tasks__image" src="../images/mark_task_empty.png"/>
                        <img id="mark5" onClick={e => setMark(e.target, 5)} className="tasks__image" src="../images/mark_task_empty.png" />
                    </div>
                    <div className="tasks__mark-description">Oceń w skali od 1 - 5 klikając na miotełkę, wykonanie obowiązku przez współlokatora.</div>
                    <button className="tasks__mark-button" onClick={() => markTask(currentTaskIdToMark, mark)}>Oceń</button>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        areTasksFetching: getAreTasksFetching(state),
        taskList: getTaskList(state),
        visibleTaskList: getVisibleTaskList(state),
        filter: getFilter(state),
        currentTaskIdToMark: getCurrentTaskIdToMark(state),
        mark: getMark(state)
    };
};

Tasks = withRouter(connect(
    mapStateToProps,
    actions
)(Tasks));

export default Tasks;