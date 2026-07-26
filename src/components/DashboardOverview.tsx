import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Users, UserPlus, Music, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

const data = [
  { name: 'T3', accounts: 3000, discord: 1398 },
  { name: 'T4', accounts: 2000, discord: 9800 },
  { name: 'T5', accounts: 2780, discord: 3908 },
  { name: 'T6', accounts: 1890, discord: 4800 },
  { name: 'T7', accounts: 2390, discord: 3800 },
  { name: 'CN', accounts: 3490, discord: 4300 },
];

export default function DashboardOverview() {
  const getLocalStorageCount = (key: string, defaultValue: number) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved).length.toString();
      }
    } catch (e) {}
    return defaultValue.toString();
  };

  const stats = [
    { title: 'Tổng tài khoản', value: getLocalStorageCount('admin_accounts', 3), change: '+12%', icon: Users, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { title: 'Tài khoản Discord', value: getLocalStorageCount('admin_discord_accounts', 4), change: '+5%', icon: MessageSquare, color: 'text-[#5865F2]', bg: 'bg-[#5865F2]/10' },
    { title: 'Người dùng mới', value: '124', change: '+18%', icon: UserPlus, color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Bài hát Playlist', value: getLocalStorageCount('admin_music_links', 3), change: '+2', icon: Music, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-semibold text-zinc-100">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col shadow-sm"
        >
          <h3 className="text-lg font-medium text-zinc-100 mb-6">Tăng trưởng tài khoản</h3>
          <div className="flex-1 w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAccounts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                />
                <Area type="monotone" dataKey="accounts" name="Tài khoản" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorAccounts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col shadow-sm"
        >
          <h3 className="text-lg font-medium text-zinc-100 mb-6">Hoạt động Discord</h3>
          <div className="flex-1 w-full h-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#e4e4e7' }}
                  cursor={{ fill: '#27272a' }}
                />
                <Bar dataKey="discord" name="Tài khoản Discord" fill="#5865F2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
