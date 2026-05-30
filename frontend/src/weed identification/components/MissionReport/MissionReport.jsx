import React from 'react';
import './MissionReport.css';

const MissionReport = () => {
  return (
    <div className="card mission-report">
      <h2 className="card-title">Mission Report</h2>
      <p className="report-desc">
        Generate a detailed summary of weed density and chemical usage for Block 4.
      </p>
      
      <div className="report-actions">
        <button className="btn btn-primary">Generate Report</button>
        <button className="btn btn-outline">Download PDF</button>
      </div>
    </div>
  );
};

export default MissionReport;
