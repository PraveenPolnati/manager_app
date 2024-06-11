import React from 'react';
import './index.css'

class TaskTable extends React.Component {
    render() {
        const { 
            filterList, 
            editableTaskId, 
            editedName, 
            editedDescription, 
            onEdit, 
            onEditName, 
            onEditDescription, 
            onSaveEdit, 
            onDeleteTask 
        } = this.props;

        return (
            <div className="tabelcard">
                <table className="taskTable">
                    <thead>
                        <tr>
                            <th className="headerCell">Task Name</th>
                            <th className="headerCell">Description</th>
                            <th className="headerCell">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterList.map(each => (
                                <tr key={each.id}>
                                    <td className="dataCell">
                                        {editableTaskId === each.id ? 
                                            <input value={editedName} onChange={onEditName} type="text"/> : 
                                            each.name}
                                    </td>
                                    <td className="dataCell">
                                        {editableTaskId === each.id ? 
                                            <input value={editedDescription} onChange={onEditDescription} type="text"/> : 
                                            each.description}
                                    </td>
                                    <td className="dataCell">
                                        {editableTaskId === each.id ? 
                                            <button className='EditSaveBtn' onClick={() => onSaveEdit(each.id)} type="button">Save</button> :
                                            <button className='EditSaveBtn' onClick={() => onEdit(each.id)} type="button">Edit</button>}
                                        <button className='deleteBtn' onClick={() => onDeleteTask(each.id)} type="button">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TaskTable;
