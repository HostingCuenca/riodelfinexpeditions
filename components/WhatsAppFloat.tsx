'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    // Show button after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phone = '593990657053';
    const message = encodeURIComponent(
      '¡Hola! Me interesa conocer más sobre las expediciones amazónicas de Río Delfín Lodge. ¿Podrían ayudarme con información y disponibilidad?'
    );
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Preview Card */}
      {showPreview && (
        <div className="fixed bottom-24 right-6 z-40 hidden sm:block">
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-200 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-deepBlue text-sm">Río Delfín Lodge</h4>
                  <p className="text-xs text-darkGray">¡Estamos aquí para ayudarte!</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="bg-emerald/5 rounded-lg p-3 mb-3">
              <p className="text-sm text-darkGray">
                💬 Chatea con nosotros para información sobre expediciones, disponibilidad y precios especiales.
              </p>
            </div>
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-emerald hover:bg-amazonGreen text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              Iniciar Conversación
            </button>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulse Animation Rings */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-emerald rounded-full animate-ping opacity-20"></div>
          <div className="absolute inset-0 bg-emerald rounded-full animate-ping opacity-10 animation-delay-150"></div>
        </div>
        
        {/* Main Button */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-emerald hover:bg-amazonGreen text-white rounded-full shadow-2xl hover:shadow-emerald/25 transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform duration-200" />
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-warmOrange text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
            !
          </div>
        </button>

        {/* Mobile Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap sm:hidden">
          WhatsApp: +593 99 065 7053
        </div>
      </div>

      {/* Custom CSS for animation delay */}
      <style jsx>{`
        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </>
  );
}