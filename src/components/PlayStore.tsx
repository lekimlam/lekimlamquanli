import React, { useState } from 'react';
import { Search, Bell, Mic, Star, Gamepad2, LayoutGrid, Download } from 'lucide-react';

export default function PlayStore() {
  const [installed, setInstalled] = useState<Record<string, boolean>>({});
  const [installing, setInstalling] = useState<Record<string, boolean>>({});

  const apps = [
    { name: 'Genshin Impact', dev: 'COGNOSPHERE PTE. LTD.', rating: '4.4', size: '254 MB', icon: 'https://play-lh.googleusercontent.com/So91qs_eRRrati6BUs8HuqiCkyRXbGH9h4qOonP-qLhV5G-1f6m-i68m3Z_1x1Q1nQ=w240-h480-rw' },
    { name: 'Roblox', dev: 'Roblox Corporation', rating: '4.4', size: '163 MB', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png' },
    { name: 'AFK Arena', dev: 'LilithGames', rating: '4.6', size: '120 MB', icon: 'https://play-lh.googleusercontent.com/R3aBndbC_iOaU8rMewv5f_c-WSTTfB3T6015R5yVjZ2m6Mhw8k7eXk39R1c1zB7cQQ=w240-h480-rw' },
    { name: 'Auto Clicker', dev: 'True Developers Studio', rating: '4.3', size: '5 MB', icon: 'https://play-lh.googleusercontent.com/yF-4r_vPqYgG4hR_T21fD3U_Mv_N7gA-nFvV9wR_S7zM-g3mE_9T2fD1c-w_V4mZ_w=w240-h480-rw' },
    { name: 'Discord - Talk, Play, Hang Out', dev: 'Discord Inc.', rating: '4.3', size: '84 MB', icon: 'https://play-lh.googleusercontent.com/O6aC93qT54Jm73F-Q3E29-f9c3u9X-iP9oVj0Q_K2P-o0X1E0J7x1N-l8f9T-G5sT_U=w240-h480-rw' },
    { name: 'Spotify: Music and Podcasts', dev: 'Spotify AB', rating: '4.4', size: '32 MB', icon: 'https://play-lh.googleusercontent.com/P2VMEenhpIsubG2oWbvuLGrs0GyyzLiDosGTg8bi8htRXg9Uf0eG65PtF9p4dZ5R_A=w240-h480-rw' }
  ];

  const handleInstall = (name: string) => {
    if (installed[name]) return;
    
    setInstalling(prev => ({ ...prev, [name]: true }));
    
    setTimeout(() => {
      setInstalling(prev => ({ ...prev, [name]: false }));
      setInstalled(prev => ({ ...prev, [name]: true }));
    }, 2000);
  };

  return (
    <div className="h-full bg-white flex flex-col text-zinc-800 font-sans overflow-hidden rounded-b-[2rem]">
      {/* Top Bar */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-zinc-100 mt-2">
        <div className="flex-1 bg-zinc-100 rounded-full flex items-center px-4 py-2.5 gap-2 shadow-sm">
          <Search size={18} className="text-zinc-500" />
          <input type="text" placeholder="Search apps & games" className="bg-transparent border-none focus:outline-none text-[13px] w-full" />
          <Mic size={18} className="text-zinc-500" />
        </div>
        <Bell size={22} className="text-zinc-600" />
        <div className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center font-medium text-sm">
          U
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-zinc-100">
        <button className="flex-1 py-3 text-[13px] font-medium border-b-2 border-[#01875F] text-[#01875F]">For you</button>
        <button className="flex-1 py-3 text-[13px] font-medium text-zinc-500">Top charts</button>
        <button className="flex-1 py-3 text-[13px] font-medium text-zinc-500">Kids</button>
        <button className="flex-1 py-3 text-[13px] font-medium text-zinc-500">Premium</button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-medium">Recommended for you</h2>
        </div>

        <div className="space-y-5">
          {apps.map((app, idx) => (
            <div key={idx} className="flex gap-4 items-center">
              <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-[14px] shadow-sm object-cover border border-zinc-100" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-zinc-900 leading-tight truncate text-[14px]">{app.name}</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{app.dev}</p>
                <div className="flex items-center gap-1 mt-1 text-[11px] text-zinc-500">
                  <span className="text-zinc-700 font-medium">{app.rating}</span>
                  <Star size={9} className="fill-zinc-700 text-zinc-700" />
                  <span className="mx-1">•</span>
                  <span>{app.size}</span>
                </div>
              </div>
              
              <button 
                onClick={() => handleInstall(app.name)}
                disabled={installing[app.name]}
                className={`w-[72px] h-8 rounded-full text-[12px] font-medium flex items-center justify-center transition-all ${
                  installed[app.name] 
                    ? 'border border-zinc-200 text-[#01875F]' 
                    : installing[app.name]
                      ? 'border border-zinc-200 text-zinc-400'
                      : 'bg-[#01875F] text-white'
                }`}
              >
                {installed[app.name] ? 'Open' : installing[app.name] ? 'Pending...' : 'Install'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 w-full h-14 bg-white border-t border-zinc-100 flex justify-around items-center px-2 z-20 pb-1">
        <button className="flex flex-col items-center gap-1 text-[#01875F]">
          <Gamepad2 size={20} className="fill-[#01875F]" />
          <span className="text-[10px] font-medium">Games</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <LayoutGrid size={20} />
          <span className="text-[10px] font-medium">Apps</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Download size={20} />
          <span className="text-[10px] font-medium">Offers</span>
        </button>
      </div>
    </div>
  );
}
