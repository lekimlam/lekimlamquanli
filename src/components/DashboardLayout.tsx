import React, { useState } from 'react';
import { Users, Music, LogOut, LayoutDashboard, Monitor, Smartphone, MessageSquare, PieChart, Menu, X, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

type DeviceMode = 'desktop' | 'mobile';

export default function DashboardLayout({ activeTab, onTabChange, onLogout, children }: DashboardLayoutProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Tổng quan', icon: PieChart },
    { id: 'accounts', label: 'Quản lý tài khoản', icon: Users },
    { id: 'discord', label: 'Tài khoản Discord', icon: MessageSquare },
    { id: 'vm', label: 'Máy ảo & Game', icon: Monitor },
    { id: 'music', label: 'Nhạc SoundCloud', icon: Music },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col absolute inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-800">
          <div className="flex items-center">
            <LayoutDashboard className="text-orange-500 mr-3" size={24} />
            <h1 className="font-semibold text-zinc-100 tracking-tight">Admin Portal</h1>
          </div>
          <button 
            className="md:hidden text-zinc-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-400'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                }`}
              >
                <item.icon size={18} className={isActive ? 'text-orange-400' : 'text-zinc-500'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 rounded-lg border border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">
                LL
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-zinc-200">lekimlam</span>
                <span className="text-[10px] text-zinc-500">Super Admin</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-zinc-950">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-zinc-800 bg-zinc-950 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden text-zinc-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-medium text-zinc-100">
              {navItems.find((item) => item.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-lg hidden sm:flex">
            <button 
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded-md transition-colors ${deviceMode === 'desktop' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'}`} 
              title="Giao diện máy tính"
            >
              <Monitor size={16} />
            </button>
            <button 
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded-md transition-colors ${deviceMode === 'mobile' ? 'bg-zinc-800 text-orange-400' : 'text-zinc-500 hover:text-zinc-300'}`} 
              title="Giao diện điện thoại"
            >
              <Smartphone size={16} />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden relative bg-zinc-950">
          <div className="absolute inset-0 overflow-auto flex justify-center items-start sm:p-4 md:p-8">
            <motion.div
              layout
              className={`w-full h-full sm:h-auto bg-zinc-950 sm:relative transition-all ${deviceMode === 'mobile' ? 'sm:w-[375px] sm:min-h-[812px] sm:border-[8px] sm:border-zinc-800 sm:rounded-[3rem] sm:shadow-2xl sm:overflow-hidden' : 'sm:w-full sm:max-w-6xl'}`}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {deviceMode === 'mobile' && (
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none hidden sm:flex">
                  <div className="w-32 h-6 bg-zinc-800 rounded-b-3xl"></div>
                </div>
              )}
              <div className={`${deviceMode === 'mobile' ? 'sm:p-4 sm:pt-10' : ''} w-full h-full overflow-y-auto hide-scrollbar`}>
                {children}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
