import React, { useState } from 'react';
import { Plus, Search, Trash2, Edit2, ShieldAlert } from 'lucide-react';
import { Account } from '../types';

const INITIAL_ACCOUNTS: Account[] = [
  { id: '1', username: 'lekimlam', email: 'lekimlam16052015@gmail.com', role: 'admin', status: 'active', createdAt: '2025-01-01' },
  { id: '2', username: 'user_nguyen', email: 'nguyen@example.com', role: 'user', status: 'active', createdAt: '2026-07-20' },
  { id: '3', username: 'guest_001', email: 'guest1@example.com', role: 'guest', status: 'inactive', createdAt: '2026-07-22' },
];

export default function AccountList() {
  const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
  const [searchTerm, setSearchTerm] = useState('');

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
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-900 hover:bg-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Thêm tài khoản
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-zinc-950/50 text-zinc-400 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-medium">Tên đăng nhập</th>
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
                    <button className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors" title="Chỉnh sửa">
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
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                  Không tìm thấy tài khoản nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
