"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNestedMessage } from '@/lib/i18n';

interface NavbarProps {
  messages?: any;
}

// Componente de WhatsApp SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

export default function Navbar({ messages }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!isLangOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking inside the dropdown
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };

    // Add listener after a small delay to avoid immediate closure
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 50);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  const switchLanguage = (newLocale: string) => {
    console.log('switchLanguage called:', { newLocale, pathname, currentLocale: locale });
    
    if (!pathname) {
      console.log('No pathname, returning');
      return;
    }
    
    let newPath = '';
    
    // Handle the root path case
    if (pathname === `/${locale}` || pathname === `/`) {
      newPath = `/${newLocale}`;
      console.log('Root path case:', newPath);
      router.push(newPath);
      return;
    }
    
    // Handle paths with existing locale
    if (pathname.startsWith(`/${locale}/`)) {
      newPath = pathname.replace(`/${locale}/`, `/${newLocale}/`);
      console.log('Path with locale case:', newPath);
      router.push(newPath);
      return;
    }
    
    // Handle paths without locale prefix (fallback)
    if (pathname.startsWith('/')) {
      const pathWithoutSlash = pathname.substring(1);
      newPath = `/${newLocale}/${pathWithoutSlash}`;
      console.log('Path without locale case:', newPath);
      router.push(newPath);
    } else {
      newPath = `/${newLocale}`;
      console.log('Default fallback case:', newPath);
      router.push(newPath);
    }
  };

  const navItems = [
    { key: 'home', href: `/${locale}`, label: messages ? getNestedMessage(messages, 'nav.home') : 'Home' },
    { key: 'lodge', href: `/${locale}/lodge`, label: messages ? getNestedMessage(messages, 'nav.lodge') : 'Lodge' },
    { key: 'cabins', href: `/${locale}/cabins`, label: messages ? getNestedMessage(messages, 'nav.cabins') : 'Cabins' },
    { key: 'expeditions', href: `/${locale}/expeditions`, label: messages ? getNestedMessage(messages, 'nav.expeditions') : 'Expeditions' },
    { key: 'gallery', href: `/${locale}/gallery`, label: messages ? getNestedMessage(messages, 'nav.gallery') : 'Gallery' },
    { key: 'reviews', href: `/${locale}/reviews`, label: messages ? getNestedMessage(messages, 'nav.reviews') : 'Reviews' },
    { key: 'contact', href: `/${locale}/contact`, label: messages ? getNestedMessage(messages, 'nav.contact') : 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === `/${locale}`;
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Top Bar con WhatsApp */}
      <div className="bg-deepBlue text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
            <span className="text-gray-200">WhatsApp:</span>
            <a
              href="https://wa.me/593962190756"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
            >
              +593 96 219 0756
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <img 
                src="https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg" 
                alt="TripAdvisor" 
                className="h-4 brightness-0 invert"
              />
              <span className="text-gray-200">5-Star Reviews</span>
            </div>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">Excellence in Amazon Tourism</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-300">Expert Naturalist Guide</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              href={`/${locale}`} 
              className="flex items-center group transition-all duration-300 hover:scale-105"
            >
              <div className="text-deepBlue">
                <div className="font-bold text-2xl tracking-tight leading-none">Río Delfín</div>
                <div className="text-sm text-lightNavy font-medium tracking-wide leading-none">Amazon Lodge & Expeditions</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-3 text-base font-semibold transition-all duration-300 rounded-lg group",
                    isActive(item.href)
                      ? 'text-deepBlue bg-lightOrange/10 border border-lightOrange/20'
                      : 'text-gray-700 hover:text-deepBlue hover:bg-gray-50'
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-lightOrange rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Desktop lang button clicked, current state:', isLangOpen);
                    setIsLangOpen(!isLangOpen);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-lightOrange/30 transition-colors duration-200 cursor-pointer"
                >
                  <Globe className="h-5 w-5 text-deepBlue" />
                  <span className="text-sm font-medium text-deepBlue">
                    {locale === 'es' ? 'Español' : 'English'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-deepBlue transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[100] min-w-[120px]">
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Desktop: Spanish button clicked, current locale:', locale);
                        if (locale !== 'es') {
                          console.log('Switching to Spanish...');
                          switchLanguage('es');
                        }
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        locale === 'es' ? 'text-deepBlue font-medium bg-lightOrange/10' : 'text-gray-700'
                      }`}
                    >
                      Español
                    </button>
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Desktop: English button clicked, current locale:', locale);
                        if (locale !== 'en') {
                          console.log('Switching to English...');
                          switchLanguage('en');
                        }
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        locale === 'en' ? 'text-deepBlue font-medium bg-lightOrange/10' : 'text-gray-700'
                      }`}
                    >
                      English
                    </button>
                  </div>
                )}
              </div>
              
              {/* Book Now Button */}
              <a
                href={`https://wa.me/593962190756?text=${encodeURIComponent(
                  locale === 'es'
                    ? '¡Hola! Me gustaría reservar una experiencia amazónica. ¿Podrían ayudarme con información y disponibilidad?'
                    : 'Hello! I would like to book an Amazon experience. Could you help me with information and availability?'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-deepBlue hover:bg-lightNavy text-white font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 border-0 hover:scale-105">
                  {messages ? getNestedMessage(messages, 'nav.bookNow') : 'Book Now'}
                </Button>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Language Switcher */}
              <div className="relative" ref={langRef}>
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center space-x-1 px-3 py-2 bg-gray-50 rounded border border-gray-200"
                >
                  <Globe className="h-4 w-4 text-deepBlue" />
                  <span className="text-sm font-medium text-deepBlue">
                    {locale === 'es' ? 'ES' : 'EN'}
                  </span>
                  <ChevronDown className={`h-3 w-3 text-deepBlue transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Mobile Language Dropdown */}
                {isLangOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-[100] min-w-[100px]">
                    <button
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        console.log('Mobile: Switching to Spanish');
                        switchLanguage('es'); 
                        setIsLangOpen(false); 
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        locale === 'es' ? 'text-deepBlue font-medium bg-lightOrange/10' : 'text-gray-700'
                      }`}
                      type="button"
                    >
                      Español
                    </button>
                    <button
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
                        console.log('Mobile: Switching to English');
                        switchLanguage('en'); 
                        setIsLangOpen(false); 
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        locale === 'en' ? 'text-deepBlue font-medium bg-lightOrange/10' : 'text-gray-700'
                      }`}
                      type="button"
                    >
                      English
                    </button>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 text-gray-600 hover:text-deepBlue hover:bg-gray-50 transition-all duration-300 rounded-lg"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <div className="px-4 pt-4 pb-6 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={cn(
                      "block px-4 py-4 rounded-lg text-base font-semibold transition-all duration-300",
                      isActive(item.href)
                        ? 'text-deepBlue bg-lightOrange/10 border-l-4 border-lightOrange'
                        : 'text-gray-700 hover:text-deepBlue hover:bg-gray-50'
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Book Button */}
                <div className="pt-4 px-4">
                  <Button 
                    className="w-full bg-deepBlue hover:bg-lightNavy text-white font-semibold py-4 shadow-lg border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {messages ? getNestedMessage(messages, 'nav.bookAdventure') : 'Book Your Adventure'}
                  </Button>
                </div>

                {/* Mobile WhatsApp */}
                <div className="pt-2 px-4">
                  <a
                    href="https://wa.me/593962190756"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-3 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors duration-200"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span className="font-medium">+593 96 219 0756</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}