import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskDetailsPanel.css';

const TaskDetailsPanel = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks();
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  if (!task) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateTask(task._id, editedTask);
    setEditMode(false);
  };

  const handleDelete = async () => {
    await deleteTask(task._id);
    onClose();
  };

  const handleSubtaskToggle = (idx) => {
    const updated = {
      ...editedTask,
      subtasks: editedTask.subtasks.map((st, i) =>
        i === idx ? { ...st, status: st.status === 'completed' ? 'todo' : 'completed' } : st
      )
    };
    setEditedTask(updated);
    updateTask(task._id, updated);
  };

  return (
    <div className="task-details-panel-overlay" onClick={onClose}>
      <div className="task-details-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        {editMode ? (
          <>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="details-title-input"
            />
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className="details-desc-input"
            />
            <div className="details-row">
              <label>Status:</label>
              <select name="status" value={editedTask.status} onChange={handleChange}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="details-row">
              <label>Priority:</label>
              <select name="priority" value={editedTask.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="details-row">
              <label>Due Date:</label>
              <input type="date" name="dueDate" value={editedTask.dueDate ? editedTask.dueDate.slice(0,10) : ''} onChange={handleChange} />
            </div>
            <div className="details-row">
              <label>Group:</label>
              <input type="text" name="group" value={editedTask.group} onChange={handleChange} />
            </div>
            <div className="details-row">
              <label>Tags:</label>
              <input type="text" name="tags" value={editedTask.tags ? editedTask.tags.join(', ') : ''} onChange={e => setEditedTask(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()) }))} />
            </div>
            <button onClick={handleSave} className="save-btn">Save</button>
          </>
        ) : (
          <>
            <h2>{task.title}</h2>
            <p className="details-desc">{task.description}</p>
            <div className="details-row"><b>Status:</b> {task.status}</div>
            <div className="details-row"><b>Priority:</b> {task.priority}</div>
            <div className="details-row"><b>Due Date:</b> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</div>
            <div className="details-row"><b>Group:</b> {task.group}</div>
            <div className="details-row"><b>Tags:</b> {task.tags && task.tags.length > 0 ? task.tags.join(', ') : '-'}</div>
            <div className="details-row"><b>Subtasks:</b></div>
            <ul className="details-subtasks-list">
              {task.subtasks && task.subtasks.length > 0 ? task.subtasks.map((sub, idx) => (
                <li key={idx} className={sub.status === 'completed' ? 'subtask-completed' : ''}>
                  <input type="checkbox" checked={sub.status === 'completed'} onChange={() => handleSubtaskToggle(idx)} /> {sub.title}
                </li>
              )) : <li style={{ color: '#aaa' }}>No subtasks</li>}
            </ul>
            <div className="details-actions">
              <button onClick={() => setEditMode(true)} className="edit-btn">Edit</button>
              <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsPanel; 