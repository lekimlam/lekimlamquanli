import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import AccountList from './components/AccountList';
import MusicSection from './components/MusicSection';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('accounts');

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
            <Login onLogin={() => setIsAuthenticated(true)} />
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
              onLogout={() => setIsAuthenticated(false)}
            >
              {activeTab === 'accounts' && <AccountList />}
              {activeTab === 'music' && <MusicSection />}
            </DashboardLayout>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
