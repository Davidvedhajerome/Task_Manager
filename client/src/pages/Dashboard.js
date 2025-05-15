import React, { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import TaskDetailsPanel from '../components/TaskDetailsPanel';
import TaskFilter from '../components/TaskFilter';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';
import './Dashboard.css';

const Dashboard = () => {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (taskId, updates) => {
    await updateTask(taskId, updates);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    return true;
  });

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <HeaderBar />
      <div className="dashboard-header">
        <h1>Task Dashboard</h1>
        <button 
          className="create-task-button"
          onClick={() => setShowTaskForm(true)}
        >
          Create New Task
        </button>
      </div>

      <TaskFilter filters={filters} onFilterChange={setFilters} />

      {showTaskForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowTaskForm(false)}
        />
      )}

      <TaskList
        tasks={filteredTasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onSelectTask={setSelectedTask}
      />

      {selectedTask && (
        <TaskDetailsPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default Dashboard; 