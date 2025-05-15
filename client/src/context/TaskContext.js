import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/tasks', { withCredentials: true });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (taskData) => {
    const response = await axios.post('/api/tasks', taskData, { withCredentials: true });
    setTasks((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateTask = async (taskId, updates) => {
    const response = await axios.put(`/api/tasks/${taskId}`, updates, { withCredentials: true });
    setTasks((prev) => prev.map(task => task._id === taskId ? response.data : task));
    return response.data;
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`/api/tasks/${taskId}`, { withCredentials: true });
    setTasks((prev) => prev.filter(task => task._id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext); 