import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const PrivacyPage = () => (
  <div className="max-w-3xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
    
    <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-700 dark:text-green-400">
            <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Privacy Policy</h1>
    </div>

    <div className="space-y-10 text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
      <p className="text-xl font-medium text-gray-500 dark:text-gray-400 border-l-4 border-purple-200 dark:border-purple-800 pl-6">
        Your privacy is important to us. This policy explains how we handle your information. We value transparency and aim to be as clear as possible.
      </p>

      <section>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h3>
        <p>
          We currently do not collect any personal data from our users. This website is a static resource designed for educational purposes. We do not require account creation, and we do not use cookies for tracking personal usage behavior.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Third-Party Services</h3>
        <p>
          We may use third-party services for hosting and analytics (such as simple page view counters) that collect anonymous aggregate data to help us understand how our site is being used. These services may collect standard server logs including IP addresses and browser types.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Changes to This Policy</h3>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. We encourage you to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please contact us via the email provided in the newsletter section.
        </p>
      </section>
      
      <div className="pt-8 text-sm text-gray-400 dark:text-gray-500">
        Last updated: February 2025
      </div>
    </div>
  </div>
);