import React from 'react';
import './LatestSprayEvent.css';
import { Target, ChevronLeft, ChevronRight } from 'lucide-react';

const LatestSprayEvent = ({ data }) => {
  return (
    <div className="card latest-spray">
      <div className="card-header">
        <Target size={20} className="icon-green" />
        <h2 className="section-title">Latest Spray Event</h2>
      </div>

      <div className="spray-content">
        <div className="spray-image-container">
          <img src={data.image} alt="Target Weed" className="spray-image" />
          <div className="confidence-badge">{data.confidence}% Confidence</div>
          <div className="pagination">
            <button className="nav-btn"><ChevronLeft size={16} /></button>
            <span className="page-info">{data.id} / {data.totalEvents}</span>
            <button className="nav-btn"><ChevronRight size={16} /></button>
          </div>
        </div>

        <div className="spray-details">
          <div className="detail-header">
            <span className="detail-subtitle">TARGET IDENTIFIED</span>
            <h3 className="target-name">{data.targetSpecies}</h3>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">LOCATION</span>
              <span className="detail-value">{data.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">TIMESTAMP</span>
              <span className="detail-value">{data.timestamp}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">GPS COORDINATES</span>
              <span className="detail-value">{data.gps}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">CURRENT ACTION</span>
              <span className="detail-value action-active">{data.currentAction}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestSprayEvent;
