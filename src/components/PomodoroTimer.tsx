import React, { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  onClose: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onClose }) => {
  const [time, setTime] = useState(1500); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval!);
      alert("Time's up!");
    }
    return () => clearInterval(interval!);
  }, [isActive, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Pomodoro Timer</h2>
        <div className="timer">
          {formatTime(time)}
        </div>
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => setTime(1500)}>Reset</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;