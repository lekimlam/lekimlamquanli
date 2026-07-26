import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit2, MessageSquare, X } from 'lucide-react';
import { DiscordAccount } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_ACCOUNTS: DiscordAccount[] = [
  { id: '1', discordId: '123456789012345678', username: 'lekimlam', discriminator: '0', avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png', status: 'online', joinedAt: '2025-01-01' },
  { id: '2', discordId: '987654321098765432', username: 'gamer_pro', discriminator: '1234', avatarUrl: 'https://cdn.discordapp.com/embed/avatars/1.png', status: 'idle', joinedAt: '2026-05-15' },
  { id: '3', discordId: '567890123456789012', username: 'chill_vibes', discriminator: '0', avatarUrl: 'https://cdn.discordapp.com/embed/avatars/2.png', status: 'dnd', joinedAt: '2026-07-01' },
  { id: '4', discordId: '345678901234567890', username: 'sleepy_cat', discriminator: '9999', avatarUrl: 'https://cdn.discordapp.com/embed/avatars/3.png', status: 'offline', joinedAt: '2026-07-20' },
];

export default function DiscordAccountList() {
  const [accounts, setAccounts] = useState<DiscordAccount[]>(() => {
    const saved = localStorage.getItem('admin_discord_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem('admin_discord_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<DiscordAccount | null>(null);
  const [formData, setFormData] = useState({
    discordId: '',
    username: '',
    password: '',
    discriminator: '0',
    avatarUrl: '',
    status: 'online' as 'online' | 'idle' | 'dnd' | 'offline'
  });

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.discordId.includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản Discord này?')) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };
  
  const handleOpenModal = (account?: DiscordAccount) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        discordId: account.discordId,
        username: account.username,
        password: account.password || '',
        discriminator: account.discriminator,
        avatarUrl: account.avatarUrl,
        status: account.status
      });
    } else {
      setEditingAccount(null);
      setFormData({
        discordId: '',
        username: '',
        password: '',
        discriminator: '0',
        avatarUrl: `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 5)}.png`,
        status: 'online'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAccount) {
      setAccounts(accounts.map(acc => 
        acc.id === editingAccount.id 
          ? { ...acc, ...formData } 
          : acc
      ));
    } else {
      const newAccount: DiscordAccount = {
        id: Date.now().toString(),
        ...formData,
        joinedAt: new Date().toISOString().split('T')[0]
      };
      setAccounts([...accounts, newAccount]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      case 'offline': return 'bg-zinc-500';
      default: return 'bg-zinc-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Trực tuyến';
      case 'idle': return 'Nhàn rỗi';
      case 'dnd': return 'Không làm phiền';
      case 'offline': return 'Ngoại tuyến';
      default: return 'Ngoại tuyến';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full shadow-lg">
      <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm tài khoản Discord..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
          />
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Thêm tài khoản Discord
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-zinc-950/50 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Người dùng</th>
              <th className="px-6 py-4 font-medium">Mật khẩu</th>
              <th className="px-6 py-4 font-medium">Discord ID</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium">Ngày tham gia</th>
              <th className="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={account.avatarUrl} alt={account.username} className="w-8 h-8 rounded-full bg-zinc-800" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-zinc-900 ${getStatusColor(account.status)}`}></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-200">
                        {account.username}
                        {account.discriminator !== '0' && <span className="text-zinc-500 text-xs">#{account.discriminator}</span>}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {account.password ? '••••••••' : <span className="text-zinc-600 italic">Chưa đặt</span>}
                </td>
                <td className="px-6 py-4 text-zinc-400 font-mono text-xs">{account.discordId}</td>
                <td className="px-6 py-4">
                  <span className="text-zinc-300">
                    {getStatusText(account.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{account.joinedAt}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors" title="Nhắn tin">
                      <MessageSquare size={16} />
                    </button>
                    <button 
                      onClick={() => handleOpenModal(account)}
                      className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors" 
                      title="Chỉnh sửa"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(account.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors" 
                      title="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  Không tìm thấy tài khoản Discord nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
                <h3 className="text-lg font-medium text-zinc-100">
                  {editingAccount ? 'Chỉnh sửa tài khoản Discord' : 'Thêm tài khoản Discord'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Tên người dùng</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/50 focus:border-[#5865F2]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Mật khẩu</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/50 focus:border-[#5865F2]/50 transition-colors"
                    placeholder={editingAccount ? "Để trống nếu không muốn đổi" : "Nhập mật khẩu"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Discord ID</label>
                  <input
                    type="text"
                    required
                    value={formData.discordId}
                    onChange={(e) => setFormData({ ...formData, discordId: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/50 focus:border-[#5865F2]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'online' | 'idle' | 'dnd' | 'offline' })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/50 focus:border-[#5865F2]/50 transition-colors"
                  >
                    <option value="online">Trực tuyến</option>
                    <option value="idle">Nhàn rỗi</option>
                    <option value="dnd">Không làm phiền</option>
                    <option value="offline">Ngoại tuyến</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">URL Avatar (Tùy chọn)</label>
                  <input
                    type="url"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/50 focus:border-[#5865F2]/50 transition-colors"
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    {editingAccount ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
