import React, { useState } from 'react';
import { Plus, X, Search, RefreshCw, ChevronLeft, ChevronRight, Chrome } from 'lucide-react';

interface BrowserTab {
  id: string;
  title: string;
  url: string;
}

export default function GoogleClone() {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: '1', title: 'Google', url: 'https://www.google.com/webhp?igu=1' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');

  const addTab = () => {
    const newId = Date.now().toString();
    setTabs([...tabs, { id: newId, title: 'Google', url: 'https://www.google.com/webhp?igu=1' }]);
    setActiveTabId(newId);
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Don't close last tab
    
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

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
            <Chrome size={14} className={activeTabId === tab.id ? 'text-[#4285F4]' : 'text-zinc-500'} />
            <span className="text-xs truncate flex-1">{tab.title}</span>
            {tabs.length > 1 && (
              <button 
                onClick={(e) => closeTab(e, tab.id)}
                className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-zinc-800 transition-all"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}
        <button 
          onClick={addTab}
          className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-colors ml-1 mb-1"
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
        </div>
        <div className="flex-1 flex items-center bg-zinc-950 rounded-full h-8 px-4 border border-zinc-800">
          <Search size={14} className="text-zinc-500 mr-2" />
          <span className="text-sm text-zinc-300 font-mono truncate">{activeTab.url}</span>
        </div>
      </div>

      {/* Viewport Area */}
      <div className="flex-1 relative bg-white">
        {tabs.map(tab => (
          <iframe
            key={tab.id}
            src={tab.url}
            className={`absolute inset-0 w-full h-full border-none ${activeTabId === tab.id ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'}`}
            title={tab.title}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        ))}
      </div>
    </div>
  );
}
