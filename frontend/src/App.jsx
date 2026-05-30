import React, { useState } from 'react';
import LandingPage from './LandingPage.jsx';
import GapDashboard from './gap identification/pages/gap_Dashboard.jsx';
import { DashboardProvider } from './weed identification/context/DashboardContext';
import WeedDashboard from './weed identification/pages/Dashboard/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'weed-detector') {
    return (
      <div className="weed-dashboard-shell">
        <DashboardProvider>
          <WeedDashboard onNavigate={setCurrentPage} />
        </DashboardProvider>
      </div>
    );
  }

  if (currentPage === 'gap-detector') {
    return <GapDashboard onNavigate={setCurrentPage} />;
  }

  return <LandingPage onNavigate={setCurrentPage} />;
}

export default App;
