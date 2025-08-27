'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
  locale?: 'es' | 'en';
}

// WhatsApp SVG Icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

export default function FloatingWhatsApp({ 
  phoneNumber = '593990657053',
  message = 'Hello! I\'m interested in learning more about your Amazon lodge experiences.',
  className,
  locale = 'es'
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const texts = {
    es: {
      reserveNow: 'Reservar Ahora',
      startConversation: 'Iniciar Conversación',
      chatWith: 'Chatea con nosotros por WhatsApp',
      greeting: '¡Hola! 👋 Bienvenido a Río Delfín Lodge. ¿Cómo podemos ayudarte a planear tu aventura amazónica?',
      online: 'En línea • Respuesta rápida'
    },
    en: {
      reserveNow: 'Reserve Now',
      startConversation: 'Start Conversation', 
      chatWith: 'Chat with us on WhatsApp',
      greeting: 'Hello! 👋 Welcome to Río Delfín Lodge. How can we help you plan your Amazon adventure?',
      online: 'Online • Reply quickly'
    }
  };

  // Show button after page load with animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Create WhatsApp URL with encoded message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main floating button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          className
        )}
      >
        {/* Expanded chat preview */}
        {isExpanded && (
          <div className="absolute bottom-full right-0 mb-4 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 transform transition-all duration-300 ease-out animate-fade-in">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <WhatsAppIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">Río Delfín Lodge</h4>
                  <p className="text-xs text-gray-500">{texts[locale].online}</p>
                </div>
              </div>
              <button
                onClick={toggleExpanded}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <p className="text-sm text-gray-700">
                {texts[locale].greeting}
              </p>
            </div>
            
            <button
              onClick={handleClick}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{texts[locale].startConversation}</span>
            </button>
          </div>
        )}

        {/* Main button */}
        <div className="relative flex items-center space-x-3">
          {/* Reserve Now text */}
          <div className="hidden sm:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-xl whitespace-nowrap font-bold text-sm animate-pulse">
              {texts[locale].reserveNow}
            </div>
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-green-500 mt-1"></div>
          </div>
          
          <div className="relative group">
            {/* Pulse animation rings */}
            <div className="absolute inset-0 w-16 h-16 sm:w-18 sm:h-18 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-16 h-16 sm:w-18 sm:h-18 bg-green-500 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute inset-0 w-16 h-16 sm:w-18 sm:h-18 bg-green-400 rounded-full animate-ping opacity-10 animation-delay-500"></div>
            
            {/* Main button */}
            <button
              onClick={handleClick}
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              className="relative w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white rounded-full shadow-2xl transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 flex items-center justify-center group border-4 border-white"
              aria-label={texts[locale].chatWith}
            >
              <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9 group-hover:scale-110 transition-transform duration-200 drop-shadow-sm" />
              
              {/* Mobile tooltip */}
              <div className="absolute right-full mr-4 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none sm:hidden">
                {texts[locale].reserveNow}
                <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
              </div>
            </button>
            
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center animate-bounce shadow-lg border-2 border-white">
              <span className="text-xs text-white font-bold">!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile tap target overlay when expanded */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-40 sm:hidden" 
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}