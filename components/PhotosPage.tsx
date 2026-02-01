import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, Download, ArrowLeft, Folder as FolderIcon, MoreVertical, Link as LinkIcon, Share2, Eye, Check } from 'lucide-react';
import { Folder, Photo } from '../types';

interface PhotosPageProps {
  folders: Folder[];
  photos: Photo[];
}

export const PhotosPage: React.FC<PhotosPageProps> = ({ folders, photos }) => {
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  // Menu & Tooltip States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPhoto]);

  // Click outside menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeFolderId]);

  const activeFolder = useMemo(() => 
    folders.find(f => f.id === activeFolderId), 
  [activeFolderId, folders]);

  const filteredPhotos = useMemo(() => 
    photos.filter(p => p.folderId === activeFolderId), 
  [activeFolderId, photos]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedPhoto) return;
    
    try {
        const response = await fetch(selectedPhoto.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedPhoto.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.error('Download failed', err);
    }
  };

  const handleCopyLink = () => {
    if (!selectedPhoto) return;
    navigator.clipboard.writeText(selectedPhoto.url);
    setLinkCopied(true);
    setIsMenuOpen(false);
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const handleViewOriginal = () => {
    if (!selectedPhoto) return;
    window.open(selectedPhoto.url, '_blank');
    setIsMenuOpen(false);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-12 md:py-20">
       
       {/* Navigation Header */}
       <div className="mb-8 flex items-center justify-between">
          {activeFolderId ? (
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-left-2 duration-300">
                <button 
                  onClick={() => setActiveFolderId(null)}
                  className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{activeFolder?.name}</h2>
                   <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{filteredPhotos.length} items</p>
                </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Photos</h2>
              <p className="text-gray-500 dark:text-gray-400">{folders.length} Folders</p>
            </div>
          )}
       </div>

       {/* CONTENT GRID */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8">
          
          {/* FOLDER VIEW */}
          {!activeFolderId && folders.map((folder) => (
             <div 
                key={folder.id} 
                onClick={() => setActiveFolderId(folder.id)}
                className="group cursor-pointer animate-in fade-in zoom-in-95 duration-300"
              >
                  {/* Folder Preview */}
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg mb-3 group-hover:shadow-md transition-all">
                      {/* Cover Image */}
                      <img 
                        src={folder.coverUrl} 
                        alt={folder.name}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                      />
                      
                      {/* Folder Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      {/* Folder Icon Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-md p-2 rounded-xl shadow-sm">
                         <FolderIcon className="w-5 h-5 text-yellow-600 fill-yellow-600/20 dark:text-yellow-500" />
                      </div>
                      
                      {/* Count Badge */}
                      <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                          <span className="text-xs font-bold text-white">{folder.count}</span>
                      </div>
                  </div>
                  
                  {/* Metadata */}
                  <div className="px-1">
                      <h3 className="text-[17px] font-bold text-gray-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{folder.name}</h3>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1 font-medium">{folder.count} photos</p>
                  </div>
             </div>
          ))}

          {/* PHOTOS VIEW */}
          {activeFolderId && filteredPhotos.map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedPhoto(item)}
                className="bg-white dark:bg-dark-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100/50 dark:border-dark-border group animate-in fade-in fill-mode-both"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                  {/* Image Container */}
                  <div className="aspect-square w-full overflow-hidden bg-gray-50 dark:bg-dark-bg">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        loading="lazy"
                      />
                  </div>
                  {/* Footer */}
                  <div className="p-3 flex justify-between items-center text-[15px]">
                      <b className="text-gray-900 dark:text-white font-bold truncate pr-2">{item.title}</b>
                      <p className="text-gray-500 dark:text-gray-400 text-[13px] font-medium whitespace-nowrap">{item.date}</p>
                  </div>
              </div>
          ))}
       </div>

       {/* Compact Modal */}
       {selectedPhoto && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setSelectedPhoto(null)}
            />
            
            {/* Modal Card */}
            <div className="relative w-full max-w-[380px] bg-white dark:bg-dark-card rounded-[24px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5 dark:ring-white/10">
                
                {/* Image Area */}
                <div className="relative aspect-square w-full bg-gray-100 dark:bg-dark-bg group">
                   <img 
                      src={selectedPhoto.url} 
                      alt={selectedPhoto.title} 
                      className="w-full h-full object-cover"
                   />
                   
                   {/* Close Button overlay */}
                   <button 
                     onClick={() => setSelectedPhoto(null)}
                     className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-105 active:scale-95 z-20"
                     title="Close"
                   >
                      <X className="w-4 h-4" strokeWidth={2.5} />
                   </button>
                </div>
                
                {/* Footer Info */}
                <div className="px-6 py-5 flex items-center justify-between bg-white dark:bg-dark-card relative">
                   <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{selectedPhoto.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{selectedPhoto.date}</p>
                   </div>
                   
                   <div className="flex gap-2">
                       {/* Menu Trigger */}
                       <div className="relative" ref={menuRef}>
                           <button 
                             onClick={() => setIsMenuOpen(!isMenuOpen)}
                             className="p-2.5 bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl text-gray-900 dark:text-white transition-colors group relative"
                             title="More options"
                           >
                              <MoreVertical className="w-5 h-5 stroke-[2px]" />
                              {/* Simple Tooltip */}
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Options</span>
                           </button>

                           {/* Dropdown Menu */}
                           {isMenuOpen && (
                               <div className="absolute bottom-full right-0 mb-2 w-48 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl shadow-xl overflow-hidden py-1 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200">
                                   <button 
                                     onClick={handleCopyLink}
                                     className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-hover flex items-center gap-3 transition-colors"
                                   >
                                       <LinkIcon className="w-4 h-4" /> Copy Link
                                   </button>
                                   <button 
                                     onClick={handleViewOriginal}
                                     className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-hover flex items-center gap-3 transition-colors"
                                   >
                                       <Eye className="w-4 h-4" /> View Original
                                   </button>
                                   <div className="h-px bg-gray-100 dark:bg-dark-border my-1" />
                                   <button 
                                     onClick={() => setIsMenuOpen(false)}
                                     className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-hover flex items-center gap-3 transition-colors"
                                   >
                                       <Share2 className="w-4 h-4" /> Share
                                   </button>
                               </div>
                           )}
                       </div>

                       {/* Download Button */}
                       <button 
                         onClick={handleDownload}
                         className="p-2.5 bg-gray-50 dark:bg-dark-hover hover:bg-gray-100 dark:hover:bg-dark-border rounded-xl text-gray-900 dark:text-white transition-colors group relative"
                         title="Download image"
                       >
                          <Download className="w-5 h-5 stroke-[2px]" />
                          {/* Simple Tooltip */}
                          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Download</span>
                       </button>
                   </div>
                </div>
            </div>
         </div>
       )}

       {/* Link Copied Feedback Toast */}
       {linkCopied && (
           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-black/80 dark:bg-white/90 backdrop-blur-md text-white dark:text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5 fade-in duration-300 z-[150]">
               <Check className="w-4 h-4" />
               <span className="text-sm font-bold">Link copied to clipboard</span>
           </div>
       )}

    </div>
  );
};