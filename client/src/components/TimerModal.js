import React, { useRef, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import Modal from './Modal';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const TimerModal = ({ open, onClose }) => {
  const { tasks } = useTasks();
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedTask, setSelectedTask] = useState('');
  const [log, setLog] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (!running) {
      setRunning(true);
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
  };
  const pause = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
  };
  const reset = () => {
    setRunning(false);
    clearInterval(intervalRef.current);
    setSeconds(0);
  };
  const save = () => {
    setLog(l => [
      ...l,
      {
        taskId: selectedTask,
        taskTitle: tasks.find(t => t._id === selectedTask)?.title || 'Unassigned',
        duration: seconds,
        timestamp: new Date().toLocaleString(),
      },
    ]);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <h2>Timer</h2>
      <div style={{ fontSize: '2rem', margin: '1em 0' }}>{formatTime(seconds)}</div>
      <div style={{ marginBottom: '1em' }}>
        <select value={selectedTask} onChange={e => setSelectedTask(e.target.value)} style={{ fontSize: '1rem', padding: '0.5em', width: '100%' }}>
          <option value="">-- Select task (optional) --</option>
          {tasks.map(task => (
            <option key={task._id} value={task._id}>{task.title}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
        <button onClick={start} disabled={running}>Start</button>
        <button onClick={pause} disabled={!running}>Pause</button>
        <button onClick={reset}>Reset</button>
        <button onClick={save} disabled={seconds === 0}>Save</button>
      </div>
      <div style={{ marginTop: '2em' }}>
        <h4>Time Log (this session)</h4>
        {log.length === 0 && <div style={{ color: '#aaa' }}>No time logs yet.</div>}
        <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
          {log.map((entry, i) => (
            <li key={i} style={{ marginBottom: '0.7em', borderBottom: '1px solid #333', paddingBottom: '0.5em' }}>
              <div><b>{entry.taskTitle}</b> ({formatTime(entry.duration)})</div>
              <div style={{ fontSize: '0.9em', color: '#aaa' }}>{entry.timestamp}</div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default TimerModal; 