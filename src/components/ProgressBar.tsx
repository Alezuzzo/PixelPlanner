import React from 'react';
import '../styles/Component.css';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className='progress-bar-div'>
      <div className='progress-bar' style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;