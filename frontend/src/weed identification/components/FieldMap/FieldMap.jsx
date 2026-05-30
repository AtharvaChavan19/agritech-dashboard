import React, { useState } from 'react';
import './FieldMap.css';
import { MapPin, Tractor, X, ChevronUp, ChevronDown } from 'lucide-react';

const FieldMap = ({ data }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [startIndex, setStartIndex] = useState(8); // Default to showing rows around the rover (15) might be too high, let's start at 8

  const ROWS_TO_SHOW = 7;
  const TOTAL_ROWS = 20;

  // Generate all rows
  const allRows = Array.from({ length: TOTAL_ROWS }, (_, i) => ({
    id: i + 1,
    isCovered: i + 1 <= 15, // Mock: Rows up to 15 are covered
    hasRover: i + 1 === data.roverPosition.row
  }));

  // Slice rows for compact view (reverse order to show Row 20 at top? No, usually field maps show Row 1 at bottom or top.
  // Standard field view: 1 at bottom.
  const visibleRows = allRows.slice(startIndex - 1, startIndex - 1 + ROWS_TO_SHOW).reverse();

  const scrollUp = () => {
    if (startIndex + ROWS_TO_SHOW <= TOTAL_ROWS) {
      setStartIndex(prev => prev + 1);
    }
  };

  const scrollDown = () => {
    if (startIndex > 1) {
      setStartIndex(prev => prev - 1);
    }
  };

  const handleMarkerClick = (marker, e) => {
    e.stopPropagation();
    setSelectedMarker(marker);
  };

  return (
    <div className="card field-map">
      <div className="card-header">
        <h2 className="section-title">Field Map</h2>
      </div>

      <div className="map-scroll-container">
        <div className="scroll-controls">
          <button className="scroll-btn" onClick={scrollUp} disabled={startIndex + ROWS_TO_SHOW > TOTAL_ROWS}>
            <ChevronUp size={20} />
          </button>
          <div className="scroll-spacer"></div>
          <button className="scroll-btn" onClick={scrollDown} disabled={startIndex <= 1}>
            <ChevronDown size={20} />
          </button>
        </div>

        <div className="map-visualization">
          <div className="grid-container">
            {visibleRows.map(row => (
              <div 
                key={row.id} 
                className={`grid-row ${row.isCovered ? 'covered' : 'remaining'} ${row.hasRover ? 'rover-row' : ''}`}
              >
                <div className="row-label">Row {row.id}</div>
                
                {/* Render markers on this row */}
                {data.markers.filter(m => m.row === row.id).map(marker => (
                  <div 
                    key={marker.id} 
                    className="marker-wrapper"
                    style={{ left: `${marker.pos}%` }}
                    onClick={(e) => handleMarkerClick(marker, e)}
                  >
                    <MapPin size={18} className="map-marker-icon" fill="#ff4d4f" color="#fff" />
                  </div>
                ))}

                {/* Render Rover on this row */}
                {row.hasRover && (
                  <div className="rover-wrapper" style={{ left: `${data.roverPosition.pos}%` }}>
                     <Tractor size={20} className="map-rover-icon" />
                  </div>
                )}
              </div>
            ))}

            {/* Marker Detail Popup */}
            {selectedMarker && (
              <div className="marker-popup shadow">
                <div className="popup-header">
                  <span className="popup-title">Spray Event Detail</span>
                  <button className="close-btn" onClick={() => setSelectedMarker(null)}>
                    <X size={14} />
                  </button>
                </div>
                <div className="popup-body">
                  <div className="detail-row">
                    <span className="label">Species:</span>
                    <span className="value">{selectedMarker.species}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span className="value">Row {selectedMarker.row}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Time:</span>
                    <span className="value">{selectedMarker.timestamp}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="map-legend">
        <div className="legend-item">
          <Tractor size={14} className="legend-icon" />
          <span>ROVER POSITION</span>
        </div>
        <div className="legend-item">
          <MapPin size={14} className="legend-icon marker-red" />
          <span>SPRAY EVENT</span>
        </div>
        <div className="legend-item">
          <span className="legend-box covered-box"></span>
          <span>COVERED AREA</span>
        </div>
        <div className="legend-item">
          <span className="legend-box remaining-box"></span>
          <span>REMAINING AREA</span>
        </div>
      </div>
    </div>
  );
};

export default FieldMap;
