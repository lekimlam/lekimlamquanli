import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './components/DashboardOverview';
import AccountList from './components/AccountList';
import DiscordAccountList from './components/DiscordAccountList';
import MusicSection from './components/MusicSection';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAdminLoggedIn') === 'true';
  });
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAdminLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminLoggedIn');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500/30">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            <Login onLogin={handleLogin} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen"
          >
            <DashboardLayout 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              onLogout={handleLogout}
            >
              <div className={activeTab === 'overview' ? 'block h-full' : 'hidden'}>
                <DashboardOverview />
              </div>
              <div className={activeTab === 'accounts' ? 'block h-full' : 'hidden'}>
                <AccountList />
              </div>
              <div className={activeTab === 'discord' ? 'block h-full' : 'hidden'}>
                <DiscordAccountList />
              </div>
              <div className={activeTab === 'music' ? 'block h-full' : 'hidden'}>
                <MusicSection />
              </div>
            </DashboardLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
