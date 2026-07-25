import React from 'react';
import { Users, Music, LogOut, LayoutDashboard, Monitor, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardLayoutProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function DashboardLayout({ activeTab, onTabChange, onLogout, children }: DashboardLayoutProps) {
  const navItems = [
    { id: 'accounts', label: 'Quản lý tài khoản', icon: Users },
    { id: 'music', label: 'Nhạc SoundCloud', icon: Music },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <LayoutDashboard className="text-orange-500 mr-3" size={24} />
          <h1 className="font-semibold text-zinc-100 tracking-tight">Admin Portal</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
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
          <div className="flex items-center justify-between px-3 py-2 bg-zinc-950 rounded-lg border border-zinc-800">
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
        <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 bg-zinc-950">
          <h2 className="text-lg font-medium text-zinc-100">
            {navItems.find((item) => item.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors" title="Giao diện máy tính">
              <Monitor size={18} />
            </button>
            <button className="p-2 text-zinc-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors" title="Giao diện điện thoại">
              <Smartphone size={18} />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-6xl mx-auto h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
