import React, { useState } from 'react';
import { Folder, File as FileIcon, Download, Smartphone, CheckCircle, Search, MoreVertical, HardDrive, Image, Music, Video, FileText } from 'lucide-react';

export default function FileManager() {
  const [activeTab, setActiveTab] = useState<'recent' | 'categories' | 'storage'>('storage');
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [installing, setInstalling] = useState(false);
  const [installed, setInstalled] = useState(false);
  
  const [apkUrl, setApkUrl] = useState('https://example.com/app.apk');
  const [showInstaller, setShowInstaller] = useState(false);

  const startDownload = () => {
    if (!apkUrl) return;
    setDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          setShowInstaller(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startInstall = () => {
    setInstalling(true);
    setTimeout(() => {
      setInstalling(false);
      setInstalled(true);
    }, 2500);
  };

  return (
    <div className="h-full bg-[#f8f9fa] flex flex-col text-zinc-800 font-sans overflow-hidden rounded-b-[2rem] relative">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 pt-12 pb-4 shadow-sm z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-medium">Files</h1>
          <Search size={20} />
        </div>
        <div className="bg-white/20 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardDrive size={24} className="text-white" />
            <div>
              <div className="text-sm font-medium">Internal storage</div>
              <div className="text-xs text-blue-100">32 GB / 64 GB free</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* APK Downloader / Installer Form */}
        <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-4 mb-6">
          <h2 className="text-sm font-medium text-zinc-800 mb-3 flex items-center gap-2">
            <Download size={16} className="text-blue-500" />
            APK Downloader
          </h2>
          <p className="text-xs text-zinc-500 mb-3">
            Enter a direct URL to an APK file to download and install it to the cloud phone.
          </p>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={apkUrl}
              onChange={(e) => setApkUrl(e.target.value)}
              placeholder="https://.../app.apk"
              className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={startDownload}
              disabled={downloading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Get
            </button>
          </div>
          
          {downloading && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-zinc-500 mb-1">
                <span>Downloading APK...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-200" 
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <h2 className="text-sm font-medium text-zinc-800 mb-3">Categories</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <CategoryCard icon={<Download className="text-indigo-500" />} name="Downloads" />
          <CategoryCard icon={<Image className="text-green-500" />} name="Images" />
          <CategoryCard icon={<Video className="text-red-500" />} name="Videos" />
          <CategoryCard icon={<Music className="text-purple-500" />} name="Audio" />
          <CategoryCard icon={<FileText className="text-orange-500" />} name="Documents" />
          <CategoryCard icon={<Smartphone className="text-teal-500" />} name="Apps" />
        </div>

        {/* Recent Files */}
        <h2 className="text-sm font-medium text-zinc-800 mb-3">Recent files</h2>
        <div className="space-y-3 pb-12">
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <FileIcon size={20} className="text-indigo-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-zinc-800">ugphone_v1.2.apk</h3>
              <p className="text-xs text-zinc-500">Just now • 45 MB</p>
            </div>
            <MoreVertical size={16} className="text-zinc-400" />
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Image size={20} className="text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-zinc-800">Screenshot_2023.png</h3>
              <p className="text-xs text-zinc-500">Yesterday • 1.2 MB</p>
            </div>
            <MoreVertical size={16} className="text-zinc-400" />
          </div>
        </div>
      </div>

      {/* APK Installer Modal */}
      {showInstaller && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-[300px] shadow-2xl overflow-hidden flex flex-col">
            <div className="p-5 flex-1 flex flex-col items-center justify-center text-center">
              {!installed ? (
                <>
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                    <Smartphone size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 mb-1">Install App?</h3>
                  <p className="text-sm text-zinc-500 mb-6">Do you want to install this application from unknown sources?</p>
                  
                  {installing && (
                    <div className="w-full">
                      <div className="flex justify-between text-xs text-zinc-500 mb-1">
                        <span>Installing...</span>
                      </div>
                      <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-1.5 rounded-full w-full animate-[pulse_1s_ease-in-out_infinite]"></div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-zinc-900 mb-1">App Installed</h3>
                  <p className="text-sm text-zinc-500">The application has been successfully installed on the cloud device.</p>
                </>
              )}
            </div>
            
            <div className="flex border-t border-zinc-100">
              {!installed ? (
                <>
                  <button 
                    onClick={() => setShowInstaller(false)}
                    disabled={installing}
                    className="flex-1 py-3 text-sm font-medium text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 border-r border-zinc-100"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={startInstall}
                    disabled={installing}
                    className="flex-1 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                  >
                    Install
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setShowInstaller(false)}
                  className="flex-1 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryCard({ icon, name }: { icon: React.ReactNode, name: string }) {
  return (
    <div className="bg-white border border-zinc-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 shadow-sm">
      <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <span className="text-[11px] font-medium text-zinc-600">{name}</span>
    </div>
  );
}
