import React from 'react';
import './CurrentActivity.css';

const CurrentActivity = ({ data }) => {
  return (
    <div className="card current-activity">
      <h2 className="card-title">Current Activity</h2>
      
      <div className="activity-list">
        <div className="activity-row">
          <span className="activity-label">Current Task</span>
          <span className="activity-value task-active">{data.currentTask}</span>
        </div>
        <div className="activity-row">
          <span className="activity-label">Scanning Row</span>
          <span className="activity-value">{data.scanningRow}</span>
        </div>
        <div className="activity-row">
          <span className="activity-label">Est. Completion</span>
          <span className="activity-value">{data.estCompletion}</span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${data.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default CurrentActivity;
