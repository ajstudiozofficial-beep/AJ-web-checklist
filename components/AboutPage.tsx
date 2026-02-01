import React from 'react';

export const AboutPage = () => (
  <div className="max-w-3xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="mb-12">
        <span className="text-purple-600 dark:text-purple-400 font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">About AJ WEB CHECKLIST</h1>
    </div>
    
    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
      <p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
        AJ WEB CHECKLIST is a curated collection of the best design practices, created to help UI/UX designers and developers build better products.
      </p>
      
      <div className="space-y-8 text-gray-800 dark:text-gray-200 text-lg leading-relaxed">
        <p>
          We believe that great design is not just about aesthetics, but about functionality, accessibility, and user experience. By breaking down complex flows and components into manageable checklists, we aim to ensure that no detail is overlooked.
        </p>
        <p>
          Whether you are designing a simple button or a complex checkout flow, our checklists provide a solid foundation to start from. They are based on industry standards, extensive research, and real-world testing.
        </p>

        <div className="bg-gray-50 dark:bg-dark-card p-8 rounded-3xl my-8 border border-gray-100 dark:border-dark-border">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 m-0">
            To democratize design knowledge and make high-quality design accessible to everyone. We want to empower creators to ship products that are not only beautiful but also robust and user-friendly.
            </p>
        </div>

        <p>
            This project was created by George Hatzis as a way to give back to the design community. It started as a personal collection of notes and has grown into a resource used by thousands of designers worldwide.
        </p>
      </div>
    </div>
  </div>
);