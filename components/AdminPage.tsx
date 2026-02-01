import React, { useState, useRef, useMemo, useEffect } from 'react';
import { 
  Lock, Plus, Upload, Trash2, Edit2, X, Check, Image as ImageIcon, 
  FolderPlus, LayoutGrid, List, Filter, AlertCircle, HardDrive, CheckCircle, Search
} from 'lucide-react';
import { Photo, Folder } from '../types';

interface AdminPageProps {
  photos: Photo[];
  folders: Folder[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
}

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'danger' | 'info' | 'warning';
  onConfirm: () => void;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

export const AdminPage: React.FC<AdminPageProps> = ({ photos, folders, setPhotos, setFolders }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<'photos' | 'folders'>('photos');
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFolderId, setFilterFolderId] = useState<string>('all');

  // Modals & Toasts
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [confirmation, setConfirmation] = useState<ConfirmationState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: () => {},
  });

  // Forms
  const [photoForm, setPhotoForm] = useState({
    title: '',
    folderId: '',
    url: '',
    date: ''
  });
  
  const [folderForm, setFolderForm] = useState({
    name: '',
    coverUrl: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderFileInputRef = useRef<HTMLInputElement>(null);

  // --- HELPER: TOASTS ---
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // --- DERIVED DATA ---
  const filteredPhotos = useMemo(() => {
    return photos.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFolder = filterFolderId === 'all' || p.folderId === filterFolderId;
      return matchesSearch && matchesFolder;
    });
  }, [photos, searchQuery, filterFolderId]);

  // --- AUTH ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'AJ2006') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  // --- CONFIRMATION HELPER ---
  const askConfirmation = (title: string, message: string, type: ConfirmationState['type'], onConfirm: () => void) => {
    setConfirmation({
      isOpen: true,
      title,
      message,
      type,
      onConfirm: () => {
        onConfirm();
        setConfirmation(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // --- PHOTO CRUD ---
  const handleAddPhotoClick = () => {
    setEditingPhoto(null);
    setPhotoForm({
      title: '',
      folderId: folders[0]?.id || '',
      url: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setIsPhotoModalOpen(true);
  };

  const handleEditPhotoClick = (photo: Photo) => {
    setEditingPhoto(photo);
    setPhotoForm({
      title: photo.title,
      folderId: photo.folderId,
      url: photo.url,
      date: photo.date
    });
    setIsPhotoModalOpen(true);
  };

  const handleDeletePhoto = (id: string) => {
    askConfirmation(
      "Delete Photo",
      "Are you sure you want to delete this photo? This action cannot be undone.",
      "danger",
      () => {
        setPhotos(prev => prev.filter(p => p.id !== id));
        setSelectedPhotos(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        showToast('Photo deleted successfully');
      }
    );
  };

  const handleBulkDelete = () => {
    askConfirmation(
      `Delete ${selectedPhotos.size} Photos`,
      `Are you sure you want to delete ${selectedPhotos.size} selected photos? This action cannot be undone.`,
      "danger",
      () => {
        setPhotos(prev => prev.filter(p => !selectedPhotos.has(p.id)));
        setSelectedPhotos(new Set());
        showToast('Photos deleted successfully');
      }
    );
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate
    if (!photoForm.title || !photoForm.url || !photoForm.folderId) return;

    const action = editingPhoto ? "Update" : "Upload";
    
    askConfirmation(
      `Confirm ${action}`,
      `Are you sure you want to ${action.toLowerCase()} this photo details?`,
      "info",
      () => {
        if (editingPhoto) {
          setPhotos(prev => prev.map(p => p.id === editingPhoto.id ? { ...p, ...photoForm } : p));
          showToast('Photo updated successfully');
        } else {
          const newPhoto: Photo = {
            id: Math.random().toString(36).substr(2, 9),
            ...photoForm
          };
          setPhotos(prev => [newPhoto, ...prev]);
          showToast('Photo uploaded successfully');
        }
        setIsPhotoModalOpen(false);
      }
    );
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoForm(prev => ({ ...prev, url: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedPhotos(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selectedPhotos.size === filteredPhotos.length) {
      setSelectedPhotos(new Set());
    } else {
      setSelectedPhotos(new Set(filteredPhotos.map(p => p.id)));
    }
  };

  // --- FOLDER CRUD ---
  const handleAddFolderClick = () => {
    setEditingFolder(null);
    setFolderForm({ name: '', coverUrl: '' });
    setIsFolderModalOpen(true);
  };

  const handleEditFolderClick = (folder: Folder) => {
    setEditingFolder(folder);
    setFolderForm({ name: folder.name, coverUrl: folder.coverUrl });
    setIsFolderModalOpen(true);
  };

  const handleSaveFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderForm.name) return;

    const action = editingFolder ? "Update" : "Create";

    askConfirmation(
      `${action} Folder`,
      `Are you sure you want to ${action.toLowerCase()} this folder?`,
      "info",
      () => {
        if (editingFolder) {
           setFolders(prev => prev.map(f => f.id === editingFolder.id ? { ...f, ...folderForm } : f));
           showToast('Folder updated successfully');
        } else {
           const newFolder: Folder = {
             id: folderForm.name.toLowerCase().replace(/\s+/g, '-'),
             name: folderForm.name,
             coverUrl: folderForm.coverUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
             count: 0
           };
           setFolders(prev => [...prev, newFolder]);
           showToast('Folder created successfully');
        }
        setIsFolderModalOpen(false);
      }
    );
  };

  const handleDeleteFolder = (folderId: string) => {
    const count = photos.filter(p => p.folderId === folderId).length;
    askConfirmation(
      "Delete Folder",
      `Are you sure? This folder contains ${count} photos. Deleting it will NOT delete the photos, but they will be orphaned (or you can choose to implement cascade delete).`,
      "danger",
      () => {
        setFolders(prev => prev.filter(f => f.id !== folderId));
        showToast('Folder deleted successfully');
      }
    );
  };

  const handleFolderFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFolderForm(prev => ({ ...prev, coverUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- RENDER LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] px-4 bg-[#F9F9F9] dark:bg-dark-bg">
        <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-dark-border text-center animate-in fade-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-gray-100 dark:bg-dark-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-gray-900 dark:text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Access</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Please enter the password to continue.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-dark-border focus:bg-white dark:focus:bg-dark-card focus:border-black dark:focus:border-white focus:ring-0 outline-none transition-all text-center tracking-widest text-lg text-gray-900 dark:text-white"
              placeholder="••••••"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
            <button 
              type="submit"
              className="w-full h-12 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-black dark:hover:bg-gray-200 transition-colors shadow-lg"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      
      {/* Header & Stats */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{photos.length}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Photos</div>
                </div>
            </div>
            <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{folders.length}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Active Folders</div>
                </div>
            </div>
             <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center">
                    <HardDrive className="w-6 h-6" />
                </div>
                <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">GB</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Simulated Storage</div>
                </div>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-3xl shadow-sm overflow-hidden min-h-[600px] flex flex-col">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100 dark:border-dark-border px-6 pt-6 gap-8">
              <button 
                onClick={() => setActiveTab('photos')}
                className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'photos' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                  <List className="w-4 h-4" /> Photos
              </button>
              <button 
                onClick={() => setActiveTab('folders')}
                className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'folders' ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' : 'border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'}`}
              >
                  <FolderPlus className="w-4 h-4" /> Folders
              </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 flex-1 bg-gray-50/30 dark:bg-black/20">
              
              {/* --- PHOTOS TAB --- */}
              {activeTab === 'photos' && (
                  <div className="space-y-6">
                      {/* Toolbar */}
                      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                          <div className="flex items-center gap-3 w-full md:w-auto">
                              <div className="relative group w-full md:w-64">
                                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <input 
                                    type="text" 
                                    placeholder="Search photos..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-10 pl-9 pr-4 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:border-purple-500 outline-none transition-colors text-gray-900 dark:text-white"
                                  />
                              </div>
                              <div className="relative group">
                                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <select 
                                    value={filterFolderId}
                                    onChange={(e) => setFilterFolderId(e.target.value)}
                                    className="h-10 pl-9 pr-8 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-lg text-sm focus:border-purple-500 outline-none appearance-none cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors min-w-[140px] text-gray-900 dark:text-white"
                                  >
                                      <option value="all">All Folders</option>
                                      {folders.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                                  </select>
                              </div>
                          </div>

                          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                              {selectedPhotos.size > 0 && (
                                  <button 
                                    onClick={handleBulkDelete}
                                    className="h-10 px-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 animate-in fade-in"
                                  >
                                      <Trash2 className="w-4 h-4" /> Delete ({selectedPhotos.size})
                                  </button>
                              )}
                              <button 
                                onClick={handleAddPhotoClick}
                                className="h-10 px-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-gray-200 dark:shadow-none"
                              >
                                  <Upload className="w-4 h-4" /> Upload Photo
                              </button>
                          </div>
                      </div>

                      {/* Table */}
                      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border overflow-hidden">
                          <table className="w-full text-left">
                              <thead>
                                  <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">
                                      <th className="px-6 py-4 w-10">
                                          <input 
                                            type="checkbox" 
                                            checked={selectedPhotos.size === filteredPhotos.length && filteredPhotos.length > 0}
                                            onChange={toggleSelectAll}
                                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                          />
                                      </th>
                                      <th className="px-6 py-4">Preview</th>
                                      <th className="px-6 py-4">Details</th>
                                      <th className="px-6 py-4">Folder</th>
                                      <th className="px-6 py-4 text-right">Actions</th>
                                  </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                                  {filteredPhotos.length === 0 ? (
                                      <tr>
                                          <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                              No photos found.
                                          </td>
                                      </tr>
                                  ) : (
                                    filteredPhotos.map(photo => (
                                      <tr key={photo.id} className={`hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-colors ${selectedPhotos.has(photo.id) ? 'bg-purple-50/50 dark:bg-purple-900/20' : ''}`}>
                                          <td className="px-6 py-4">
                                              <input 
                                                type="checkbox" 
                                                checked={selectedPhotos.has(photo.id)}
                                                onChange={() => toggleSelection(photo.id)}
                                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                              />
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-dark-bg border border-gray-200 dark:border-dark-border overflow-hidden">
                                                  <img src={photo.url} alt="" className="w-full h-full object-cover" />
                                              </div>
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="font-bold text-gray-900 dark:text-white text-sm">{photo.title}</div>
                                              <div className="text-xs text-gray-400 mt-0.5">{photo.date}</div>
                                          </td>
                                          <td className="px-6 py-4">
                                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-dark-bg text-gray-800 dark:text-gray-200">
                                                  {folders.find(f => f.id === photo.folderId)?.name || 'Unknown'}
                                              </span>
                                          </td>
                                          <td className="px-6 py-4 text-right">
                                              <div className="flex items-center justify-end gap-2">
                                                  <button onClick={() => handleEditPhotoClick(photo)} className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                  <button onClick={() => handleDeletePhoto(photo.id)} className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                                              </div>
                                          </td>
                                      </tr>
                                    ))
                                  )}
                              </tbody>
                          </table>
                      </div>
                  </div>
              )}

              {/* --- FOLDER MODAL --- */}
              {activeTab === 'folders' && (
                   <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Manage Folders</h3>
                            <button 
                                onClick={handleAddFolderClick}
                                className="h-10 px-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-black dark:hover:bg-gray-200 rounded-lg text-sm font-bold transition-colors flex items-center gap-2 shadow-lg shadow-gray-200 dark:shadow-none"
                              >
                                  <Plus className="w-4 h-4" /> Create Folder
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {folders.map(folder => (
                                <div key={folder.id} className="bg-white dark:bg-dark-card p-5 rounded-2xl border border-gray-200 dark:border-dark-border shadow-sm flex gap-5 group hover:border-purple-200 dark:hover:border-purple-800 transition-all">
                                    <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-dark-bg flex-shrink-0 overflow-hidden relative">
                                        <img src={folder.coverUrl} alt="" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white">{folder.name}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{folder.count} items</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => handleEditFolderClick(folder)} className="text-xs font-bold text-gray-400 hover:text-blue-600 border border-gray-200 dark:border-dark-border hover:border-blue-200 px-3 py-1.5 rounded-md transition-colors">Edit</button>
                                            <button onClick={() => handleDeleteFolder(folder.id)} className="text-xs font-bold text-gray-400 hover:text-red-600 border border-gray-200 dark:border-dark-border hover:border-red-200 px-3 py-1.5 rounded-md transition-colors">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                   </div>
              )}

          </div>
      </div>

      {/* --- PHOTO MODAL --- */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsPhotoModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{editingPhoto ? 'Edit Photo' : 'Upload Photo'}</h2>
              <button onClick={() => setIsPhotoModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"><X className="w-5 h-5 text-gray-500 dark:text-gray-400" /></button>
            </div>
            <form onSubmit={handleSavePhoto} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Image</label>
                <div className="flex gap-4 items-start">
                   <div className="w-24 h-24 bg-gray-100 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border flex items-center justify-center overflow-hidden flex-shrink-0">
                      {photoForm.url ? <img src={photoForm.url} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />}
                   </div>
                   <div className="flex-1 space-y-3">
                      <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePhotoFileUpload} className="hidden" />
                      <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full h-10 border border-gray-300 dark:border-dark-border rounded-lg flex items-center justify-center gap-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-gray-900 dark:text-white"><Upload className="w-4 h-4" /> Upload File</button>
                      <input type="text" placeholder="Or paste image URL..." value={photoForm.url} onChange={(e) => setPhotoForm({...photoForm, url: e.target.value})} className="w-full h-10 px-3 bg-gray-50 dark:bg-dark-bg rounded-lg border border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-black dark:focus:border-white outline-none text-sm transition-all text-gray-900 dark:text-white" />
                   </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Title</label>
                <input type="text" value={photoForm.title} onChange={(e) => setPhotoForm({...photoForm, title: e.target.value})} className="w-full h-12 px-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-black dark:focus:border-white outline-none transition-all text-gray-900 dark:text-white" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Folder</label>
                <div className="grid grid-cols-2 gap-2">
                  {folders.map(folder => (
                    <button key={folder.id} type="button" onClick={() => setPhotoForm({...photoForm, folderId: folder.id})} className={`h-10 rounded-lg text-sm font-medium border transition-all ${photoForm.folderId === folder.id ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white' : 'bg-white dark:bg-dark-bg text-gray-600 dark:text-gray-400 border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-500'}`}>{folder.name}</button>
                  ))}
                </div>
              </div>
              <button type="submit" className="w-full h-12 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-purple-900/30 transition-colors flex items-center justify-center gap-2 mt-4"><Check className="w-5 h-5" /> {editingPhoto ? 'Save Changes' : 'Upload Photo'}</button>
            </form>
          </div>
        </div>
      )}

      {/* --- FOLDER MODAL --- */}
      {isFolderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsFolderModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{editingFolder ? 'Edit Folder' : 'New Folder'}</h2>
              <button onClick={() => setIsFolderModalOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full transition-colors"><X className="w-5 h-5 text-gray-500 dark:text-gray-400" /></button>
            </div>
             <form onSubmit={handleSaveFolder} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Folder Name</label>
                  <input type="text" value={folderForm.name} onChange={(e) => setFolderForm({...folderForm, name: e.target.value})} className="w-full h-12 px-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-black dark:focus:border-white outline-none transition-all text-gray-900 dark:text-white" required />
                </div>
                 <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Cover Image</label>
                   <div className="flex gap-4 items-start">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-dark-bg rounded-xl border border-gray-200 dark:border-dark-border flex items-center justify-center overflow-hidden flex-shrink-0">
                            {folderForm.coverUrl ? <img src={folderForm.coverUrl} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />}
                        </div>
                        <div className="flex-1 space-y-3">
                            <input type="file" ref={folderFileInputRef} accept="image/*" onChange={handleFolderFileUpload} className="hidden" />
                            <button type="button" onClick={() => folderFileInputRef.current?.click()} className="w-full h-10 border border-gray-300 dark:border-dark-border rounded-lg flex items-center justify-center gap-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors text-gray-900 dark:text-white"><Upload className="w-4 h-4" /> Upload Cover</button>
                            <input type="text" placeholder="Or paste image URL..." value={folderForm.coverUrl} onChange={(e) => setFolderForm({...folderForm, coverUrl: e.target.value})} className="w-full h-10 px-3 bg-gray-50 dark:bg-dark-bg rounded-lg border border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-black dark:focus:border-white outline-none text-sm transition-all text-gray-900 dark:text-white" />
                        </div>
                   </div>
                </div>
                <button type="submit" className="w-full h-12 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold rounded-xl shadow-lg shadow-purple-200 dark:shadow-purple-900/30 transition-colors flex items-center justify-center gap-2 mt-4"><Check className="w-5 h-5" /> Save Folder</button>
             </form>
          </div>
        </div>
      )}

      {/* --- GENERIC CONFIRMATION MODAL --- */}
      {confirmation.isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setConfirmation(prev => ({...prev, isOpen: false}))} />
             <div className="relative w-full max-w-sm bg-white dark:bg-dark-card rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
                 
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                     confirmation.type === 'danger' ? 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 dark:text-blue-400'
                 }`}>
                     {confirmation.type === 'danger' ? <AlertCircle className="w-7 h-7" /> : <CheckCircle className="w-7 h-7" />}
                 </div>

                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{confirmation.title}</h3>
                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 leading-relaxed px-4">{confirmation.message}</p>

                 <div className="grid grid-cols-2 gap-3">
                     <button 
                        onClick={() => setConfirmation(prev => ({...prev, isOpen: false}))}
                        className="h-11 rounded-xl font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-dark-border transition-colors"
                     >
                         Cancel
                     </button>
                     <button 
                        onClick={confirmation.onConfirm}
                        className={`h-11 rounded-xl font-bold text-white transition-colors shadow-lg ${
                            confirmation.type === 'danger' 
                            ? 'bg-red-500 hover:bg-red-600 shadow-red-200 dark:shadow-none' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 dark:shadow-none'
                        }`}
                     >
                         Confirm
                     </button>
                 </div>

             </div>
        </div>
      )}

      {/* --- TOASTS CONTAINER --- */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xl rounded-xl p-4 flex items-center gap-3 min-w-[300px] animate-in slide-in-from-right-10 fade-in duration-300 pointer-events-auto"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              toast.type === 'success' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
            }`}>
              {toast.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{toast.message}</p>
          </div>
        ))}
      </div>

    </div>
  );
};