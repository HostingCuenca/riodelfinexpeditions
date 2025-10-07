'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Phone, Mail, Facebook, Instagram, ExternalLink } from 'lucide-react';
import { getNestedMessage, type Messages } from '@/lib/i18n';
import settings from '@/data/settings.json';

interface FooterProps {
  messages: Messages;
}

export function Footer({ messages }: FooterProps) {
  const params = useParams();
  const locale = params?.locale as string || 'es';

  const quickLinks = [
    { key: 'home', href: `/${locale}` },
    { key: 'lodge', href: `/${locale}/lodge` },
    { key: 'cabins', href: `/${locale}/cabins` },
    { key: 'expeditions', href: `/${locale}/expeditions` },
    { key: 'gallery', href: `/${locale}/gallery` },
    { key: 'reviews', href: `/${locale}/reviews` },
  ];

  return (
    <footer className="bg-deepBlue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/favicon.jpg" 
                alt="Río Delfín Logo" 
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div>
                <div className="font-bold text-2xl">Rio Delfin Expeditions</div>
                <div className="text-sm text-emerald">Amazon Lodge & Expeditions</div>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              {getNestedMessage(messages, 'footer.tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {getNestedMessage(messages, 'footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-emerald transition-colors duration-300"
                  >
                    {getNestedMessage(messages, `nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {getNestedMessage(messages, 'footer.contact')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-emerald mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  {locale === 'es' ? settings.contact.address.es : settings.contact.address.en}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-emerald flex-shrink-0" />
                <span className="text-sm text-gray-300">{settings.contact.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-emerald flex-shrink-0" />
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="text-sm text-gray-300 hover:text-emerald transition-colors duration-300"
                >
                  {settings.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social & Recognition */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {getNestedMessage(messages, 'footer.followUs')}
            </h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href={settings.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={settings.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={settings.social.tripadvisor} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald transition-colors duration-300"
                aria-label="TripAdvisor"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            {/* TripAdvisor Recognition */}
            <div className="space-y-2 mb-6">
              {/* TripAdvisor Logo + Stars Line */}
              <div className="flex items-center space-x-3">
                <img 
                  src="https://static.tacdn.com/img2/brand_refresh_2025/logos/wordmark.svg" 
                  alt="TripAdvisor" 
                  className="h-5 w-auto brightness-0 invert"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                  <span className="text-sm text-gray-300 ml-1">5.0</span>
                </div>
              </div>
              {/* Certificate Line */}
              <div className="text-xs text-emerald font-medium">
                Certificate of Excellence 2024
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">
                {getNestedMessage(messages, 'footer.partners')}
              </h4>
              <div className="space-y-1">
                <a 
                  href={settings.partners.colibri.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-300 hover:text-turquoise transition-colors duration-300"
                >
                  {settings.partners.colibri.name}
                </a>
                <a 
                  href={settings.partners.monkeyFrog.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-gray-300 hover:text-turquoise transition-colors duration-300"
                >
                  {settings.partners.monkeyFrog.name}
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-300">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <Link href={`/${locale}/privacy`} className="hover:text-emerald transition-colors duration-300">
                {getNestedMessage(messages, 'footer.privacy')}
              </Link>
              <Link href={`/${locale}/terms`} className="hover:text-emerald transition-colors duration-300">
                {getNestedMessage(messages, 'footer.terms')}
              </Link>
              <span>© {new Date().getFullYear()} Rio Delfin Expeditions</span>
            </div>
            
            {/* Developer Credit */}
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <span>Sitio web desarrollado por</span>
              <a 
                href="https://torisoftt.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald hover:text-amazonGreen font-medium transition-colors duration-300"
              >
                Torisoftt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}