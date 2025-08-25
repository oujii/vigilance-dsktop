'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableMenuProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function ExpandableMenu({ 
  title, 
  icon, 
  children, 
  defaultExpanded = false 
}: ExpandableMenuProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-4">
      {/* Menu Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 text-gray-300 hover:bg-gray-700/50 rounded-lg transition-colors group"
      >
        <div className="flex items-center space-x-3">
          <div className="text-gray-400 group-hover:text-gray-300">
            {icon}
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Menu Content */}
      {isExpanded && (
        <div className="mt-2 ml-6 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}