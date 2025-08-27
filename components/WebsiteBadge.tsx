'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function WebsiteBadge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // 30 segundos

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hi! I was on Rio Delfin Expeditions website and I need a website for my business. Can you help me?"
    );
    window.open(`https://wa.me/593984264910?text=${message}`, '_blank');
  };

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 rounded-r-lg border border-gray-200 border-l-0 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <X className="h-2 w-2 text-white" />
        </button>
        
        {/* Vertical Badge Content */}
        <div 
          onClick={handleClick}
          className="w-6 h-28 cursor-pointer hover:bg-gray-50 transition-colors duration-300 rounded-r-lg flex items-center justify-center"
        >
          <span className="transform -rotate-90 text-xs font-medium text-gray-600 tracking-wide whitespace-nowrap select-none">
            Need a website?
          </span>
        </div>
      </div>
    </div>
  );
}