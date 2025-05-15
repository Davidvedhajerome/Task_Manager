import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './HeaderBar.css';

const viewTitles = {
  '/dashboard': 'All tasks',
  '/today': 'today',
  '/timesheets': 'Timesheets',
};

const HeaderBar = () => {
  const location = useLocation();
  const { darkMode } = useTheme();
  const [exportOpen, setExportOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewType, setViewType] = useState('list');
  const [filter, setFilter] = useState({
    notStarted: false,
    inProgress: false,
    incomplete: false,
    completed: true,
  });

  const title = viewTitles[location.pathname] || 'today';

  return (
    <header className={`headerbar${darkMode ? ' dark' : ''}`}>
      <div className="headerbar-title">{title}</div>
      <div className="headerbar-actions">
        <div className="dropdown">
          <button onClick={() => setExportOpen((v) => !v)} className="dropdown-btn">Export ▾</button>
          {exportOpen && (
            <div className="dropdown-menu">
              <button>Print todo-list</button>
              <button>Save as PDF</button>
            </div>
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => setViewOpen((v) => !v)} className="dropdown-btn">{viewType === 'list' ? 'List view' : 'Tiles view'} ▾</button>
          {viewOpen && (
            <div className="dropdown-menu">
              <button className={viewType === 'list' ? 'active' : ''} onClick={() => setViewType('list')}>List view</button>
              <button className={viewType === 'tiles' ? 'active' : ''} onClick={() => setViewType('tiles')}>Tiles view</button>
            </div>
          )}
        </div>
        <div className="dropdown">
          <button onClick={() => setFilterOpen((v) => !v)} className="dropdown-btn">Filter ▾</button>
          {filterOpen && (
            <div className="dropdown-menu filter-menu">
              <div className="filter-title">Task Filters</div>
              <div className="filter-group">
                <label><input type="checkbox" checked={filter.notStarted} onChange={() => setFilter(f => ({...f, notStarted: !f.notStarted}))} /> Not started</label>
                <label><input type="checkbox" checked={filter.inProgress} onChange={() => setFilter(f => ({...f, inProgress: !f.inProgress}))} /> Marked in progress</label>
                <label><input type="checkbox" checked={filter.incomplete} onChange={() => setFilter(f => ({...f, incomplete: !f.incomplete}))} /> Incomplete tasks</label>
                <label><input type="checkbox" checked={filter.completed} onChange={() => setFilter(f => ({...f, completed: !f.completed}))} /> Completed tasks</label>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderBar; 