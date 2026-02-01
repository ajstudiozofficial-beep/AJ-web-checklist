import React, { useState, useEffect } from 'react';
import { Menu, Search, Lock, Moon, Sun } from 'lucide-react';
import { LogoIcon } from './components/Icons';
import { HomePage } from './components/HomePage';
import { ChecklistPage } from './components/ChecklistPage';
import { BrowsePage } from './components/BrowsePage';
import { PhotosPage } from './components/PhotosPage';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';
import { AdminPage } from './components/AdminPage';
import { SearchModal } from './components/SearchModal';
import { Photo, Folder } from './types';

// Footer Data matching the screenshot
const footerLinks = {
  website: ['404', 'Blog', 'Careers', 'FAQ', 'Search', 'Blog Post', 'Cart', 'Login', 'Sign up', 'Contact Us', 'Pricing', 'Team'],
  components: ['Avatar', 'Badge', 'Banner', 'Button', 'Card', 'Carousel', 'Checkbox', 'Icon', 'Input Field', 'Loading', 'Modal', 'Navigation', 'Radio', 'Searchbar', 'Slider', 'Table', 'Tabs', 'Toast', 'Toggle', 'Tooltip'],
  flows: ['Adding to cart', 'Canceling subscription', 'Contacting support', 'Deleting account', 'Entering promo code', 'Making a card payment', 'Resetting password', 'Saving changes', 'Showing input error', 'Submitting a form', 'Uploading media', 'Verifying account']
};

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Browse all', id: 'browse' },
  { label: 'Photos', id: 'photos' },
  { label: 'Website', id: 'website' },
];

// --- INITIAL DATA GENERATION ---
const BASE_IMAGES = [
  "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=600", // Orange
  "https://plus.unsplash.com/premium_photo-1675237626068-08537b0d778a?auto=format&fit=crop&q=80&w=600", // Tangerine
  "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&q=80&w=600", // Raspberry
  "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&q=80&w=600", // Lemon
  "https://images.unsplash.com/photo-1523049673856-38866ea6c0b1?auto=format&fit=crop&q=80&w=600", // Avocado
  "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=600", // Lemon 2
  "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600", // Banana
  "https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?auto=format&fit=crop&q=80&w=600", // Watermelon
  "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=600", // Strawberry
  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600", // Melon
  "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&q=80&w=600", // Berry
  "https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&q=80&w=600", // Cherry
];

const FOLDER_DEFINITIONS = [
  { id: 'fruits', name: 'Fresh Fruits', coverIndex: 0 },
  { id: 'summer', name: 'Summer Vibes', coverIndex: 7 },
  { id: 'tropical', name: 'Tropical', coverIndex: 6 },
  { id: 'berries', name: 'Berries & More', coverIndex: 2 },
];

const generateInitialData = () => {
  const folders: Folder[] = [];
  const photos: Photo[] = [];

  FOLDER_DEFINITIONS.forEach(def => {
    folders.push({
      id: def.id,
      name: def.name,
      coverUrl: BASE_IMAGES[def.coverIndex],
      count: 12 // Reduced for initial load, will be dynamic
    });

    for (let i = 0; i < 12; i++) {
      const imgIndex = (i + def.coverIndex) % BASE_IMAGES.length;
      photos.push({
        id: `${def.id}-${i}`,
        folderId: def.id,
        url: BASE_IMAGES[imgIndex],
        title: `${def.name} Item ${i + 1}`,
        date: `Jan ${Math.floor(Math.random() * 30) + 1}, 2024`,
      });
    }
  });

  return { folders, photos };
};


export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App State for Photos
  const [folders, setFolders] = useState<Folder[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Initialize Data
  useEffect(() => {
    const { folders: f, photos: p } = generateInitialData();
    setFolders(f);
    setPhotos(p);
  }, []);

  // Handle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Recalculate folder counts when photos change
  useEffect(() => {
    setFolders(prevFolders => 
      prevFolders.map(folder => ({
        ...folder,
        count: photos.filter(p => p.folderId === folder.id).length
      }))
    );
  }, [photos.length]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Helper to determine if a nav link is active
  const isLinkActive = (id: string) => {
    if (id === 'home' && currentView === 'home') return true;
    if (id === 'browse' && currentView === 'browse') return true;
    if (id === 'photos' && currentView === 'photos') return true;
    return false;
  };

  const handleNavigate = (view: string) => {
    // Simple slugify for footer links: "Blog Post" -> "blog-post"
    const slug = view.toLowerCase().replace(/\s+/g, '-');
    setCurrentView(slug);
  };

  const toHumanReadable = (slug: string) => {
    if (slug === '404') return '404';
    if (slug === 'admin') return 'Admin Portal';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans selection:bg-purple-200 dark:selection:bg-purple-900 transition-colors duration-300">
      
      {/* Search Modal Overlay */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={handleNavigate}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F9F9F9]/95 dark:bg-dark-bg/95 backdrop-blur-sm px-6 h-20 flex items-center justify-between border-b border-transparent dark:border-dark-border transition-all duration-300">
        {/* Left: Logo */}
        <div className="flex items-center">
           <button 
             onClick={() => handleNavigate('home')}
             className="hover:opacity-80 transition-opacity"
           >
              <LogoIcon className="w-7 h-7 text-black dark:text-white" />
           </button>
           {/* Breadcrumbs for non-home pages */}
           {currentView !== 'home' && (
              <div className="hidden md:flex items-center ml-4 gap-2 text-sm font-medium">
                  <span className="text-gray-400 dark:text-gray-600">/</span>
                  <span className="text-gray-900 dark:text-gray-200 capitalize truncate max-w-[200px]">
                      {currentView === 'browse' ? 'Browse' : toHumanReadable(currentView)}
                  </span>
              </div>
           )}
        </div>

        {/* Center: Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(link => (
            <React.Fragment key={link.id}>
              <button
                onClick={() => {
                  if (link.id === 'home') handleNavigate('home');
                  else if (link.id === 'browse') handleNavigate('browse');
                  else if (link.id === 'photos') handleNavigate('photos');
                  else {
                    handleNavigate('browse');
                  }
                }}
                className={`text-[15px] font-medium transition-colors ${
                  isLinkActive(link.id)
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
              {link.id === 'home' && (
                <span className="text-gray-300 dark:text-gray-700 font-light px-2">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-dark-hover rounded-full transition-colors"
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Admin Button */}
          <button 
            onClick={() => handleNavigate('admin')}
            className={`p-2 hover:bg-gray-200/50 dark:hover:bg-dark-hover rounded-full transition-colors ${currentView === 'admin' ? 'bg-gray-200/50 dark:bg-dark-hover text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            title="Admin Access"
          >
            <Lock className="w-5 h-5 stroke-[2.5px]" />
          </button>

          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-gray-200/50 dark:hover:bg-dark-hover rounded-full transition-colors"
          >
            <Search className="w-5 h-5 text-gray-900 dark:text-white stroke-[2.5px]" />
          </button>
          
          {/* Mobile Menu Trigger */}
          <button className="md:hidden p-2 hover:bg-gray-200/50 dark:hover:bg-dark-hover rounded-full transition-colors">
            <Menu className="w-6 h-6 stroke-1 text-gray-900 dark:text-white" />
          </button>
        </div>
      </header>

      {/* Main View Router */}
      <main className="transition-opacity duration-300">
        {currentView === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentView === 'browse' && <BrowsePage onNavigate={handleNavigate} />}
        
        {/* Pass State to Photos Page */}
        {currentView === 'photos' && <PhotosPage folders={folders} photos={photos} />}
        
        {currentView === 'about' && <AboutPage />}
        {currentView === 'privacy' && <PrivacyPage />}
        
        {/* Admin Route */}
        {currentView === 'admin' && (
          <AdminPage 
            photos={photos} 
            folders={folders} 
            setPhotos={setPhotos} 
            setFolders={setFolders}
          />
        )}
        
        {/* Dynamic Route Handler for Checklists */}
        {!['home', 'browse', 'photos', 'about', 'privacy', 'admin'].includes(currentView) && (
          <ChecklistPage topicId={currentView} />
        )}
      </main>

      {/* Footer - Shared across views */}
      <footer className="bg-[#F9F9F9] dark:bg-dark-bg pt-20 pb-16 px-6 border-t border-transparent dark:border-dark-border transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-2">
                <LogoIcon className="w-7 h-7 text-black dark:text-white" />
                <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">AJ WEB CHECKLIST</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm ml-10">Created by George Hatzis</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12">
            <div>
                <h4 className="font-bold mb-8 text-gray-900 dark:text-white text-lg">Website</h4>
                <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-[15px]">
                    {footerLinks.website.map(item => (
                        <li key={item} onClick={() => handleNavigate(item)} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{item}</li>
                    ))}
                </ul>
            </div>

             <div>
                <h4 className="font-bold mb-8 text-gray-900 dark:text-white text-lg">Components</h4>
                <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-[15px]">
                    {footerLinks.components.slice(0, 10).map(item => (
                         <li key={item} onClick={() => handleNavigate(item)} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{item}</li>
                    ))}
                </ul>
            </div>
            
            <div>
                <h4 className="font-bold mb-8 text-gray-900 dark:text-white opacity-0 md:opacity-100 select-none text-lg">Components (cont.)</h4>
                 <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-[15px]">
                    {footerLinks.components.slice(10).map(item => (
                         <li key={item} onClick={() => handleNavigate(item)} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{item}</li>
                    ))}
                </ul>
            </div>

             <div>
                <h4 className="font-bold mb-8 text-gray-900 dark:text-white text-lg">Flows</h4>
                <ul className="space-y-4 text-gray-500 dark:text-gray-400 text-[15px]">
                    {footerLinks.flows.map(item => (
                         <li key={item} onClick={() => handleNavigate(item)} className="hover:text-black dark:hover:text-white cursor-pointer transition-colors">{item}</li>
                    ))}
                </ul>
            </div>
          </div>

          <div className="mt-24 flex gap-8 text-gray-400 dark:text-gray-500 text-sm items-center">
            <button onClick={() => handleNavigate('about')} className="hover:text-black dark:hover:text-white transition-colors">About</button>
            <button onClick={() => handleNavigate('privacy')} className="hover:text-black dark:hover:text-white transition-colors">Privacy</button>
            <div className="flex-1"></div>
            <button onClick={() => handleNavigate('admin')} className="hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 opacity-50 hover:opacity-100">
               <Lock className="w-3 h-3" /> Admin
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}