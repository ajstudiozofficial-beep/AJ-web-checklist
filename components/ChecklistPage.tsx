import React, { useState, useEffect } from 'react';
import { CheckSquare, Image as ImageIcon, Layout, Box, GitMerge, Type, FileText, Component, Loader2 } from 'lucide-react';
import { Checklist } from './Checklist';
import { Inspiration } from './Inspiration';
import { Location404Icon } from './Icons';
import { ChecklistItemType, InspirationItemType, TabType } from '../types';

interface ChecklistPageProps {
  topicId: string;
}

// --- DATA STORE ---

interface TopicData {
  id: string;
  title: string;
  category: 'Website' | 'Component' | 'Flow' | 'Brand' | 'Topic';
  description: string;
  items: ChecklistItemType[];
  inspiration?: InspirationItemType[];
  icon?: React.ElementType;
}

const TOPICS: Record<string, TopicData> = {
  '404': {
    id: '404',
    title: '404 Page',
    category: 'Website',
    description: 'A 404 page appears when users attempt to access a non-existent or moved webpage. It communicates the error in a friendly way and helps users navigate back to working pages.',
    icon: Location404Icon,
    items: [
      { id: 1, title: 'Logo', description: 'Either your complete logo or a symbol mark' },
      { id: 2, title: 'Title', description: 'Make it clear the user is on the 404 page' },
      { id: 3, title: 'Description', description: 'Explain why the user has landed on this page' },
      { id: 4, title: 'Links to other pages', description: 'Offer pathways to stick around', subItems: ['Homepage link', 'Contact link', 'Search bar'] },
      { id: 5, title: 'Visual flair', description: 'This page is a great opportunity to show off your brand\'s personality' }
    ],
    inspiration: [
        { id: 1, title: 'Standard Layout', type: 'behold' },
        { id: 2, title: 'Minimal', type: 'behold' },
        { id: 3, title: 'Illustrated', type: 'behold' },
        { id: 4, title: 'Search Focused', type: 'behold' },
        { id: 5, title: 'Dark Mode', type: 'behold' },
        { id: 6, title: 'Branded', type: 'behold' },
    ]
  },
  'login': {
    id: 'login',
    title: 'Login',
    category: 'Website',
    description: 'The login page is the gateway to your application. It should be simple, secure, and focused on getting the user into the app as quickly as possible.',
    items: [
      { id: 1, title: 'Username/Email field', description: 'Clearly labeled input for identification' },
      { id: 2, title: 'Password field', description: 'Secure input with toggle visibility option' },
      { id: 3, title: 'Forgot Password link', description: 'Clear recovery path for users' },
      { id: 4, title: 'Submit button', description: 'Prominent call to action' },
      { id: 5, title: 'Sign up option', description: 'Link for new users who landed here by mistake' },
      { id: 6, title: 'Social login', description: 'Alternative authentication methods (Google, GitHub, etc.)' }
    ],
    inspiration: [
        { id: 1, title: 'Card Login', type: 'login-simple' },
        { id: 2, title: 'Split Screen', type: 'login-simple' },
        { id: 3, title: 'Modal', type: 'login-simple' },
        { id: 4, title: 'Social First', type: 'login-simple' },
        { id: 5, title: 'Enterprise', type: 'login-simple' },
        { id: 6, title: 'Passwordless', type: 'login-simple' }
    ]
  },
  'button': {
    id: 'button',
    title: 'Button',
    category: 'Component',
    description: 'Buttons allow users to take actions, and make choices, with a single tap. They communicate actions that users can take.',
    items: [
      { id: 1, title: 'Clear label', description: 'Action-oriented text (e.g., "Save", "Delete")' },
      { id: 2, title: 'Visual hierarchy', description: 'Distinguish primary, secondary, and tertiary actions' },
      { id: 3, title: 'Hover & Focus states', description: 'Visual feedback for interaction' },
      { id: 4, title: 'Disabled state', description: 'Visibly distinct state when action is unavailable' },
      { id: 5, title: 'Loading state', description: 'Feedback when the action is processing' },
      { id: 6, title: 'Touch target size', description: 'Minimum 44x44px for mobile accessibility' }
    ],
    inspiration: [
        { id: 1, title: 'Primary', type: 'button-gallery' },
        { id: 2, title: 'Secondary', type: 'button-gallery' },
        { id: 3, title: 'Outline', type: 'button-gallery' },
        { id: 4, title: 'Destructive', type: 'button-gallery' },
        { id: 5, title: 'Ghost', type: 'button-gallery' },
        { id: 6, title: 'Icon Only', type: 'button-gallery' }
    ]
  },
  'cart': {
    id: 'cart',
    title: 'Shopping Cart',
    category: 'Website',
    description: 'The cart page summarizes the products a user intends to purchase before checkout.',
    items: [
      { id: 1, title: 'Product list', description: 'Clear thumbnail, title, and price for each item' },
      { id: 2, title: 'Quantity controls', description: 'Easy way to update or remove items' },
      { id: 3, title: 'Total cost', description: 'Subtotal, estimated tax, and shipping' },
      { id: 4, title: 'Checkout button', description: 'Primary action to proceed' },
      { id: 5, title: 'Empty state', description: 'Friendly message and CTA to shop when empty' }
    ],
    inspiration: [
        { id: 1, title: 'Drawer Right', type: 'cart-drawer' },
        { id: 2, title: 'Full Page', type: 'cart-drawer' },
        { id: 3, title: 'Modal', type: 'cart-drawer' },
        { id: 4, title: 'Mini Cart', type: 'cart-drawer' },
        { id: 5, title: 'Two Column', type: 'cart-drawer' },
        { id: 6, title: 'Empty State', type: 'cart-drawer' }
    ]
  },
  'input-field': {
    id: 'input-field',
    title: 'Input Field',
    category: 'Component',
    description: 'Input fields allow users to enter text into a UI. They typically appear in forms and dialogs.',
    items: [
      { id: 1, title: 'Label', description: 'Clear description of what information is needed' },
      { id: 2, title: 'Placeholder', description: 'Example input (optional, don\'t use as label)' },
      { id: 3, title: 'Focus state', description: 'Highlight when active' },
      { id: 4, title: 'Error state', description: 'Clear visual indicator and error message text' },
      { id: 5, title: 'Helper text', description: 'Additional instructions if needed' }
    ],
    inspiration: [
        { id: 1, title: 'Default', type: 'input-states' },
        { id: 2, title: 'Active', type: 'input-states' },
        { id: 3, title: 'Filled', type: 'input-states' },
        { id: 4, title: 'Error', type: 'input-states' },
        { id: 5, title: 'Success', type: 'input-states' },
        { id: 6, title: 'Disabled', type: 'input-states' }
    ]
  },
  'loading': {
    id: 'loading',
    title: 'Loading',
    category: 'Component',
    description: 'Loading states reassure users that their request is being processed. Good loading states reduce uncertainty and perceived wait time.',
    icon: Loader2,
    items: [
      { id: 1, title: 'Skeleton screens', description: 'Use skeleton screens for initial page loads to reduce perceived latency.' },
      { id: 2, title: 'Spinners', description: 'Use spinners for short actions (less than 1s) where the structure doesn\'t change.' },
      { id: 3, title: 'Progress bars', description: 'Use progress bars for long actions (more than 1s) to show deterministic progress.' },
      { id: 4, title: 'Disable interactions', description: 'Prevent double submissions by disabling buttons while loading.' },
      { id: 5, title: 'Text feedback', description: 'Pair loaders with text like "Saving..." or "Uploading..." for clarity.' }
    ],
    inspiration: [
        { id: 1, title: 'Skeleton Card', type: 'skeleton' },
        { id: 2, title: 'Spinner', type: 'spinner' },
        { id: 3, title: 'Progress Bar', type: 'skeleton' },
        { id: 4, title: 'Button Loading', type: 'spinner' },
        { id: 5, title: 'Full Page', type: 'skeleton' },
        { id: 6, title: 'Text Loader', type: 'skeleton' }
    ]
  }
};

// --- HELPER: GENERATE GENERIC DATA ---

const getGenericInspiration = (topicId: string, category: string): InspirationItemType[] => {
    const t = topicId.toLowerCase();
    
    // 1. Form-like pages
    if (t.includes('login') || t.includes('sign') || t.includes('register') || t.includes('password') || t.includes('contact') || t.includes('form') || t.includes('subscribe')) {
        return [
          { id: 1, title: 'Simple Form', type: 'generic-form' },
          { id: 2, title: 'With Icons', type: 'generic-form' },
          { id: 3, title: 'Horizontal', type: 'generic-form' },
          { id: 4, title: 'Modal View', type: 'generic-form' },
          { id: 5, title: 'Multi-step', type: 'generic-form' },
          { id: 6, title: 'Dark Theme', type: 'generic-form' },
        ];
    }

    // 2. Content-heavy pages
    if (t.includes('blog') || t.includes('article') || t.includes('news') || t.includes('faq') || t.includes('about') || t.includes('privacy') || t.includes('terms') || t.includes('career') || t.includes('team') || t.includes('search')) {
        return [
          { id: 1, title: 'Standard Layout', type: 'content-layout' },
          { id: 2, title: 'With Sidebar', type: 'content-layout' },
          { id: 3, title: 'Grid View', type: 'content-layout' },
          { id: 4, title: 'Hero Header', type: 'content-layout' },
          { id: 5, title: 'Minimal Text', type: 'content-layout' },
          { id: 6, title: 'Rich Media', type: 'content-layout' },
        ];
    }

    // 3. Components
    if (category === 'Component' || t.includes('toggle') || t.includes('checkbox') || t.includes('radio') || t.includes('badge') || t.includes('avatar') || t.includes('tooltip') || t.includes('modal') || t.includes('card') || t.includes('table') || t.includes('banner')) {
        return [
          { id: 1, title: 'Default', type: 'component-playground' },
          { id: 2, title: 'Secondary', type: 'component-playground' },
          { id: 3, title: 'Outline', type: 'component-playground' },
          { id: 4, title: 'Destructive', type: 'component-playground' },
          { id: 5, title: 'Ghost', type: 'component-playground' },
          { id: 6, title: 'With Icon', type: 'component-playground' },
        ];
    }

    // 4. Cart specific (fallback if not caught by TOPICS)
    if (t.includes('cart') || t.includes('checkout')) {
         return [
            { id: 1, title: 'Drawer', type: 'cart-drawer' },
            { id: 2, title: 'Modal', type: 'cart-drawer' },
            { id: 3, title: 'Page', type: 'cart-drawer' },
            { id: 4, title: 'Mini', type: 'cart-drawer' },
            { id: 5, title: 'Review', type: 'cart-drawer' },
            { id: 6, title: 'Empty', type: 'cart-drawer' },
         ];
    }
    
    // 5. Default Fallback
    return [
      { id: 1, title: 'Variant 1', type: 'component-playground' },
      { id: 2, title: 'Variant 2', type: 'component-playground' },
      { id: 3, title: 'Variant 3', type: 'component-playground' },
      { id: 4, title: 'Variant 4', type: 'component-playground' },
      { id: 5, title: 'Variant 5', type: 'component-playground' },
      { id: 6, title: 'Variant 6', type: 'component-playground' },
    ];
};

const generateGenericData = (topicId: string): TopicData => {
  // Convert slug to Title Case: "blog-post" -> "Blog Post"
  const title = topicId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  // Guess category
  let category: TopicData['category'] = 'Website';
  if (['button', 'card', 'modal', 'icon', 'table', 'loading', 'input-field', 'banner', 'toast', 'toggle', 'checkbox', 'radio', 'tooltip', 'badge', 'avatar', 'searchbar', 'tabs', 'slider', 'navigation'].some(k => topicId.includes(k))) category = 'Component';
  if (['flow', 'adding', 'resetting', 'submitting', 'uploading', 'verifying', 'canceling', 'entering', 'showing', 'making'].some(k => topicId.includes(k))) category = 'Flow';
  if (['brand', 'logo', 'typography', 'tone'].some(k => topicId.includes(k))) category = 'Brand';
  if (['topics', 'ux', 'dark', 'responsiveness'].some(k => topicId.includes(k))) category = 'Topic';

  return {
    id: topicId,
    title: title,
    category: category,
    description: `Essential checklist items for designing a perfect ${title}. Ensure your ${title.toLowerCase()} provides a great user experience by following these standard best practices.`,
    icon: category === 'Component' ? Component : (category === 'Flow' ? GitMerge : Layout),
    items: [
      { id: 1, title: 'Purpose & Clarity', description: `Ensure the ${title.toLowerCase()} has a clear goal and communicates it effectively to the user.` },
      { id: 2, title: 'Accessibility', description: 'Verify contrast ratios, keyboard navigation, and screen reader support.' },
      { id: 3, title: 'Responsiveness', description: 'Ensure layout adapts gracefully to mobile, tablet, and desktop screens.' },
      { id: 4, title: 'Error Handling', description: 'Provide clear feedback for any errors or edge cases.' },
      { id: 5, title: 'Performance', description: 'Optimize assets and code to ensure fast loading times.' },
      { id: 6, title: 'Visual Consistency', description: 'Match the styling with the rest of the design system.' },
      { id: 7, title: 'Content Hierarchy', description: 'Organize information logically with clear headings and spacing.' }
    ],
    // Smartly assign valid inspiration instead of 404
    inspiration: getGenericInspiration(topicId, category)
  };
};

export const ChecklistPage: React.FC<ChecklistPageProps> = ({ topicId }) => {
  const [activeTab, setActiveTab] = useState<TabType>('checklist');
  const [checkedState, setCheckedState] = useState<Record<number, boolean>>({});

  // Reset state when topic changes
  useEffect(() => {
    setActiveTab('checklist');
    setCheckedState({});
  }, [topicId]);

  // Get data or generate fallback
  const data = TOPICS[topicId] || generateGenericData(topicId);
  const Icon = data.icon || (data.category === 'Component' ? Box : (data.category === 'Flow' ? GitMerge : FileText));

  const toggleCheck = (id: number) => {
    setCheckedState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecks = () => setCheckedState({});

  return (
    <>
      {/* Hero Section */}
      <section className="pt-12 pb-12 flex flex-col items-center text-center px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-6 p-4 bg-white dark:bg-dark-card rounded-[24px] shadow-sm">
            <Icon className="w-12 h-12 text-gray-900 dark:text-white" strokeWidth={1.5} />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight text-gray-900 dark:text-white">{data.title}</h1>
        <p className="text-xl text-purple-600 dark:text-purple-400 font-medium mb-6 bg-purple-50 dark:bg-purple-900/20 px-4 py-1 rounded-full">{data.category}</p>
        
        <p className="max-w-2xl text-gray-500 dark:text-gray-400 leading-relaxed mb-10 text-[16px]">
          {data.description}
        </p>

        {/* Tab Switcher */}
        <div className="bg-white dark:bg-dark-card p-1.5 rounded-2xl inline-flex shadow-sm border border-gray-100 dark:border-dark-border">
          <button 
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'checklist' 
                ? 'bg-[#1C1C1E] dark:bg-white text-white dark:text-black shadow-md' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            Checklist
          </button>
          <button 
             onClick={() => setActiveTab('inspiration')}
             className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'inspiration' 
                ? 'bg-[#1C1C1E] dark:bg-white text-white dark:text-black shadow-md' 
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Inspiration
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="pb-24">
        {activeTab === 'checklist' ? (
          <Checklist 
            items={data.items} 
            checkedState={checkedState} 
            onToggle={toggleCheck}
            onReset={resetChecks}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
              {data.inspiration ? (
                  <Inspiration items={data.inspiration} />
              ) : (
                  <div className="text-center py-20 px-6 max-w-lg">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-dark-card rounded-full flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No inspiration added yet</h3>
                      <p className="text-gray-500 dark:text-gray-400">We haven't curated specific examples for {data.title} yet. Check back soon!</p>
                  </div>
              )}
          </div>
        )}
      </main>
    </>
  );
};