import React, { useState } from 'react';
import { Plus, Trash2, Music, ExternalLink, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Some cool default tracks for the admin to vibe to
const DEFAULT_TRACKS = [
  'https://soundcloud.com/chillhopdotcom/kupla-evening-tide',
  'https://soundcloud.com/monstercat/aero-chord-surface'
];

export default function MusicSection() {
  const [links, setLinks] = useState<string[]>(DEFAULT_TRACKS);
  const [newLink, setNewLink] = useState('');

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink && newLink.includes('soundcloud.com')) {
      if (!links.includes(newLink)) {
        setLinks([newLink, ...links]);
      }
      setNewLink('');
    } else {
      alert('Vui lòng nhập một đường dẫn SoundCloud hợp lệ.');
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    setLinks(links.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
            <Music size={20} />
          </div>
          <div>
            <h3 className="text-lg font-medium text-zinc-100">Quản lý Playlist</h3>
            <p className="text-sm text-zinc-400">Thêm các liên kết SoundCloud để phát nhạc trong Dashboard</p>
          </div>
        </div>

        <form onSubmit={handleAddLink} className="flex gap-3">
          <input
            type="url"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            placeholder="Dán liên kết SoundCloud vào đây (VD: https://soundcloud.com/...)"
            className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            Thêm bài hát
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        <AnimatePresence>
          {links.map((link, index) => (
            <motion.div
              key={link + index}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between p-3 border-b border-zinc-800/50 bg-zinc-900/50">
                <div className="flex items-center gap-3 truncate px-2">
                  <GripVertical size={16} className="text-zinc-600 cursor-grab" />
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-300 hover:text-orange-400 truncate max-w-lg transition-colors flex items-center gap-1.5">
                    {link}
                    <ExternalLink size={12} />
                  </a>
                </div>
                <button
                  onClick={() => handleRemoveLink(index)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                  title="Xóa bài hát"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="w-full h-[166px] bg-zinc-950">
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(link)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=false`}
                  title={`SoundCloud Player ${index}`}
                  className="w-full"
                ></iframe>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {links.length === 0 && (
          <div className="p-12 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500 text-center">
            <Music size={32} className="mb-3 text-zinc-700" />
            <p>Chưa có bài hát nào.</p>
            <p className="text-sm">Hãy thêm một liên kết SoundCloud ở trên.</p>
          </div>
        )}
      </div>
    </div>
  );
}
