import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface SuggestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuggestModal: React.FC<SuggestModalProps> = ({ isOpen, onClose }) => {
  const [suggestion, setSuggestion] = useState('');
  const [category, setCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['Website', 'Components', 'Flows', 'Brand', 'Topics'];

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setSuggestion('');
      setCategory('');
      setIsDropdownOpen(false);
      setIsSubmitted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className={`relative w-full max-w-[480px] bg-white dark:bg-dark-card rounded-[32px] p-10 shadow-2xl scale-100 transition-all animate-in fade-in zoom-in-95 duration-200 ${isSubmitted ? 'flex flex-col justify-center items-center text-center h-[520px]' : ''}`}>
        
        {isSubmitted ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-[28px] font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Thanks for your suggestion!</h2>
                <p className="text-gray-500 dark:text-gray-400 text-[16px] font-medium">We'll work on including your idea soon.</p>
            </div>
        ) : (
            <>
                <h2 className="text-[28px] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Suggest a checklist</h2>
                <p className="text-gray-500 dark:text-gray-400 text-[16px] mb-8 leading-relaxed font-medium">
                Tell us about the design challenge or process you think needs a checklist.
                </p>

                <form onSubmit={handleSubmit}>
                {/* Textarea */}
                <div className="mb-6">
                    <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-wide">Your suggestion</label>
                    <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="w-full h-36 bg-[#F9F9F9] dark:bg-dark-bg border border-transparent focus:bg-white dark:focus:bg-dark-card focus:border-purple-500 rounded-xl p-4 text-gray-900 dark:text-white resize-none outline-none transition-all text-[16px]"
                    required
                    />
                </div>

                {/* Category Dropdown */}
                <div className="mb-8 relative" ref={dropdownRef}>
                    <label className="block text-[13px] font-bold text-gray-400 mb-2 ml-1 uppercase tracking-wide">Category</label>
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`w-full h-14 bg-[#F9F9F9] dark:bg-dark-bg border transition-all cursor-pointer rounded-xl px-4 flex items-center justify-between text-[16px] ${isDropdownOpen ? 'bg-white dark:bg-dark-card border-purple-500 ring-4 ring-purple-500/10' : 'border-transparent hover:bg-[#F0F0F0] dark:hover:bg-dark-hover'}`}
                    >
                        <span className={category ? 'text-gray-900 dark:text-white' : 'text-gray-400'}>
                            {category || 'Select...'}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-dark-border overflow-hidden z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Select...</div>
                            {categories.map((cat) => (
                                <div 
                                    key={cat}
                                    onClick={() => {
                                        setCategory(cat);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`px-4 py-3 cursor-pointer text-[15px] font-medium transition-colors ${category === cat ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-hover'}`}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button 
                    type="submit"
                    className="w-full h-14 bg-[#6D28D9] hover:bg-[#5B21B6] text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-200 dark:shadow-purple-900/30 text-[16px]"
                >
                    Submit
                </button>
                </form>
            </>
        )}
      </div>
    </div>
  );
};