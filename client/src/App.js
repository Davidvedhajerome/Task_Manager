import React, { createContext, useContext, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import TaskForm from './components/TaskForm';
import TimerModal from './components/TimerModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTasks } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

const SearchModal = ({ open, onClose }) => {
  const { tasks } = useTasks();
  const [query, setQuery] = useState('');
  const filtered = tasks.filter(
    t =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(query.toLowerCase()))
  );
  return (
    <Modal open={open} onClose={onClose}>
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search tasks and comments"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: '100%', fontSize: '1.1rem', padding: '0.7em', marginBottom: '1em' }}
        autoFocus
      />
      <div>
        {query && filtered.length === 0 && <div>No results found.</div>}
        {filtered.map(task => (
          <div key={task._id} className="search-result-task" style={{padding: '0.7em 0', borderBottom: '1px solid #333'}}>
            <div style={{fontWeight: 'bold'}}>{task.title}</div>
            <div style={{fontSize: '0.95em', color: '#aaa'}}>{task.description}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [modal, setModal] = useState(null); // 'timer' | 'search' | 'addTask' | null

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <ModalContext.Provider value={{ openModal, closeModal }}>
            <Router>
              <div className="app">
                <Sidebar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </main>
                <TimerModal open={modal === 'timer'} onClose={closeModal} />
                <SearchModal open={modal === 'search'} onClose={closeModal} />
                <Modal open={modal === 'addTask'} onClose={closeModal}>
                  <h2>New task</h2>
                  <TaskForm onSubmit={closeModal} onCancel={closeModal} />
                </Modal>
              </div>
            </Router>
          </ModalContext.Provider>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
