import React, { useState } from 'react';
import './ActivityLog.css';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ActivityLog = ({ logs }) => {
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_TO_SHOW = 3;

  const visibleLogs = logs.slice(startIndex, startIndex + ITEMS_TO_SHOW);

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  const scrollDown = () => {
    if (startIndex + ITEMS_TO_SHOW < logs.length) {
      setStartIndex(prev => prev + 1);
    }
  };

  return (
    <div className="card activity-log">
      <h2 className="card-title">Recent Activity Log</h2>
      
      <div className="log-container">
        <div className="log-list">
          {visibleLogs.map(log => (
            <div key={log.id} className="log-item">
              <div className={`log-indicator ${log.status}`}></div>
              <div className="log-content">
                <div className="log-main">
                  <span className="log-message">{log.message}</span>
                  <span className="log-time">{log.timestamp}</span>
                </div>
                <span className="log-detail">{log.detail}</span>
              </div>
            </div>
          ))}
          {logs.length === 0 && <div className="no-logs">No recent activity</div>}
        </div>

        <div className="log-scroll-controls">
          <button 
            className="log-scroll-btn" 
            onClick={scrollUp} 
            disabled={startIndex === 0}
          >
            <ChevronUp size={16} />
          </button>
          <button 
            className="log-scroll-btn" 
            onClick={scrollDown} 
            disabled={startIndex + ITEMS_TO_SHOW >= logs.length}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
