import React, { useState } from 'react';
import { 
  Newspaper, MessageCircleQuestion, Key, ShoppingBasket, DollarSign, Briefcase, Users, MapPin, Search, AlignLeft, Mail, Hand,
  IdCard, AppWindow, SlidersHorizontal, Flag, RectangleHorizontal, Loader2, MousePointerClick, UserSquare, Info, StickyNote, ToggleRight, Table, Bookmark, Radio, MessageSquare, Star, CheckSquare, Columns, GalleryHorizontal,
  Hourglass, MoreHorizontal, LifeBuoy, ShieldCheck, AlertCircle, CreditCard, ImagePlus, Trash2, ShoppingCart, Tag, MousePointer2,
  Moon, PenTool, Smartphone, Hexagon, Type, MessageCircle
} from 'lucide-react';
import { SuggestModal } from './SuggestModal';

interface BrowsePageProps {
  onNavigate: (page: string) => void;
}

const Section = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {children}
    </div>
  </div>
);

interface CardProps {
  title: string;
  icon: React.ElementType;
  onClick?: () => void;
  hoverColor?: string;
}

const Card = ({ title, icon: Icon, onClick, hoverColor = "hover:bg-gray-100 dark:hover:bg-dark-hover" }: CardProps) => (
  <div 
    onClick={onClick}
    className={`bg-white dark:bg-dark-card rounded-[24px] p-7 h-44 flex flex-col justify-between transition-all duration-200 cursor-pointer ${hoverColor} group border border-transparent dark:border-dark-border hover:border-black/5 dark:hover:border-white/10 hover:shadow-lg hover:-translate-y-1`}
  >
    <div className="text-gray-900 dark:text-white">
      <Icon className="w-8 h-8 stroke-[1.5px]" />
    </div>
    <span className="font-bold text-[19px] text-gray-900 dark:text-white leading-tight">{title}</span>
  </div>
);

export const BrowsePage: React.FC<BrowsePageProps> = ({ onNavigate }) => {
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  // Helper to slugify navigation
  const navTo = (title: string) => {
    onNavigate(title.toLowerCase().replace(/\s+/g, '-'));
  };

  // Hover Colors matching HomePage sections
  const colors = {
    website: "hover:bg-[#EAEBED] dark:hover:bg-dark-hover",    
    components: "hover:bg-[#F2EAE5] dark:hover:bg-dark-hover", 
    flows: "hover:bg-[#E3E9E6] dark:hover:bg-dark-hover",      
    topics: "hover:bg-[#EAE8E4] dark:hover:bg-dark-hover",     
    brand: "hover:bg-[#EFF2F6] dark:hover:bg-dark-hover"       
  };

  return (
    <div className="max-w-[1400px] mx-auto px-8 py-20">
      
      <SuggestModal 
        isOpen={isSuggestModalOpen} 
        onClose={() => setIsSuggestModalOpen(false)} 
      />

      {/* Header */}
      <div className="text-center mb-24 animate-in fade-in zoom-in-95 duration-500">
        <h1 className="text-[56px] font-bold text-gray-900 dark:text-white mb-10 tracking-tight">Browse all checklists</h1>
        <div className="max-w-xl mx-auto relative group">
             <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
                <Search className="w-5 h-5" />
             </div>
             <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-[#EAE8E4] dark:bg-dark-card hover:bg-[#E3E1DD] dark:hover:bg-dark-hover focus:bg-white dark:focus:bg-dark-bg transition-all rounded-xl h-14 pl-12 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 outline-none border border-transparent dark:border-dark-border focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 text-lg shadow-sm" 
            />
        </div>
      </div>

      {/* Website Pages */}
      <Section title="Website pages">
        <Card title="Blog Post" icon={Newspaper} onClick={() => navTo('Blog Post')} hoverColor={colors.website} />
        <Card title="FAQ" icon={MessageCircleQuestion} onClick={() => navTo('FAQ')} hoverColor={colors.website} />
        <Card title="Login" icon={Key} onClick={() => navTo('Login')} hoverColor={colors.website} />
        <Card title="Cart" icon={ShoppingBasket} onClick={() => navTo('Cart')} hoverColor={colors.website} />
        <Card title="Pricing" icon={DollarSign} onClick={() => navTo('Pricing')} hoverColor={colors.website} />
        <Card title="Careers" icon={Briefcase} onClick={() => navTo('Careers')} hoverColor={colors.website} />
        <Card title="Team" icon={Users} onClick={() => navTo('Team')} hoverColor={colors.website} />
        <Card title="404" icon={MapPin} onClick={() => navTo('404')} hoverColor={colors.website} />
        <Card title="Search" icon={Search} onClick={() => navTo('Search')} hoverColor={colors.website} />
        <Card title="Blog" icon={AlignLeft} onClick={() => navTo('Blog')} hoverColor={colors.website} />
        <Card title="Contact Us" icon={Mail} onClick={() => navTo('Contact Us')} hoverColor={colors.website} />
        <Card title="Sign up" icon={Hand} onClick={() => navTo('Sign up')} hoverColor={colors.website} />
      </Section>

      {/* Components */}
      <Section title="Components">
        <Card title="Badge" icon={IdCard} onClick={() => navTo('Badge')} hoverColor={colors.components} />
        <Card title="Modal" icon={AppWindow} onClick={() => navTo('Modal')} hoverColor={colors.components} />
        <Card title="Slider" icon={SlidersHorizontal} onClick={() => navTo('Slider')} hoverColor={colors.components} />
        <Card title="Navigation" icon={Flag} onClick={() => navTo('Navigation')} hoverColor={colors.components} />
        <Card title="Input Field" icon={RectangleHorizontal} onClick={() => navTo('Input Field')} hoverColor={colors.components} />
        <Card title="Loading" icon={Loader2} onClick={() => navTo('Loading')} hoverColor={colors.components} />
        <Card title="Button" icon={MousePointerClick} onClick={() => navTo('Button')} hoverColor={colors.components} />
        <Card title="Avatar" icon={UserSquare} onClick={() => navTo('Avatar')} hoverColor={colors.components} />
        <Card title="Tooltip" icon={Info} onClick={() => navTo('Tooltip')} hoverColor={colors.components} />
        <Card title="Card" icon={StickyNote} onClick={() => navTo('Card')} hoverColor={colors.components} />
        <Card title="Toggle" icon={ToggleRight} onClick={() => navTo('Toggle')} hoverColor={colors.components} />
        <Card title="Table" icon={Table} onClick={() => navTo('Table')} hoverColor={colors.components} />
        <Card title="Banner" icon={Bookmark} onClick={() => navTo('Banner')} hoverColor={colors.components} />
        <Card title="Searchbar" icon={Search} onClick={() => navTo('Searchbar')} hoverColor={colors.components} />
        <Card title="Radio" icon={Radio} onClick={() => navTo('Radio')} hoverColor={colors.components} />
        <Card title="Toast" icon={MessageSquare} onClick={() => navTo('Toast')} hoverColor={colors.components} />
        <Card title="Icon" icon={Star} onClick={() => navTo('Icon')} hoverColor={colors.components} />
        <Card title="Checkbox" icon={CheckSquare} onClick={() => navTo('Checkbox')} hoverColor={colors.components} />
        <Card title="Tabs" icon={Columns} onClick={() => navTo('Tabs')} hoverColor={colors.components} />
        <Card title="Carousel" icon={GalleryHorizontal} onClick={() => navTo('Carousel')} hoverColor={colors.components} />
      </Section>

      {/* Flows */}
      <Section title="Flows">
        <Card title="Saving changes" icon={Hourglass} onClick={() => navTo('Saving changes')} hoverColor={colors.flows} />
        <Card title="Resetting password" icon={MoreHorizontal} onClick={() => navTo('Resetting password')} hoverColor={colors.flows} />
        <Card title="Contacting support" icon={LifeBuoy} onClick={() => navTo('Contacting support')} hoverColor={colors.flows} />
        <Card title="Verifying account" icon={ShieldCheck} onClick={() => navTo('Verifying account')} hoverColor={colors.flows} />
        <Card title="Showing input error" icon={AlertCircle} onClick={() => navTo('Showing input error')} hoverColor={colors.flows} />
        <Card title="Canceling subscription" icon={CreditCard} onClick={() => navTo('Canceling subscription')} hoverColor={colors.flows} />
        <Card title="Uploading media" icon={ImagePlus} onClick={() => navTo('Uploading media')} hoverColor={colors.flows} />
        <Card title="Deleting account" icon={Trash2} onClick={() => navTo('Deleting account')} hoverColor={colors.flows} />
        <Card title="Adding to cart" icon={ShoppingCart} onClick={() => navTo('Adding to cart')} hoverColor={colors.flows} />
        <Card title="Making a card payment" icon={CreditCard} onClick={() => navTo('Making a card payment')} hoverColor={colors.flows} />
        <Card title="Entering promo code" icon={Tag} onClick={() => navTo('Entering promo code')} hoverColor={colors.flows} />
        <Card title="Submitting a form" icon={MousePointer2} onClick={() => navTo('Submitting a form')} hoverColor={colors.flows} />
      </Section>

       {/* Topics */}
       <div className="mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card title="Dark mode" icon={Moon} onClick={() => navTo('Dark mode')} hoverColor={colors.topics} />
            <Card title="UX copy" icon={PenTool} onClick={() => navTo('UX copy')} hoverColor={colors.topics} />
            <Card title="Responsiveness" icon={Smartphone} onClick={() => navTo('Responsiveness')} hoverColor={colors.topics} />
        </div>
      </div>

       {/* Brands */}
       <div className="mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card title="Logo" icon={Hexagon} onClick={() => navTo('Logo')} hoverColor={colors.brand} />
            <Card title="Typography" icon={Type} onClick={() => navTo('Typography')} hoverColor={colors.brand} />
            <Card title="Tone of voice" icon={MessageCircle} onClick={() => navTo('Tone of voice')} hoverColor={colors.brand} />
        </div>
      </div>

      {/* Request Section */}
      <div className="bg-[#EAE8E4] dark:bg-dark-card dark:border dark:border-dark-border rounded-[32px] py-24 px-8 text-center animate-in fade-in zoom-in-95 duration-700 delay-300">
        <h2 className="text-[32px] font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Didn't find what you were looking for?
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">Let us know to add it to our backlog.</p>
        <button 
          onClick={() => setIsSuggestModalOpen(true)}
          className="bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl text-[15px] font-bold shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
             Submit a request
        </button>
      </div>

    </div>
  );
};
