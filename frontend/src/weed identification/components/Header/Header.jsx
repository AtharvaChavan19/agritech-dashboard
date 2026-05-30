import React, { useState } from 'react';
import './Header.css';
import { Settings, Battery, ChevronDown, ArrowLeft } from 'lucide-react';

const Header = ({ data, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(data.fieldName);

  const fields = [
    "North Field - Block 1",
    "North Field - Block 2",
    "North Field - Block 3",
    "North Field - Block 4",
    "South Field - Block 1",
    "South Field - Block 2",
    "South Field - Block 3",
    "South Field - Block 4",
  ];

  const handleFieldSelect = (field) => {
    setSelectedField(field);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-left">
        {onNavigate && (
          <button
            type="button"
            className="back-btn"
            onClick={() => onNavigate('landing')}
            aria-label="Back to landing page"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        )}
        <h1 className="logo">Sugarcane Rover Command</h1>
        
        <div className="field-selector-container">
          <button 
            className={`field-info-pill ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="dot"></span>
            {selectedField}
            <ChevronDown size={14} className={`chevron ${isDropdownOpen ? 'up' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="field-dropdown shadow">
              {fields.map((field) => (
                <button 
                  key={field} 
                  className={`field-option ${selectedField === field ? 'selected' : ''}`}
                  onClick={() => handleFieldSelect(field)}
                >
                  {field}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="header-right">
        <div className="stat-item">
          <span className="label">MISSION STATUS</span>
          <span className="value status-active">{data.missionStatus}</span>
        </div>
        
        <div className="stat-separator"></div>
        
        <div className="stat-item">
          <span className="label">PROGRESS</span>
          <div className="value-with-icon">
            <span className="value">{data.progress}%</span>
          </div>
        </div>
        
        <div className="stat-separator"></div>
        
        <div className="stat-item">
          <span className="label">BATTERY</span>
          <div className="value-with-icon">
            <span className="value">{data.battery}%</span>
            <Battery size={18} fill="currentColor" />
          </div>
        </div>
        
        <button className="settings-btn">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
