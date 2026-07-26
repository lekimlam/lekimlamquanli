import React, { useState } from 'react';
import { Plus, X, Search, RefreshCw, ChevronLeft, ChevronRight, Chrome, Home, LayoutGrid, ExternalLink } from 'lucide-react';

interface BrowserTab {
  id: string;
  title: string;
  url: string;
  isNewTab: boolean;
}

const APPS = [
  { name: 'Google', url: 'https://www.google.com/webhp?igu=1', icon: 'https://www.google.com/favicon.ico' },
  { name: 'YouTube', url: 'https://www.youtube.com/embed/', icon: 'https://www.youtube.com/favicon.ico' },
  { name: 'Wikipedia', url: 'https://en.wikipedia.org/', icon: 'https://en.wikipedia.org/favicon.ico' },
  { name: 'Bing', url: 'https://www.bing.com/', icon: 'https://www.bing.com/favicon.ico' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/', icon: 'https://duckduckgo.com/favicon.ico' },
  { name: 'Spotify', url: 'https://open.spotify.com/embed', icon: 'https://open.spotify.com/favicon.ico' },
  { name: 'CodePen', url: 'https://codepen.io/', icon: 'https://codepen.io/favicon.ico' },
  { name: 'GitHub', url: 'https://github.com/', icon: 'https://github.com/favicon.ico' },
  { name: 'Reddit', url: 'https://www.reddit.com/', icon: 'https://www.reddit.com/favicon.ico' },
  { name: 'Twitch', url: 'https://player.twitch.tv/', icon: 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png' },
  { name: 'Vimeo', url: 'https://player.vimeo.com/', icon: 'https://vimeo.com/favicon.ico' },
  { name: 'SoundCloud', url: 'https://w.soundcloud.com/player/', icon: 'https://soundcloud.com/favicon.ico' },
  { name: 'Discord', url: 'https://discord.com/app', icon: 'https://discord.com/favicon.ico' }
];

export default function GoogleClone() {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: '1', title: 'New Tab', url: '', isNewTab: true }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [urlInput, setUrlInput] = useState('');

  const addTab = () => {
    const newId = Date.now().toString();
    setTabs([...tabs, { id: newId, title: 'New Tab', url: '', isNewTab: true }]);
    setActiveTabId(newId);
    setUrlInput('');
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      // If closing the last tab, just reset it to a new tab
      setTabs([{ id: Date.now().toString(), title: 'New Tab', url: '', isNewTab: true }]);
      return;
    }
    
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
      setUrlInput(newTabs[newTabs.length - 1].url);
    }
  };

  const navigateTo = (input: string, title: string = 'Website') => {
    let finalUrl = input;
    
    // Check if it's a URL or a search query
    const isUrl = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/.test(input) || 
                  input.startsWith('http://') || 
                  input.startsWith('https://');

    if (isUrl) {
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        finalUrl = `https://${input}`;
      }
    } else {
      // It's a search query, use Google (igu=1 allows iframe embedding for Google Search)
      finalUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(input)}`;
      title = `${input} - Google Search`;
    }
    
    setTabs(tabs.map(t => 
      t.id === activeTabId ? { ...t, url: finalUrl, title, isNewTab: false } : t
    ));
    setUrlInput(finalUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && urlInput.trim()) {
      navigateTo(urlInput.trim(), urlInput.trim());
    }
  };

  const goHome = () => {
    setTabs(tabs.map(t => 
      t.id === activeTabId ? { ...t, url: '', title: 'New Tab', isNewTab: true } : t
    ));
    setUrlInput('');
  };

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  React.useEffect(() => {
    setUrlInput(activeTab.url);
  }, [activeTabId]);

  return (
    <div className="h-full flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
      {/* Browser Chrome / Tab Bar */}
      <div className="bg-zinc-950 flex items-center px-2 pt-2 gap-1 overflow-x-auto hide-scrollbar">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`group flex items-center gap-2 min-w-[150px] max-w-[200px] h-10 px-3 rounded-t-lg cursor-pointer transition-colors border-t border-x ${
              activeTabId === tab.id 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-100' 
                : 'bg-zinc-950 border-transparent text-zinc-400 hover:bg-zinc-900/50'
            }`}
          >
            {tab.isNewTab ? (
              <LayoutGrid size={14} className={activeTabId === tab.id ? 'text-[#4285F4]' : 'text-zinc-500'} />
            ) : (
              <Chrome size={14} className={activeTabId === tab.id ? 'text-[#4285F4]' : 'text-zinc-500'} />
            )}
            <span className="text-xs truncate flex-1">{tab.title}</span>
            <button 
              onClick={(e) => closeTab(e, tab.id)}
              className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-zinc-800 transition-all"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        <button 
          onClick={addTab}
          className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors ml-1 mb-1 shrink-0"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Navigation Bar */}
      <div className="h-12 bg-zinc-900 flex items-center px-4 gap-4 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-zinc-400">
          <button className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
            <ChevronRight size={18} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={goHome} className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
            <Home size={18} />
          </button>
        </div>
        <div className="flex-1 flex items-center bg-zinc-950 rounded-full h-8 px-4 border border-zinc-800 focus-within:border-[#4285F4]/50 focus-within:ring-1 focus-within:ring-[#4285F4]/50 transition-all">
          <Search size={14} className="text-zinc-500 mr-2 shrink-0" />
          <input 
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or type a URL"
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-zinc-300 font-mono"
            spellCheck={false}
          />
          <button 
            onClick={() => activeTab.url && window.open(activeTab.url, '_blank')}
            className="p-1.5 ml-2 text-zinc-500 hover:text-zinc-300 transition-colors shrink-0"
            title="Open in real browser tab (fixes blank screen)"
          >
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Viewport Area */}
      <div className="flex-1 relative bg-zinc-950 overflow-hidden">
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`absolute inset-0 w-full h-full ${activeTabId === tab.id ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}
          >
            {tab.isNewTab ? (
              <div className="w-full h-full flex flex-col items-center pt-24 overflow-y-auto">
                <div className="flex flex-col items-center mb-12">
                  <div className="flex items-center gap-2 mb-8">
                    <span className="text-[#4285F4] text-6xl font-bold">G</span>
                    <span className="text-[#EA4335] text-6xl font-bold">o</span>
                    <span className="text-[#FBBC05] text-6xl font-bold">o</span>
                    <span className="text-[#4285F4] text-6xl font-bold">g</span>
                    <span className="text-[#34A853] text-6xl font-bold">l</span>
                    <span className="text-[#EA4335] text-6xl font-bold">e</span>
                    <span className="text-zinc-500 text-6xl font-bold ml-2">Clone</span>
                  </div>
                  
                  <div className="w-full max-w-2xl bg-zinc-900 rounded-full h-12 px-6 flex items-center border border-zinc-800 hover:bg-zinc-800/80 transition-colors shadow-lg">
                    <Search size={18} className="text-zinc-500 mr-3" />
                    <input 
                      type="text"
                      placeholder="Search Google or type a URL"
                      className="flex-1 bg-transparent border-none focus:outline-none text-zinc-200"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          const val = e.currentTarget.value.trim();
                          if (val.includes('.') && !val.includes(' ')) {
                            navigateTo(val, val);
                          } else {
                            navigateTo(`https://www.google.com/search?q=${encodeURIComponent(val)}&igu=1`, `Search: ${val}`);
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="w-full max-w-3xl px-8">
                  <h3 className="text-zinc-500 text-sm font-medium mb-4 pl-2">Popular Apps</h3>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                    {APPS.map((app) => (
                      <button
                        key={app.name}
                        onClick={() => navigateTo(app.url, app.name)}
                        className="flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700 group-hover:border-zinc-500 transition-colors shadow-sm overflow-hidden relative">
                          <img 
                            src={app.icon} 
                            alt={app.name} 
                            className="w-6 h-6 object-contain z-10 relative"
                            onError={(e) => {
                              // Fallback to text if icon fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<span class="text-zinc-400 font-bold z-10 relative">${app.name.charAt(0)}</span>`;
                            }}
                          />
                        </div>
                        <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{app.name}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-12 text-center">
                    <p className="text-zinc-600 text-xs max-w-sm mx-auto">
                      Note: Many websites (like YouTube or Facebook) block being embedded inside other apps for security. If a site doesn't load, use the <ExternalLink size={12} className="inline mx-1" /> icon in the address bar to open it in a real tab.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={tab.url}
                className="w-full h-full border-none bg-white"
                title={tab.title}
                sandbox="allow-same-origin allow-scripts allow-forms"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
