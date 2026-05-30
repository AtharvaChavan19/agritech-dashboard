import React from 'react';
import './MissionSummary.css';

const MissionSummary = ({ data }) => {
  return (
    <div className="card mission-summary">
      <h2 className="card-title">Today's Mission Summary</h2>
      
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-value">{data.totalWeeds}</span>
          <span className="summary-label">WEEDS</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">{data.totalSprays}</span>
          <span className="summary-label">SPRAYS</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">{data.areaCovered}</span>
          <span className="summary-label">COVERAGE</span>
        </div>
        <div className="summary-item">
          <span className="summary-value">{data.rowsCompleted} / {data.totalRows}</span>
          <span className="summary-label">ROWS</span>
        </div>
      </div>
    </div>
  );
};

export default MissionSummary;
