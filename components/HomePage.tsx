import React, { useState } from 'react';
import { 
  MapPin, FileText, Briefcase, ShoppingCart, 
  Layout, MousePointerClick, Square, GalleryHorizontal, CheckSquare, 
  Upload, ShieldCheck, ShoppingBag, ArrowRight,
  Trash2, Check, Notebook, Zap, MessageSquare,
  Smartphone, PenTool, Moon, Hexagon, Type, CreditCard, List, Clapperboard, Lightbulb, User, HelpCircle, LogIn, Mail,
  Key, LifeBuoy, Info, ShoppingBasket, Megaphone, CornerDownLeft, Loader2
} from 'lucide-react';
import { FigmaIcon } from './Icons';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const CategoryCard = ({ 
  title, 
  count, 
  description, 
  children,
  className = ""
}: { 
  title: string; 
  count: number; 
  description: string; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-[32px] p-10 ${className} hover:shadow-xl transition-shadow duration-300 dark:bg-dark-card dark:border dark:border-dark-border`}>
    <div className="flex items-baseline gap-3 mb-4">
      <h2 className="text-[40px] font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
      <span className="text-[40px] font-bold text-gray-300 dark:text-gray-600 tracking-tight">{count}</span>
    </div>
    <p className="text-gray-500 dark:text-gray-400 text-[16px] leading-relaxed max-w-lg mb-10">
      {description}
    </p>
    <div className="flex flex-wrap gap-3">
      {children}
    </div>
  </div>
);

const Pill = ({ 
  icon: Icon, 
  label, 
  onClick 
}: { 
  icon?: React.ElementType; 
  label: string; 
  onClick?: () => void;
}) => (
  <button 
    onClick={onClick}
    className="bg-white dark:bg-dark-hover dark:border dark:border-dark-border hover:bg-white/60 dark:hover:bg-dark-bg transition-all px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm text-gray-900 dark:text-gray-100 font-medium text-[15px] group whitespace-nowrap hover:-translate-y-0.5 hover:shadow-md"
  >
    {Icon && <Icon className="w-[18px] h-[18px] text-gray-900 dark:text-gray-100 stroke-[1.5px]" />}
    {label}
  </button>
);

const PillLink = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button onClick={onClick} className="bg-black/5 dark:bg-white/5 hover:bg-white/50 dark:hover:bg-white/10 transition-colors px-6 py-4 rounded-2xl flex items-center gap-2 text-gray-900 dark:text-gray-100 font-medium text-[15px]">
    {label} <ArrowRight className="w-4 h-4 ml-1" />
  </button>
);

const FloatingIcon = ({ 
  icon: Icon, 
  className 
}: { 
  icon: React.ElementType; 
  className?: string; 
}) => (
  <div className={`absolute w-20 h-20 bg-[#F2EAE5] dark:bg-dark-card dark:border dark:border-dark-border rounded-[24px] flex items-center justify-center shadow-sm text-gray-900 dark:text-white ${className} hover:scale-110 transition-transform duration-300`}>
    <Icon className="w-8 h-8 stroke-[1.5px]" />
  </div>
);

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscriptionState, setSubscriptionState] = useState<'idle' | 'loading' | 'success'>('idle');

  // Helper to slugify navigation
  const navTo = (title: string) => {
    onNavigate(title.toLowerCase().replace(/\s+/g, '-'));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscriptionState('loading');
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Subscribed: ${email}`);
      setSubscriptionState('success');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24 pt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Icons */}
      <div className="flex justify-center items-center gap-5 mb-10 overflow-x-auto py-8 mask-linear no-scrollbar">
        <div className="w-[72px] h-[72px] flex-shrink-0 rounded-[24px] bg-[#F5F5F5] dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center shadow-sm text-gray-600 dark:text-gray-300 rotate-[-4deg] translate-y-3">
           <MessageSquare className="w-7 h-7 stroke-[1.5px]" />
        </div>
        <div className="w-[72px] h-[72px] flex-shrink-0 rounded-[24px] bg-[#EAEAEA] dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center shadow-sm text-gray-600 dark:text-gray-300 rotate-[-2deg]">
           <Trash2 className="w-7 h-7 stroke-[1.5px]" />
        </div>
        <div className="w-[72px] h-[72px] flex-shrink-0 rounded-[24px] bg-[#E0E5EB] dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center shadow-sm text-gray-600 dark:text-gray-300">
           <CreditCard className="w-7 h-7 stroke-[1.5px]" />
        </div>
        
        {/* Main Logo */}
        <div className="w-[88px] h-[88px] flex-shrink-0 rounded-[36px] bg-black dark:bg-white flex items-center justify-center shadow-xl z-10 scale-105 mx-2 hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => onNavigate('home')}>
           <Check className="w-10 h-10 text-white dark:text-black stroke-[3px]" />
        </div>

        <div className="w-[72px] h-[72px] flex-shrink-0 rounded-[24px] bg-[#EFE4D8] dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center shadow-sm text-gray-600 dark:text-gray-300">
           <List className="w-7 h-7 stroke-[1.5px]" />
        </div>
        <div className="w-[72px] h-[72px] flex-shrink-0 rounded-[24px] bg-[#F2EDE9] dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center shadow-sm text-gray-600 dark:text-gray-300 rotate-[2deg]">
           <Clapperboard className="w-7 h-7 stroke-[1.5px]" />
        </div>
        <div className="w-[72px] h-[72px] flex-shrink-0 rounded-[24px] bg-[#F5F5F5] dark:bg-dark-card dark:border dark:border-dark-border flex items-center justify-center shadow-sm text-gray-600 dark:text-gray-300 rotate-[4deg] translate-y-3">
           <Lightbulb className="w-7 h-7 stroke-[1.5px]" />
        </div>
      </div>

      {/* Hero Text */}
      <div className="text-center mb-24">
        <h1 className="text-[64px] font-bold tracking-tight mb-4 text-gray-900 dark:text-white leading-tight">AJ WEB CHECKLIST</h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">A collection of the best design practices.</p>
      </div>

      {/* Content Grid */}
      <div className="space-y-8">
        
        <div className="grid md:grid-cols-2 gap-8">
            {/* Website Section */}
            <CategoryCard 
              title="Website" 
              count={12} 
              description="A collection of web pages that promote a company and what it offers through content. It serves as a destination for visitors to be guided towards specific goals."
              className="bg-[#EAEBED]" // Cool gray (Dark mode handled in component)
            >
              <Pill icon={MapPin} label="404" onClick={() => navTo('404')} />
              <Pill icon={Layout} label="Blog" onClick={() => navTo('Blog')} />
              <Pill icon={FileText} label="Blog Post" onClick={() => navTo('Blog Post')} />
              <Pill icon={Briefcase} label="Careers" onClick={() => navTo('Careers')} />
              <Pill icon={ShoppingBag} label="Cart" onClick={() => navTo('Cart')} />
              <Pill icon={Mail} label="Contact Us" onClick={() => navTo('Contact Us')} />
              <Pill icon={HelpCircle} label="FAQ" onClick={() => navTo('FAQ')} />
              <Pill icon={LogIn} label="Login" onClick={() => navTo('Login')} />
              <PillLink label="More" onClick={() => onNavigate('browse')} />
            </CategoryCard>

            {/* Components Section */}
            <CategoryCard 
              title="Components" 
              count={20} 
              description="Essential building blocks for applications and websites that when systemised, become powerful at scale and make it easier to create new features."
              className="bg-[#F2EAE5]" // Warm beige
            >
              <Pill icon={Layout} label="Banner" onClick={() => navTo('Banner')} />
              <Pill icon={MousePointerClick} label="Button" onClick={() => navTo('Button')} />
              <Pill icon={Square} label="Card" onClick={() => navTo('Card')} />
              <Pill icon={GalleryHorizontal} label="Carousel" onClick={() => navTo('Carousel')} />
              <Pill icon={CheckSquare} label="Checkbox" onClick={() => navTo('Checkbox')} />
              <Pill icon={Zap} label="Icon" onClick={() => navTo('Icon')} />
              <Pill icon={Type} label="Input Field" onClick={() => navTo('Input Field')} />
              <Pill icon={Zap} label="Loading" onClick={() => navTo('Loading')} />
              <PillLink label="More" onClick={() => onNavigate('browse')} />
            </CategoryCard>
        </div>

        {/* Flows Section */}
        <CategoryCard 
          title="Flows" 
          count={12} 
          description="Flows map out how users move through multiple steps. These checklists help you think through different states and scenarios as users navigate from start to finish."
          className="bg-[#E3E9E6]" // Greenish gray
        >
          <Pill icon={Upload} label="Uploading media" onClick={() => navTo('Uploading media')} />
          <Pill icon={ShieldCheck} label="Verifying account" onClick={() => navTo('Verifying account')} />
          <Pill icon={ShoppingCart} label="Adding to cart" onClick={() => navTo('Adding to cart')} />
          <Pill icon={CreditCard} label="Canceling subscription" onClick={() => navTo('Canceling subscription')} />
          <Pill icon={Check} label="Saving changes" onClick={() => navTo('Saving changes')} />
          <Pill icon={Zap} label="Entering promo code" onClick={() => navTo('Entering promo code')} />
          <Pill icon={Zap} label="Showing input error" onClick={() => navTo('Showing input error')} />
          <PillLink label="More" onClick={() => onNavigate('browse')} />
        </CategoryCard>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Topics Section */}
            <CategoryCard 
              title="Topics" 
              count={3} 
              description="Overall aspects of design that apply to UI and UX"
              className="bg-[#EAE8E4]" // Warm gray
            >
              <Pill icon={Smartphone} label="Responsiveness" onClick={() => navTo('Responsiveness')} />
              <Pill icon={PenTool} label="UX copy" onClick={() => navTo('UX copy')} />
              <Pill icon={Moon} label="Dark mode" onClick={() => navTo('Dark mode')} />
            </CategoryCard>

            {/* Brand Section */}
            <CategoryCard 
              title="Brand" 
              count={3} 
              description="The elements that make up the visual identity of a company"
              className="bg-[#EFF2F6]" // Cool blueish gray
            >
              <Pill icon={Hexagon} label="Logo" onClick={() => navTo('Logo')} />
              <Pill icon={Type} label="Typography" onClick={() => navTo('Typography')} />
              <Pill icon={MessageSquare} label="Tone of voice" onClick={() => navTo('Tone of voice')} />
            </CategoryCard>
        </div>

      </div>

      {/* View Full Directory */}
      <div className="py-40 relative flex flex-col items-center text-center overflow-hidden my-12">
        {/* Decorative Icons */}
        <FloatingIcon icon={Key} className="left-[5%] top-10 rotate-[-15deg]" />
        <FloatingIcon icon={LifeBuoy} className="left-[25%] top-5 rotate-[15deg]" />
        <FloatingIcon icon={Info} className="right-[25%] top-5 rotate-[-10deg]" />
        <FloatingIcon icon={Key} className="right-[5%] top-12 rotate-[25deg]" />
        
        <FloatingIcon icon={CornerDownLeft} className="left-[8%] bottom-10 rotate-[10deg]" />
        <FloatingIcon icon={ShoppingBasket} className="left-[28%] bottom-5 rotate-[-5deg]" />
        <FloatingIcon icon={Megaphone} className="left-[45%] -bottom-10 rotate-[15deg] opacity-50" /> {/* Centered low */}
        <FloatingIcon icon={Briefcase} className="right-[28%] bottom-5 rotate-[10deg]" />
        <FloatingIcon icon={CreditCard} className="right-[10%] bottom-12 rotate-[-8deg]" />

        {/* Content */}
        <div className="relative z-10">
            <h2 className="text-[40px] font-bold text-gray-900 dark:text-white mb-8 tracking-tight">View the full directory</h2>
            <button 
                onClick={() => onNavigate('browse')}
                className="bg-white dark:bg-dark-card hover:bg-gray-50 dark:hover:bg-dark-hover text-gray-900 dark:text-white px-8 py-4 rounded-2xl text-[15px] font-bold shadow-sm border border-gray-200 dark:border-dark-border transition-all flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
            >
                Show me 50 checklists
            </button>
        </div>
      </div>

      {/* Checklist in your favourite tools (Figma Plugin) */}
      <div className="mb-32">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Checklist in your favourite tools</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="md:pl-12">
                <div className="flex items-center gap-4 mb-8">
                     <div className="w-16 h-16 bg-[#F5F5F5] dark:bg-dark-card rounded-2xl flex items-center justify-center">
                        <Check className="w-8 h-8 text-gray-900 dark:text-white stroke-[2.5px]" />
                     </div>
                     <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center">
                        <FigmaIcon className="w-8 h-8" />
                     </div>
                </div>
                
                <h3 className="text-5xl font-bold text-gray-900 dark:text-white mb-8">Figma Plugin</h3>
                
                <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4">
                    <List className="w-6 h-6 text-gray-900 dark:text-white stroke-[1.5px]" />
                    <span className="text-lg text-gray-600 dark:text-gray-300">Check every detail</span>
                    </div>
                    <div className="flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-900 dark:border-white border-dashed animate-spin-slow"></div>
                    </div>
                    <span className="text-lg text-gray-600 dark:text-gray-300">Save your progress</span>
                    </div>
                    <div className="flex items-center gap-4">
                    <Zap className="w-6 h-6 text-gray-900 dark:text-white stroke-[1.5px]" />
                    <span className="text-lg text-gray-600 dark:text-gray-300">Ship better designs</span>
                    </div>
                </div>
                
                <button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-purple-200 dark:shadow-purple-900/30 transition-colors">
                    Open in Figma
                </button>
            </div>
            
            {/* Right: Preview Graphic */}
            <div className="relative flex justify-center">
               <div className="bg-white dark:bg-dark-card rounded-xl shadow-2xl p-6 border border-gray-100 dark:border-dark-border transform rotate-2 max-w-sm w-full hover:rotate-0 transition-transform duration-500">
                   <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-dark-border pb-4">
                       <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#1C1C1E] dark:bg-dark-bg rounded-lg flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                            </div>
                            <div className="font-bold text-sm text-gray-900 dark:text-white">Checklist Design</div>
                       </div>
                       <div className="text-gray-400">
                           <XIcon className="w-4 h-4" />
                       </div>
                   </div>
                   
                   <div className="space-y-1 mb-4">
                        <div className="text-xl font-bold text-gray-900 dark:text-white">Login</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide font-bold">Website</div>
                        <div className="h-1 w-full bg-gray-100 dark:bg-dark-border rounded-full mt-2 overflow-hidden">
                            <div className="h-full w-1/3 bg-[#7C3AED]"></div>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-1">3/10</div>
                   </div>

                   <div className="space-y-3">
                        <div className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-100 dark:border-purple-800/30">
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-[#7C3AED] bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                                 <Check className="w-3 h-3 text-white" strokeWidth={3} />
                             </div>
                             <div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white">Logo</div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400">Either your complete logo or a symbol mark</div>
                             </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors">
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-[#7C3AED] flex items-center justify-center flex-shrink-0">
                                 <Check className="w-3 h-3 text-[#7C3AED] opacity-0" strokeWidth={3} />
                             </div>
                             <div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white">Title</div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400">Tell the user this is where they login</div>
                             </div>
                        </div>
                         <div className="flex items-start gap-3 p-3 rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-dark-hover transition-colors">
                             <div className="mt-0.5 w-4 h-4 rounded border-2 border-[#7C3AED] flex items-center justify-center flex-shrink-0">
                                 <Check className="w-3 h-3 text-[#7C3AED] opacity-0" strokeWidth={3} />
                             </div>
                             <div>
                                <div className="text-sm font-bold text-gray-900 dark:text-white">Account identification</div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400">A unique identifier for the user</div>
                             </div>
                        </div>
                   </div>
               </div>
            </div>
        </div>
      </div>

      {/* Notion Template Section */}
      <div className="flex justify-center mb-32">
        <div className="bg-white dark:bg-dark-card rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-dark-border inline-flex items-center gap-6 pr-12 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 pl-4">
                <div className="w-12 h-12 bg-[#F7F2EB] dark:bg-white/10 rounded-xl flex items-center justify-center">
                    <Check className="w-6 h-6 text-gray-800 dark:text-white" />
                </div>
                <div className="w-12 h-12 bg-white dark:bg-dark-bg border border-gray-100 dark:border-dark-border rounded-xl flex items-center justify-center shadow-sm -ml-4">
                    <span className="font-serif text-2xl font-bold text-black dark:text-white">N</span>
                </div>
            </div>
            <div className="text-left">
                <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-lg text-gray-900 dark:text-white">Notion template</span>
                    <span className="bg-[#DCFCE7] dark:bg-green-900/30 text-[#166534] dark:text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Coming Soon</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">All checklists set up as both databases and simple to-do lists for your next project.</p>
            </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-[#EAE8E4] dark:bg-dark-card dark:border dark:border-dark-border rounded-[32px] py-16 px-8 md:px-0 text-center relative overflow-hidden transition-colors">
        {subscriptionState === 'success' ? (
           <div className="animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-[#1C1C1E] dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                 <Check className="w-8 h-8 text-white dark:text-black" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">You're on the list!</h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Keep an eye on your inbox for new releases.</p>
           </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 max-w-xl mx-auto">
              Want to be notified about new releases?
            </h2>
            
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 justify-center mb-6 max-w-md mx-auto">
              <div className="flex-1">
                <label className="block text-left text-xs font-bold text-gray-500 dark:text-gray-400 mb-1 ml-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@georgehatzis.com" 
                  className="w-full h-12 rounded-xl px-4 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all bg-white dark:bg-dark-bg border-transparent dark:border-dark-border dark:placeholder-gray-600"
                  required
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  disabled={subscriptionState === 'loading'}
                  className="h-12 bg-[#1C1C1E] dark:bg-white text-white dark:text-black px-8 rounded-xl font-bold hover:bg-black dark:hover:bg-gray-200 transition-all w-full md:w-auto shadow-lg shadow-gray-400/20 dark:shadow-none disabled:opacity-70 disabled:cursor-wait flex items-center justify-center min-w-[120px]"
                >
                    {subscriptionState === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Notify me'}
                </button>
              </div>
            </form>
            
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              We will only use your email to notify you when new features are released.
            </p>
          </>
        )}
      </div>

    </div>
  );
};

// Helper for the Figma preview card
const XIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);
