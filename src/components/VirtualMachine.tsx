import React, { useState } from 'react';
import { Smartphone, Wifi, Battery, Signal, Plus, Play, MoreVertical, ShieldCheck, Clock, Settings, RefreshCw } from 'lucide-react';

export default function VirtualMachine() {
  const [activeDevice, setActiveDevice] = useState<string | null>('device-1');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 2500);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Cloud Phone (Android)</h2>
          <p className="text-zinc-400 text-sm">Quản lý và điều khiển điện thoại Android đám mây ảo hóa, chơi game treo máy 24/7 (như UGPhone).</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} />
          Thuê Cloud Phone mới
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 h-full min-h-0">
        {/* Device List */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 cursor-pointer hover:border-blue-500/50 transition-all shadow-lg ring-1 ring-blue-500/20">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Smartphone size={16} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-zinc-200 font-medium text-sm">SGN-VIP-01</h3>
                  <p className="text-zinc-500 text-xs">Android 12 • 8GB RAM</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-green-500/10 text-green-500 px-2 py-0.5 rounded text-xs font-medium border border-green-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                Đang chạy
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-zinc-950 rounded border border-zinc-800 p-2">
                <div className="text-zinc-500 text-[10px] uppercase font-semibold mb-0.5">Thời hạn</div>
                <div className="text-zinc-300 text-xs font-mono">29 ngày 14 giờ</div>
              </div>
              <div className="bg-zinc-950 rounded border border-zinc-800 p-2">
                <div className="text-zinc-500 text-[10px] uppercase font-semibold mb-0.5">Ping</div>
                <div className="text-green-400 text-xs font-mono flex items-center gap-1">
                  <Signal size={10} /> 12ms
                </div>
              </div>
            </div>
            
            {!isConnected ? (
              <button 
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isConnecting ? (
                  <><RefreshCw size={16} className="animate-spin" /> Đang kết nối...</>
                ) : (
                  <><Play size={16} fill="currentColor" /> Vào thiết bị</>
                )}
              </button>
            ) : (
              <button 
                onClick={handleDisconnect}
                className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                Ngắt kết nối
              </button>
            )}
          </div>
          
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 opacity-60">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                  <Smartphone size={16} className="text-zinc-500" />
                </div>
                <div>
                  <h3 className="text-zinc-400 font-medium text-sm">HK-STANDARD-02</h3>
                  <p className="text-zinc-600 text-xs">Android 10 • 4GB RAM</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs font-medium">
                Hết hạn
              </div>
            </div>
            <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-sm font-medium transition-colors">
              Gia hạn ngay
            </button>
          </div>
        </div>

        {/* Device Viewport */}
        <div className="flex-1 bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden flex items-center justify-center p-4 lg:p-8 relative">
          {!isConnected ? (
            <div className="text-center">
              <div className="w-24 h-24 mx-auto bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-center mb-6 shadow-xl">
                <Smartphone size={40} className="text-zinc-700" />
              </div>
              <h3 className="text-xl font-medium text-zinc-300 mb-2">Chưa kết nối Cloud Phone</h3>
              <p className="text-zinc-500 text-sm max-w-sm mx-auto mb-6">
                Chọn một thiết bị đang chạy từ danh sách bên trái và bấm "Vào thiết bị" để bắt đầu điều khiển từ xa.
              </p>
              <div className="flex justify-center gap-4 text-xs text-zinc-600">
                <div className="flex items-center gap-1"><ShieldCheck size={14} /> An toàn 100%</div>
                <div className="flex items-center gap-1"><Clock size={14} /> Treo máy 24/7</div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[360px] h-[720px] max-h-full bg-black rounded-[2.5rem] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col ring-1 ring-white/10">
              {/* Android Status Bar */}
              <div className="h-7 bg-zinc-900/50 flex items-center justify-between px-5 text-[10px] text-white absolute top-0 w-full z-10 font-medium">
                <span>09:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal size={12} fill="currentColor" />
                  <Wifi size={12} />
                  <Battery size={14} fill="currentColor" />
                </div>
              </div>
              
              {/* Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-xl z-20"></div>

              {/* Android Home Screen Wallpaper */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-0"></div>

              {/* Apps Grid */}
              <div className="relative z-10 flex-1 pt-12 px-4 pb-24">
                <div className="mb-6 flex justify-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 text-white/90 text-sm font-medium w-full max-w-[240px]">
                    <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="G" />
                    <span className="flex-1 opacity-70">Search...</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                  <AppIcon name="Google Play" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Google_Play_Store_icon_2022.svg/1024px-Google_Play_Store_icon_2022.svg.png" />
                  <AppIcon name="Settings" icon="https://cdn-icons-png.flaticon.com/512/2950/2950113.png" />
                  <AppIcon name="Files" icon="https://cdn-icons-png.flaticon.com/512/3767/3767084.png" />
                  <AppIcon name="Chrome" icon="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" />
                  
                  <AppIcon name="Roblox" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png" />
                  <AppIcon name="Genshin" icon="https://play-lh.googleusercontent.com/So91qs_eRRrati6BUs8HuqiCkyRXbGH9h4qOonP-qLhV5G-1f6m-i68m3Z_1x1Q1nQ=w240-h480-rw" />
                  <AppIcon name="AFK Arena" icon="https://play-lh.googleusercontent.com/R3aBndbC_iOaU8rMewv5f_c-WSTTfB3T6015R5yVjZ2m6Mhw8k7eXk39R1c1zB7cQQ=w240-h480-rw" />
                  <AppIcon name="Auto Clicker" icon="https://play-lh.googleusercontent.com/yF-4r_vPqYgG4hR_T21fD3U_Mv_N7gA-nFvV9wR_S7zM-g3mE_9T2fD1c-w_V4mZ_w=w240-h480-rw" />
                </div>
              </div>

              {/* Android Dock */}
              <div className="relative z-10 mx-3 mb-4 bg-white/20 backdrop-blur-md rounded-3xl p-3 flex justify-around">
                <AppIcon name="Phone" icon="https://cdn-icons-png.flaticon.com/512/3014/3014736.png" hideName />
                <AppIcon name="Messages" icon="https://cdn-icons-png.flaticon.com/512/1044/1044951.png" hideName />
                <AppIcon name="Contacts" icon="https://cdn-icons-png.flaticon.com/512/3014/3014737.png" hideName />
                <AppIcon name="Camera" icon="https://cdn-icons-png.flaticon.com/512/3014/3014739.png" hideName />
              </div>

              {/* Android Navigation Bar */}
              <div className="absolute bottom-0 w-full h-10 bg-black/50 backdrop-blur flex justify-around items-center px-8 z-20">
                <div className="w-4 h-4 bg-white/80 rounded-sm"></div>
                <div className="w-4 h-4 bg-white/80 rounded-full"></div>
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-white/80 transform rotate-90"></div>
              </div>
              
              {/* Sidebar Menu Toolkit (Cloud Phone typical features) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm border-l border-y border-white/10 rounded-l-xl p-2 flex flex-col gap-4 z-30">
                <button className="text-white hover:text-blue-400" title="Resolution"><Settings size={18} /></button>
                <button className="text-white hover:text-blue-400" title="Reboot"><RefreshCw size={18} /></button>
                <button className="text-white hover:text-blue-400" title="More"><MoreVertical size={18} /></button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AppIcon({ name, icon, hideName = false }: { name: string, icon: string, hideName?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform active:scale-95">
      <div className="w-12 h-12 bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center p-0.5">
        <img src={icon} alt={name} className="w-full h-full object-cover rounded-[10px]" />
      </div>
      {!hideName && <span className="text-white text-[10px] text-center font-medium drop-shadow-md truncate w-14">{name}</span>}
    </div>
  );
}
