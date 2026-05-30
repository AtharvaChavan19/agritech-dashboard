import React from 'react';
import './Dashboard.css';
import { useDashboard } from '../../context/DashboardContext';
import Header from '../../components/Header/Header';
import LatestSprayEvent from '../../components/LatestSprayEvent/LatestSprayEvent';
import FieldMap from '../../components/FieldMap/FieldMap';
import CurrentActivity from '../../components/CurrentActivity/CurrentActivity';
import ActivityLog from '../../components/ActivityLog/ActivityLog';
import MissionReport from '../../components/MissionReport/MissionReport';
import MissionSummary from '../../components/MissionSummary/MissionSummary';

const Dashboard = ({ onNavigate }) => {
  const { roverState, sprayEvents, activityLog, missionSummary, fieldMap } = useDashboard();

  return (
    <div className="dashboard-container">
      <Header data={roverState} onNavigate={onNavigate} />
      
      <LatestSprayEvent data={sprayEvents} />
      
      <FieldMap data={fieldMap} />
      
      <CurrentActivity data={roverState} />
      
      <MissionReport />
      
      <ActivityLog logs={activityLog} />
      
      <MissionSummary data={missionSummary} />
    </div>
  );
};

export default Dashboard;
