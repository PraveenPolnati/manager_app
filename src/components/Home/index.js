import React, { Component } from "react";
import { Circles } from "react-loader-spinner";
import { v4 as uuidv4 } from 'uuid';
import { CiSearch } from "react-icons/ci";
import Navbar from '../Navbar';
import TaskTable from '../TaskTable';
import './index.css';

class Home extends Component {
    state = {
        isLoading: true,
        taskList: [],
        search: '',
        filterList: [],
        isNewtask: false,
        taskName: '',
        description: '',
        editableTaskId: null,
        editedName: '',
        editedDescription: '',
        isError:false
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.taskList !== this.state.taskList) {
            localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 100);

        const storedTaskList = localStorage.getItem('taskList');
        
        if (storedTaskList) {
            const parsedTaskList = JSON.parse(storedTaskList);
            this.setState({
                taskList: parsedTaskList.sort((a, b) => a.name.localeCompare(b.name)),
                filterList: parsedTaskList.sort((a, b) => a.name.localeCompare(b.name))
            });
        } else {
            const defaultTaskList = [
                { id: uuidv4(), name: 'HTML', description: 'Introduction to HTML' },
                { id: uuidv4(), name: 'CSS', description: 'Introduction to CSS' },
                { id: uuidv4(), name: 'JavaScript', description: 'Introduction to JS' },
                { id: uuidv4(), name: 'ReactJs', description: 'Introduction to ReactJs' }
            ];
            this.setState({
                taskList: defaultTaskList.sort((a, b) => a.name.localeCompare(b.name)),
                filterList: defaultTaskList.sort((a, b) => a.name.localeCompare(b.name))
            });
            localStorage.setItem('taskList', JSON.stringify(defaultTaskList.sort((a, b) => a.name.localeCompare(b.name))));
        }
    }

    onSorting = (event) => {
        const { taskList } = this.state;
        if (event.target.value === 'ASC') {
            this.setState({ taskList: taskList.sort((a, b) => a.name.localeCompare(b.name)) });
        } else {
            this.setState({ taskList: taskList.sort((a, b) => b.name.localeCompare(a.name)) });
        }
    }

    searchText = (event) => {
        this.setState({ search: event.target.value.toLowerCase() });
    }

    onClickSearch = (event) => {
        if (event.key === 'Enter') {
            const { taskList, search } = this.state;
            if (search.trim() === '') {
                this.setState({ filterList: taskList });
            } else {
                const filterList = taskList.filter(each => each.name.toLowerCase().includes(search));
                this.setState({ filterList });
            }
        }
    }

    onClickNewTask = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 100);
        this.setState({ isNewtask: true });
    }

    onSave = () => {
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 100);
        const { taskName, description } = this.state;
        if (taskName ==='' || description === ""){
            this.setState({isError:true})
        }else{
            const newTask = { id: uuidv4(), name: taskName, description };
            this.setState(prevState => ({
                taskList: [...prevState.taskList, newTask].sort((a, b) => a.name.localeCompare(b.name)),
                filterList: [...prevState.taskList, newTask].sort((a, b) => a.name.localeCompare(b.name)),
                isNewtask: false,
                isError:false,
                taskName:'',
                description:''
            }));
        }
    }

    onEnterTaskName = (event) => {
        this.setState({ taskName: event.target.value });
    }

    onEnterDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    onDeleteTask = (id) => {
        const { taskList } = this.state;
        const listAfterDelete = taskList.filter(each => each.id !== id);
        this.setState({ filterList: listAfterDelete, taskList: listAfterDelete });
    }

    onEdit = (id) => {
        const taskToEdit = this.state.taskList.find(each => each.id === id);
        this.setState({ 
            editableTaskId: id,
            editedName: taskToEdit.name,
            editedDescription: taskToEdit.description
        });
    }

    onEditName = (event) => {
        this.setState({ editedName: event.target.value });
    }

    onEditDescription = (event) => {
        this.setState({ editedDescription: event.target.value });
    }

    onSaveEdit = (id) => {
        const { taskList, editedName, editedDescription } = this.state;
        const updatedTaskList = taskList.map(task => 
            task.id === id ? { ...task, name: editedName, description: editedDescription } : task
        );
        this.setState({
            taskList: updatedTaskList.sort((a, b) => a.name.localeCompare(b.name)),
            filterList: updatedTaskList.sort((a, b) => a.name.localeCompare(b.name)),
            editableTaskId: null
        });
    }

    onDiscard = ()=>{
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 100);
        this.setState({ isNewtask: false });
    }

    render() {
        const { isLoading, filterList, isNewtask, editableTaskId, editedName, editedDescription,isError } = this.state;
        return (
            <div className="homeContainer">
                <Navbar />
                <div className="homeCard">
                    {isLoading ?
                        <div className="loaderCard">
                            <Circles color="skyblue" />
                        </div> :
                        <div className="managerCard">
                            <div className="sortingCard smallSortingCard">
                                <div className="actionsCard ">
                                    <select onChange={this.onSorting} className="sortingEle">
                                        <option>ASC</option>
                                        <option>DESC</option>
                                    </select>
                                    <div className="searchCard">
                                        <CiSearch />
                                        <input onKeyUp={this.onClickSearch} onChange={this.searchText} placeholder="search here" className="taskSearch" type="search" />
                                    </div>
                                </div>
                                <button onClick={this.onClickNewTask} className="newTask" type="button">New Task</button>
                            </div>
                            {isNewtask && <div className="newTaskCard">
                                <label htmlFor="taskname">Task Name</label>
                                <input onChange={this.onEnterTaskName} placeholder="Enter Name" className="taskName" id='taskname' type="text"/>
                                <label htmlFor="description">Description</label>
                                <input onChange={this.onEnterDescription} placeholder="Enter Description" className="taskName" id="description" type="text"/>
                                {isError && <p className="taskError">*name & description not to be empty</p>}
                                <div className="saveDiscard">
                                    <button onClick={this.onSave} className="saveBtn" type="button">save</button>
                                    <button onClick={this.onDiscard} className="discardBtn" type="button">Discard</button>
                                </div>
                            </div>}
                            <TaskTable
                                filterList={filterList}
                                editableTaskId={editableTaskId}
                                editedName={editedName}
                                editedDescription={editedDescription}
                                onEdit={this.onEdit}
                                onEditName={this.onEditName}
                                onEditDescription={this.onEditDescription}
                                onSaveEdit={this.onSaveEdit}
                                onDeleteTask={this.onDeleteTask}
                            />
                        </div>}
                </div>
            </div>)
    }
}

export default Home;
