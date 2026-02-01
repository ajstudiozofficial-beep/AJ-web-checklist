import React from 'react';
import { ChecklistItemType } from '../types';
import { Check } from 'lucide-react';

interface ChecklistProps {
  items: ChecklistItemType[];
  checkedState: Record<number, boolean>;
  onToggle: (id: number) => void;
  onReset: () => void;
}

export const Checklist: React.FC<ChecklistProps> = ({ items, checkedState, onToggle, onReset }) => {
  const checkedCount = Object.values(checkedState).filter(Boolean).length;
  const totalCount = items.length;

  return (
    <div className="max-w-xl mx-auto px-4 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Checklist</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{checkedCount} out of {totalCount}</h2>
        </div>
        <button 
          onClick={onReset}
          className="px-4 py-2 rounded-lg bg-gray-200/50 dark:bg-dark-hover hover:bg-gray-200 dark:hover:bg-dark-border text-gray-600 dark:text-gray-300 font-medium text-sm transition-colors border border-gray-300/50 dark:border-dark-border"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const isChecked = !!checkedState[item.id];
          return (
            <div 
              key={item.id} 
              className={`bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border-2 transition-all cursor-pointer group ${
                isChecked ? 'border-gray-900 dark:border-white' : 'border-transparent hover:border-gray-200 dark:hover:border-dark-border'
              }`}
              onClick={() => onToggle(item.id)}
            >
              <div className="flex items-start gap-5">
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-colors mt-1 ${
                  isChecked ? 'bg-gray-900 dark:bg-white border-gray-900 dark:border-white' : 'bg-white dark:bg-dark-bg border-gray-300 dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-500'
                }`}>
                  {isChecked && <Check className="w-5 h-5 text-white dark:text-black" strokeWidth={3} />}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isChecked ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[15px]">
                    {item.description}
                  </p>
                  {item.subItems && (
                    <ul className="mt-4 space-y-2">
                      {item.subItems.map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-500 font-medium">
                          <span className="mt-0.5">💡</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};