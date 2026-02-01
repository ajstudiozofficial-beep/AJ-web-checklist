import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Layout, Layers, Hash, PenTool, Smartphone, Moon, Hexagon, Type, MessageSquare, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon?: React.ElementType;
}

// Full Searchable Dataset
const SEARCH_DATA: SearchItem[] = [
  // specialized
  { id: 'browse', title: 'Browse Checklists', category: 'General', description: 'AJ WEB CHECKLIST is a list of checklists ranging from website pages, to UI components.', icon: Layout },
  
  // Website
  { id: '404', title: '404 Page', category: 'Website', description: 'A 404 page appears when users attempt to access a non-existent or moved webpage.', icon: FileText },
  { id: 'blog', title: 'Blog', category: 'Website', description: 'A collection of articles and updates.', icon: FileText },
  { id: 'careers', title: 'Careers', category: 'Website', description: 'Listings for job openings and company culture.', icon: FileText },
  { id: 'cart', title: 'Shopping Cart', category: 'Website', description: 'Review items before purchase.', icon: FileText },
  { id: 'login', title: 'Login', category: 'Website', description: 'User authentication and access.', icon: FileText },
  
  // Brand
  { id: 'tone-of-voice', title: 'Tone of voice', category: 'Brand', description: 'The elements that make up the visual identity of a company.', icon: MessageSquare },
  { id: 'logo', title: 'Logo', category: 'Brand', description: 'Guidelines for logo usage and placement.', icon: Hexagon },
  { id: 'typography', title: 'Typography', category: 'Brand', description: 'Rules for font families, sizes, and weights.', icon: Type },

  // Topics
  { id: 'responsiveness', title: 'Responsiveness', category: 'Topics', description: 'Ensuring your design works across all device sizes.', icon: Smartphone },
  { id: 'ux-copy', title: 'UX copy', category: 'Topics', description: 'Writing clear and helpful text for user interfaces.', icon: PenTool },
  { id: 'dark-mode', title: 'Dark mode', category: 'Topics', description: 'Considerations for dark theme implementation.', icon: Moon },

  // Components (Sample)
  { id: 'navigation', title: 'Navigation', category: 'Components', description: 'Navigation helps users move between different sections.', icon: Layout },
  { id: 'button', title: 'Button', category: 'Components', description: 'Triggers an action or event.', icon: Layout },
  { id: 'card', title: 'Card', category: 'Components', description: 'Container for related information.', icon: Layout },
];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle Search Logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = SEARCH_DATA.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.category.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#2d2d2d]/95 dark:bg-black/95 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl flex flex-col items-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar */}
        <div className="w-full relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5 stroke-[2.5px]" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-white dark:bg-dark-card h-[72px] rounded-2xl pl-16 pr-12 text-xl font-medium text-gray-900 dark:text-white placeholder-gray-400 outline-none shadow-2xl transition-all border-2 border-transparent focus:border-purple-500"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 bg-gray-100 dark:bg-dark-hover rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results Dropdown */}
        {results.length > 0 && (
          <div className="w-full bg-white dark:bg-dark-card rounded-2xl mt-4 overflow-hidden shadow-2xl max-h-[60vh] overflow-y-auto animate-in slide-in-from-top-2">
            <div className="py-2">
              {results.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className="px-6 py-5 hover:bg-gray-50 dark:hover:bg-dark-hover cursor-pointer border-b border-gray-100 dark:border-dark-border last:border-0 transition-colors group"
                >
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className="mt-0.5 w-10 h-10 rounded-lg bg-gray-50 dark:bg-dark-bg flex items-center justify-center text-gray-500 dark:text-gray-400 flex-shrink-0 group-hover:bg-white dark:group-hover:bg-dark-card group-hover:shadow-sm transition-all border border-gray-100 dark:border-dark-border">
                       {item.icon ? <item.icon className="w-5 h-5 stroke-[1.5px]" /> : <Hash className="w-5 h-5" />}
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1">
                      <h4 className="text-[15px] text-gray-900 dark:text-white mb-1 leading-snug">
                        <span className="font-bold">{item.title}</span>
                        <span className="text-gray-400 font-normal"> — AJ WEB CHECKLIST</span>
                      </h4>
                      <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-1 font-medium">
                        {item.description}
                      </p>
                    </div>

                     <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all self-center" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};