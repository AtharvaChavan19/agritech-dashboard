import React, { useState } from 'react';
import {
  Sprout,
  LayoutGrid,
  Grid,
  History,
  Settings,
  HelpCircle,
  LogOut,
  Upload,
  Sliders,
  SlidersHorizontal,
  Play,
  ZoomIn,
  ZoomOut,
  Layers,
  Maximize2,
  FileText,
  Table,
  Save,
  MapPin
} from 'lucide-react';
import aerialCropImg from '../assets/aerial_crop.png';

function GapDashboard({ onNavigate }) {
  const [confidence, setConfidence] = useState(85);
  const [sensitivity, setSensitivity] = useState('Balanced Enterprise');
  const [hoveredAnomaly, setHoveredAnomaly] = useState(null);
  const [isGridActive, setIsGridActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLayer, setSelectedLayer] = useState('all'); // all, primary, none

  // Mock anomalies data matching the code
  const anomalies = [
    {
      id: 'GAP-01',
      lat: '19.0760° N',
      lng: '72.8777° E',
      confidence: 98,
      style: { top: '10%', left: '59%', width: '13%', height: '12%' }
    },
    {
      id: 'GAP-02',
      lat: '19.0765° N',
      lng: '72.8781° E',
      confidence: 94,
      style: { top: '26%', left: '70%', width: '15%', height: '14%' }
    },
    {
      id: 'GAP-03',
      lat: '19.0772° N',
      lng: '72.8788° E',
      confidence: 89,
      style: { top: '21%', left: '85%', width: '12%', height: '11%' }
    },
    {
      id: 'GAP-04',
      lat: '19.0778° N',
      lng: '72.8794° E',
      confidence: 85,
      style: { top: '55%', left: '62%', width: '18%', height: '16%' }
    }
  ];

  // Filter anomalies based on slider confidence threshold
  const filteredAnomalies = anomalies.filter(a => a.confidence >= confidence);

  // Dynamic KPI stats based on filtered anomalies
  const totalGaps = filteredAnomalies.length;
  const baseGaps = 20; // baseline of other non-critical gaps
  const displayGaps = baseGaps + totalGaps;
  const affectedArea = (displayGaps * 0.05).toFixed(1);
  const healthScore = Math.max(70, 100 - displayGaps).toFixed(0);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.9));
  };

  const toggleGrid = () => {
    setIsGridActive(prev => !prev);
  };

  const handleActionPin = (id) => {
    setHoveredAnomaly(id);
    setTimeout(() => {
      alert(`Pinpointed ${id} on plantation coordinate map.`);
    }, 100);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={() => onNavigate('landing')} style={{ cursor: 'pointer' }}>
          <div className="sidebar-logo-icon">
            <Sprout size={24} strokeWidth={2.5} />
          </div>
          <div className="sidebar-logo-text">
            <h2>AgriTech</h2>
          </div>
        </div>

        <nav className="sidebar-menu">
          <button className="menu-item" onClick={() => { }} id="menu-overview">
            <LayoutGrid size={18} />
            <span>Overview</span>
          </button>
          <button className="menu-item active" onClick={() => { }} id="menu-gap-detector">
            <Grid size={18} />
            <span>Gap Detector</span>
          </button>
          <button className="menu-item" onClick={() => onNavigate('weed-detector')} id="menu-weed-detector">
            <Sprout size={18} />
            <span>Weed Detector</span>
          </button>
          <button className="menu-item" onClick={() => { }} id="menu-historical">
            <History size={18} />
            <span>Historical</span>
          </button>
          <button className="menu-item" onClick={() => { }} id="menu-settings">
            <Settings size={18} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="btn-sidebar-new" id="btn-sidebar-new">
            New Analysis
          </button>
          <button className="footer-menu-item" id="btn-sidebar-help">
            <HelpCircle size={18} />
            <span>Help</span>
          </button>
          <button className="footer-menu-item" onClick={() => onNavigate('landing')} id="btn-sidebar-logout">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-content">

        {/* Left Control Column (Analysis Input) */}
        <section className="input-column">
          <div className="column-header">
            <h1 className="column-title">Analysis Input</h1>
            <p className="column-subtitle">Upload imagery for gap detection</p>
          </div>

          <div className="upload-container">
            <div className="upload-dropzone">
              <Upload size={32} className="upload-icon" />
              <h3>Drag & drop raw satellite imagery</h3>
              <p>Supports TIF, PNG, JPG (Max 500MB)</p>
            </div>

            <div className="preview-card">
              <div className="preview-image-wrapper">
                <img src={aerialCropImg} alt="Uploaded Satellite Preview" />
                <div className="preview-overlay">
                  <span>aerial_crop.png</span>
                </div>
              </div>
            </div>
          </div>

          <div className="control-group">
            <div className="control-label-wrapper">
              <span className="control-label">Confidence Threshold</span>
              <span className="control-value">{confidence}%</span>
            </div>
            <div className="slider-wrapper">
              <input
                type="range"
                min="50"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                className="confidence-slider"
              />
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">Detection Sensitivity</label>
            <div className="select-wrapper">
              <select
                value={sensitivity}
                onChange={(e) => setSensitivity(e.target.value)}
                className="sensitivity-select"
              >
                <option value="Balanced Enterprise">Balanced Enterprise</option>
                <option value="High Precision">High Precision</option>
                <option value="Fast Diagnostics">Fast Diagnostics</option>
              </select>
            </div>
          </div>

          <button className="btn-run-analysis" id="btn-run-analysis">
            <Play size={16} fill="currentColor" />
            <span>Run Gap Detection</span>
          </button>
        </section>

        {/* Right Visualization & Logs Column */}
        <section className="output-column">

          {/* Main Map Viewer */}
          <div className="viewer-card">
            <div className="map-container" style={{ transform: `scale(${zoomLevel})` }}>
              <img src={aerialCropImg} alt="Crop Aerial View" className="crop-map-image" />

              {/* Optional Grid Overlay */}
              {isGridActive && <div className="grid-overlay"></div>}

              {/* Interactive Bounding Boxes */}
              {filteredAnomalies.map((anomaly) => (
                <div
                  key={anomaly.id}
                  className={`bounding-box ${hoveredAnomaly === anomaly.id ? 'hovered' : ''}`}
                  style={anomaly.style}
                  onMouseEnter={() => setHoveredAnomaly(anomaly.id)}
                  onMouseLeave={() => setHoveredAnomaly(null)}
                >
                  <span className="box-label">
                    {anomaly.id} ({anomaly.confidence}%)
                  </span>
                </div>
              ))}
            </div>

            {/* Floating Image Control Panel */}
            <div className="map-toolbar">
              <button onClick={handleZoomIn} title="Zoom In" className="toolbar-btn">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleZoomOut} title="Zoom Out" className="toolbar-btn">
                <ZoomOut size={18} />
              </button>
              <button
                onClick={() => setSelectedLayer(l => l === 'all' ? 'none' : 'all')}
                title="Toggle Layers"
                className={`toolbar-btn ${selectedLayer !== 'none' ? 'active' : ''}`}
              >
                <Layers size={18} />
              </button>
              <button
                onClick={toggleGrid}
                title="Toggle Grid Overlay"
                className={`toolbar-btn ${isGridActive ? 'active' : ''}`}
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          {/* KPI Stat Cards Row */}
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-label">GAPS DETECTED</span>
              <div className="stat-value-group">
                <span className="stat-number">{displayGaps}</span>
                <span className="stat-trend">+2.4%</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">AFFECTED AREA</span>
              <div className="stat-value-group">
                <span className="stat-number">{affectedArea} <span className="stat-unit">ha</span></span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">HEALTH SCORE</span>
              <div className="stat-value-group">
                <span className="stat-number">{healthScore}%</span>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-label">RUNTIME</span>
              <div className="stat-value-group">
                <span className="stat-number">1.4 <span className="stat-unit">s</span></span>
              </div>
            </div>
          </div>

          {/* Spatial Log Table Card */}
          <div className="log-card">
            <div className="log-card-header">
              <h2 className="log-title">Spatial Log</h2>
              <div className="log-actions">
                <button className="btn-log-action" id="btn-export-pdf">
                  <FileText size={14} />
                  <span>PDF</span>
                </button>
                <button className="btn-log-action" id="btn-export-csv">
                  <Table size={14} />
                  <span>CSV</span>
                </button>
                <button className="btn-log-save" id="btn-save-results">
                  <Save size={14} />
                  <span>Save Results</span>
                </button>
              </div>
            </div>

            <div className="table-wrapper">
              <table className="spatial-table">
                <thead>
                  <tr>
                    <th>ANOMALY ID</th>
                    <th>LATITUDE</th>
                    <th>LONGITUDE</th>
                    <th>CONFIDENCE</th>
                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAnomalies.length > 0 ? (
                    filteredAnomalies.map((anomaly) => (
                      <tr
                        key={anomaly.id}
                        className={hoveredAnomaly === anomaly.id ? 'highlighted-row' : ''}
                        onMouseEnter={() => setHoveredAnomaly(anomaly.id)}
                        onMouseLeave={() => setHoveredAnomaly(null)}
                      >
                        <td className="anomaly-id">
                          <span className="dot"></span>
                          {anomaly.id}
                        </td>
                        <td>{anomaly.lat}</td>
                        <td>{anomaly.lng}</td>
                        <td>
                          <span className="confidence-badge">
                            {anomaly.confidence}%
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            className="btn-table-action"
                            title="Pin on Map"
                            onClick={() => handleActionPin(anomaly.id)}
                          >
                            <MapPin size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="empty-table-state">
                        No anomalies detected above {confidence}% confidence threshold.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default GapDashboard;
