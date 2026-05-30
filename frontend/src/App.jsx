import React, { useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import GapDashboard from './pages/gap_Dashboard.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage onNavigate={setCurrentPage} />
      ) : (
        <GapDashboard onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

export default App;
