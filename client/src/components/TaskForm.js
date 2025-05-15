import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskForm.css';

const TaskForm = ({ onSubmit, onCancel }) => {
  const { createTask, tasks } = useTasks();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    category: 'uncategorized',
    group: '',
    tags: [],
    subtasks: []
  });
  const [customGroup, setCustomGroup] = useState('');
  const [subtaskInput, setSubtaskInput] = useState('');

  // Get unique group names from tasks
  const groups = Array.from(new Set(tasks.map(t => t.group || 'New Group')));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const groupValue = customGroup.trim() ? customGroup.trim() : taskData.group;
    if (onSubmit) {
      await createTask({ ...taskData, group: groupValue });
      onSubmit({ ...taskData, group: groupValue });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setTaskData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setTaskData(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, { title: subtaskInput.trim(), status: 'todo' }]
      }));
      setSubtaskInput('');
    }
  };

  const handleRemoveSubtask = (idx) => {
    setTaskData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== idx)
    }));
  };

  const handleSubtaskTitleChange = (idx, value) => {
    setTaskData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map((st, i) => i === idx ? { ...st, title: value } : st)
    }));
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={taskData.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={taskData.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="group">Group</label>
            <select
              id="group"
              name="group"
              value={taskData.group}
              onChange={handleChange}
            >
              <option value="">Select group</option>
              {groups.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or enter new group"
              value={customGroup}
              onChange={e => setCustomGroup(e.target.value)}
              className="custom-group-input"
              style={{ marginTop: '0.5em' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtasks">Subtasks</label>
            <div className="subtasks-list">
              {taskData.subtasks.map((sub, idx) => (
                <div key={idx} className="subtask-row">
                  <input
                    type="text"
                    value={sub.title}
                    onChange={e => handleSubtaskTitleChange(idx, e.target.value)}
                    placeholder={`Subtask ${idx + 1}`}
                    className="subtask-input"
                  />
                  <button type="button" onClick={() => handleRemoveSubtask(idx)} className="remove-subtask-btn">✖</button>
                </div>
              ))}
              <div className="add-subtask-row">
                <input
                  type="text"
                  value={subtaskInput}
                  onChange={e => setSubtaskInput(e.target.value)}
                  placeholder="Add subtask"
                  className="subtask-input"
                />
                <button type="button" onClick={handleAddSubtask} className="add-subtask-btn">Add</button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={taskData.tags.join(', ')}
              onChange={handleTagsChange}
              placeholder="e.g., work, urgent, project"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">Create Task</button>
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm; 