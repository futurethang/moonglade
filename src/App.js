import React, { useState, useEffect } from 'react';
import MainInterface from './components/MainInterface';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [currentView, setCurrentView] = useState('main');
  const [hasVoted, setHasVoted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user has already voted
    const voted = localStorage.getItem('murderMysteryVoted');
    if (voted) {
      setHasVoted(true);
    }

    // Check for admin access
    const adminAccess = sessionStorage.getItem('adminAccess');
    if (adminAccess) {
      setIsAdmin(true);
      setCurrentView('admin');
    }
  }, []);

  const handleVoteSubmitted = () => {
    setHasVoted(true);
    localStorage.setItem('murderMysteryVoted', 'true');
  };

  const handleAdminLogin = (password) => {
    if (password === 'mysteryshow2024') {
      setIsAdmin(true);
      sessionStorage.setItem('adminAccess', 'true');
      setCurrentView('admin');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('adminAccess');
    setCurrentView('main');
  };

  // Hidden admin trigger (triple-click the title)
  const [clickCount, setClickCount] = useState(0);
  const handleTitleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        const password = prompt('Enter admin password:');
        if (handleAdminLogin(password)) {
          return 0;
        }
      }
      // Reset count after 2 seconds
      setTimeout(() => setClickCount(0), 2000);
      return newCount;
    });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 onClick={handleTitleClick}>Death at Moonglade Manor</h1>
        {isAdmin && currentView === 'admin' && (
          <button className="admin-logout" onClick={handleAdminLogout}>
            ← Back to Show
          </button>
        )}
      </header>

      <main className="main-content">
        {currentView === 'main' && (
          <MainInterface 
            hasVoted={hasVoted} 
            onVoteSubmitted={handleVoteSubmitted} 
          />
        )}
        {currentView === 'admin' && isAdmin && (
          <AdminDashboard />
        )}
      </main>
    </div>
  );
};

export default App;