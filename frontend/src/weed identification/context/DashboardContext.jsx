import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockData } from '../data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [roverState, setRoverState] = useState(mockData.rover);
  const [sprayEvents, setSprayEvents] = useState(mockData.latestSprayEvent);
  const [activityLog, setActivityLog] = useState(mockData.activityLog);
  const [missionSummary, setMissionSummary] = useState(mockData.missionSummary);
  const [fieldMap, setFieldMap] = useState(mockData.fieldMap);

  // Future integration points:
  // useEffect(() => {
  //   // connect to WebSocket or poll FastAPI
  // }, []);

  const value = {
    roverState,
    sprayEvents,
    activityLog,
    missionSummary,
    fieldMap,
    // future actions:
    // updateRoverPosition: (pos) => setFieldMap(prev => ({ ...prev, roverPosition: pos })),
    // addSprayEvent: (event) => {
    //   setSprayEvents(event);
    //   setActivityLog(prev => [event, ...prev]);
    // }
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
