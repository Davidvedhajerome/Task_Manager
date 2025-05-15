import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onUpdate, onDelete, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleStatusChange = (newStatus) => {
    onUpdate(task._id, { ...task, status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    onUpdate(task._id, { ...task, priority: newPriority });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task._id, editedTask);
    setIsEditing(false);
  };

  const priorityColors = {
    high: '#dc3545',
    medium: '#ffc107',
    low: '#28a745'
  };

  return (
    <div className="task-item" style={{ borderLeft: `4px solid ${priorityColors[task.priority]}` }}>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="task-edit-form">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Task title"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder="Task description"
          />
          <div className="task-edit-actions">
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="task-header" onClick={() => onSelect && onSelect(task)} style={{ cursor: onSelect ? 'pointer' : 'default' }}>
            <h3>{task.title}</h3>
            <div className="task-actions">
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Edit
              </button>
              <button onClick={() => onDelete(task._id)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
          <p className="task-description">{task.description}</p>
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="subtasks-list-display">
              {task.subtasks.map((sub, idx) => (
                <div key={idx} className="subtask-display">
                  <span className="subtask-bullet">•</span> {sub.title}
                </div>
              ))}
            </div>
          )}
          <div className="task-meta">
            <div className="task-status">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="status-select"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="task-priority">
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="priority-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          {task.dueDate && (
            <div className="task-due-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </div>
          )}
          {task.assignedTo && task.assignedTo.length > 0 && (
            <div className="task-assignees">
              {task.assignedTo.map(user => (
                <img
                  key={user._id}
                  src={user.avatar}
                  alt={user.name}
                  title={user.name}
                  className="assignee-avatar"
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskItem; 