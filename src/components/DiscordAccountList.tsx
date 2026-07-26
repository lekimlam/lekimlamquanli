import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Edit2, MessageSquare, X, ExternalLink } from 'lucide-react';
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
    email: '',
    password: '',
    discriminator: '0',
    avatarUrl: '',
    status: 'online' as 'online' | 'idle' | 'dnd' | 'offline'
  });

  const [simulatedLoginAccount, setSimulatedLoginAccount] = useState<DiscordAccount | null>(null);

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
        email: account.email || '',
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
        email: '',
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
              <th className="px-6 py-4 font-medium">Email</th>
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
                  {account.email ? account.email : <span className="text-zinc-600 italic">Chưa đặt</span>}
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
                      onClick={() => setSimulatedLoginAccount(account)}
                      className="p-1.5 text-zinc-500 hover:text-[#5865F2] transition-colors" 
                      title="Đăng nhập Discord (Tự động điền)"
                    >
                      <ExternalLink size={16} />
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
                <td colSpan={7} className="px-6 py-12 text-center text-zinc-500">
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
                  <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="block w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#5865F2]/50 focus:border-[#5865F2]/50 transition-colors"
                    placeholder="Nhập email"
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
      <AnimatePresence>
        {simulatedLoginAccount && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 bg-[#313338] sm:bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full h-full sm:h-auto sm:max-w-[480px] bg-[#313338] sm:rounded-[5px] shadow-2xl overflow-hidden flex flex-col relative p-8 text-center"
            >
              <button 
                onClick={() => setSimulatedLoginAccount(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200"
              >
                <X size={24} />
              </button>
              
              <div className="mb-6 flex justify-center">
                <svg width="130" height="36" viewBox="0 0 130 36" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M109.112 18.0003C109.112 15.0116 107.828 12.3551 105.748 10.4571C103.668 8.5592 100.825 7.42065 97.6698 7.42065C94.5146 7.42065 91.6713 8.5592 89.5913 10.4571C87.5114 12.3551 86.2275 15.0116 86.2275 18.0003C86.2275 20.9891 87.5114 23.6456 89.5913 25.5435C91.6713 27.4415 94.5146 28.58 97.6698 28.58C100.825 28.58 103.668 27.4415 105.748 25.5435C107.828 23.6456 109.112 20.9891 109.112 18.0003ZM97.6698 23.606C96.1135 23.606 94.7571 23.0487 93.7381 22.0621C92.7192 21.0754 92.1152 19.6469 92.1152 18.0003C92.1152 16.3538 92.7192 14.9253 93.7381 13.9386C94.7571 12.952 96.1135 12.3946 97.6698 12.3946C99.226 12.3946 100.582 12.952 101.601 13.9386C102.62 14.9253 103.224 16.3538 103.224 18.0003C103.224 19.6469 102.62 21.0754 101.601 22.0621C100.582 23.0487 99.226 23.606 97.6698 23.606ZM129.414 7.42065C126.259 7.42065 123.415 8.5592 121.335 10.4571C119.255 12.3551 117.972 15.0116 117.972 18.0003C117.972 20.9891 119.255 23.6456 121.335 25.5435C123.415 27.4415 126.259 28.58 129.414 28.58H130V23.606H129.414C127.858 23.606 126.501 23.0487 125.482 22.0621C124.463 21.0754 123.859 19.6469 123.859 18.0003C123.859 16.3538 124.463 14.9253 125.482 13.9386C126.501 12.952 127.858 12.3946 129.414 12.3946H130V7.42065H129.414ZM26.4357 7.42065H20.7513V28.58H26.4357C30.6405 28.58 34.3312 26.852 36.9062 24.0898C39.4812 21.3276 41.1396 17.6534 41.1396 13.5683C41.1396 9.48316 39.4812 5.80894 36.9062 3.04677C34.3312 0.28459 30.6405 -1.44358 26.4357 -1.44358H20.7513V4.42065H26.4357C29.2155 4.42065 31.7588 5.48624 33.6445 7.24036C35.5303 8.99448 36.6346 11.1963 36.6346 13.5683C36.6346 15.9402 35.5303 18.1421 33.6445 19.8962C31.7588 21.6503 29.2155 22.7159 26.4357 22.7159V7.42065ZM68.1259 7.42065C64.9707 7.42065 62.1274 8.5592 60.0475 10.4571C57.9675 12.3551 56.6836 15.0116 56.6836 18.0003C56.6836 20.9891 57.9675 23.6456 60.0475 25.5435C62.1274 27.4415 64.9707 28.58 68.1259 28.58C71.281 28.58 74.1243 27.4415 76.2043 25.5435C78.2842 23.6456 79.5681 20.9891 79.5681 18.0003C79.5681 15.0116 78.2842 12.3551 76.2043 10.4571C74.1243 8.5592 71.281 7.42065 68.1259 7.42065ZM68.1259 23.606C66.5696 23.606 65.2132 23.0487 64.1942 22.0621C63.1753 21.0754 62.5713 19.6469 62.5713 18.0003C62.5713 16.3538 63.1753 14.9253 64.1942 13.9386C65.2132 12.952 66.5696 12.3946 68.1259 12.3946C69.6821 12.3946 71.0385 12.952 72.0574 13.9386C73.0763 14.9253 73.6804 16.3538 73.6804 18.0003C73.6804 19.6469 73.0763 21.0754 72.0574 22.0621C71.0385 23.0487 69.6821 23.606 68.1259 23.606ZM45.3942 7.42065H51.0786V28.58H45.3942V7.42065ZM11.4552 28.58H16.6667V0L0 0V28.58H11.4552ZM83.0033 7.42065H80.5985V28.58H83.0033C85.5057 28.58 87.8016 27.6521 89.642 26.0792L86.9602 22.9463C85.8344 23.7711 84.4539 24.2384 83.0033 24.2384V11.7629C84.4539 11.7629 85.8344 12.2302 86.9602 13.055L89.642 9.92215C87.8016 8.34923 85.5057 7.42065 83.0033 7.42065Z" fill="white" />
                </svg>
              </div>

              <h2 className="text-[24px] font-semibold text-white mb-2 tracking-wide">Chào mừng trở lại!</h2>
              <p className="text-[#B5BAC1] text-[16px] mb-6">Chúng tôi rất vui mừng khi được gặp lại bạn!</p>

              <form 
                className="text-left" 
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Đăng nhập thành công với tài khoản: ${simulatedLoginAccount.email || simulatedLoginAccount.username}!\n\n(Đây là trang mô phỏng đăng nhập Discord)`);
                  setSimulatedLoginAccount(null);
                }}
              >
                <div className="mb-4">
                  <label className="block text-[12px] font-bold text-[#B5BAC1] uppercase mb-2">Email hoặc Số điện thoại <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={simulatedLoginAccount.email || simulatedLoginAccount.username}
                    readOnly
                    className="block w-full px-4 py-3 bg-[#1E1F22] border-none rounded-[3px] text-base text-zinc-200 focus:outline-none"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-[12px] font-bold text-[#B5BAC1] uppercase mb-2">Mật khẩu <span className="text-red-400">*</span></label>
                  <input
                    type="password"
                    value={simulatedLoginAccount.password || ''}
                    readOnly
                    className="block w-full px-4 py-3 bg-[#1E1F22] border-none rounded-[3px] text-base text-zinc-200 focus:outline-none"
                  />
                  <a href="#" className="text-[14px] text-[#00A8FC] hover:underline mt-2 inline-block">Quên mật khẩu?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium py-3 rounded-[3px] transition-colors text-base"
                >
                  Đăng nhập
                </button>
                
                <div className="mt-4 text-[14px]">
                  <span className="text-[#949BA4]">Cần một tài khoản? </span>
                  <a href="#" className="text-[#00A8FC] hover:underline">Đăng ký</a>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
