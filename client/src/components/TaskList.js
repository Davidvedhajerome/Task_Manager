import React, { useState } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onSelectTask, onGroupsChange }) => {
  // Group tasks by 'group' field
  const grouped = tasks.reduce((acc, task) => {
    const group = task.group || 'Ungrouped';
    if (!acc[group]) acc[group] = [];
    acc[group].push(task);
    return acc;
  }, {});
  const [addingGroup, setAddingGroup] = useState(false);
  const [newGroup, setNewGroup] = useState('');

  const groups = Object.keys(grouped);

  const handleAddGroup = () => {
    if (newGroup && !groups.includes(newGroup)) {
      if (onGroupsChange) onGroupsChange([...groups, newGroup]);
      setAddingGroup(false);
      setNewGroup('');
    }
  };

  return (
    <div className="task-list-grouped-container">
      {Object.entries(grouped).map(([group, groupTasks]) => (
        <div key={group} className="task-group-section">
          <div className="task-group-header">{group}</div>
          <div className="task-list-container">
            {groupTasks.map(task => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onSelect={onSelectTask}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="add-group-row">
        {addingGroup ? (
          <>
            <input
              type="text"
              value={newGroup}
              onChange={e => setNewGroup(e.target.value)}
              placeholder="New group name"
              className="add-group-input"
              autoFocus
            />
            <button onClick={handleAddGroup} className="add-group-btn">Add</button>
            <button onClick={() => setAddingGroup(false)} className="add-group-cancel">Cancel</button>
          </>
        ) : (
          <button onClick={() => setAddingGroup(true)} className="add-group-btn">+ Add group</button>
        )}
      </div>
    </div>
  );
};

export default TaskList; 