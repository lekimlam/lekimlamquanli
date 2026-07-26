import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit2, ShieldAlert, X, Eye } from 'lucide-react';
import { Account } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_ACCOUNTS: Account[] = [
  { id: '1', username: 'lekimlam', email: 'lekimlam16052015@gmail.com', role: 'admin', status: 'active', createdAt: '2025-01-01' },
  { id: '2', username: 'user_nguyen', email: 'nguyen@example.com', role: 'user', status: 'active', createdAt: '2026-07-20' },
  { id: '3', username: 'guest_001', email: 'guest1@example.com', role: 'guest', status: 'inactive', createdAt: '2026-07-22' },
];

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('admin_accounts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_ACCOUNTS;
  });

  useEffect(() => {
    localStorage.setItem('admin_accounts', JSON.stringify(accounts));
  }, [accounts]);

  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active' as 'active' | 'inactive'
  });

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (id === '1') {
      alert('Không thể xóa tài khoản Admin chính!');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
  };

  const handleOpenModal = (account?: Account) => {
    if (account) {
      setEditingAccount(account);
      setFormData({
        username: account.username,
        email: account.email,
        password: account.password || '',
        role: account.role,
        status: account.status
      });
    } else {
      setEditingAccount(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        role: 'user',
        status: 'active'
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
      const newAccount: Account = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAccounts([...accounts, newAccount]);
    }
    setIsModalOpen(false);
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
            placeholder="Tìm kiếm tài khoản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
          />
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 hover:bg-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Thêm tài khoản
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-zinc-950/50 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Tên đăng nhập</th>
              <th className="px-6 py-4 font-medium">Mật khẩu</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Vai trò</th>
              <th className="px-6 py-4 font-medium">Trạng thái</th>
              <th className="px-6 py-4 font-medium">Ngày tạo</th>
              <th className="px-6 py-4 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-200">{account.username}</span>
                    {account.role === 'admin' && <ShieldAlert size={14} className="text-orange-500" title="Admin" />}
                  </div>
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {account.password ? '••••••••' : <span className="text-zinc-600 italic">Chưa đặt</span>}
                </td>
                <td className="px-6 py-4 text-zinc-400">{account.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    account.role === 'admin' ? 'bg-orange-500/10 text-orange-400' :
                    account.role === 'user' ? 'bg-blue-500/10 text-blue-400' :
                    'bg-zinc-500/10 text-zinc-400'
                  }`}>
                    {account.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 ${account.status === 'active' ? 'text-green-400' : 'text-zinc-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${account.status === 'active' ? 'bg-green-400' : 'bg-zinc-500'}`}></span>
                    {account.status === 'active' ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">{account.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => {
                        const text = `Email: ${account.email || 'Chưa đặt'}\nMật khẩu: ${account.password || 'Chưa đặt'}`;
                        navigator.clipboard.writeText(text);
                      }}
                      className="p-1.5 text-zinc-500 hover:text-green-400 transition-colors" 
                      title="Sao chép Email & Mật khẩu"
                    >
                      <Eye size={16} />
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
                      className={`p-1.5 transition-colors ${account.id === '1' ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-500 hover:text-red-400'}`} 
                      title="Xóa"
                      disabled={account.id === '1'}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {filteredAccounts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
                  Không tìm thấy tài khoản nào phù hợp.
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
                  {editingAccount ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản mới'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Tên đăng nhập</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Mật khẩu</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
                    placeholder={editingAccount ? "Để trống nếu không muốn đổi" : "Nhập mật khẩu"}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Vai trò</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Trạng thái</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Đã khóa</option>
                  </select>
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
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-medium transition-colors"
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
