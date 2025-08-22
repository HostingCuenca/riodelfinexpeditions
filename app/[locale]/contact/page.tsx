"use client";

import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import settings from '@/data/settings.json';

// Client component for the form
function ContactForm({ messages, locale }: { messages: any, locale: Locale }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    cabin: '',
    expedition: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    alert(locale === 'es' ? 'Gracias por tu consulta. Te contactaremos pronto.' : 'Thank you for your inquiry. We will contact you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-deepBlue mb-2">
            {getNestedMessage(messages, 'contact.form.name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-deepBlue mb-2">
            {getNestedMessage(messages, 'contact.form.email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-deepBlue mb-2">
          {getNestedMessage(messages, 'contact.form.phone')}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="checkIn" className="block text-sm font-medium text-deepBlue mb-2">
            {getNestedMessage(messages, 'contact.form.checkIn')}
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="checkOut" className="block text-sm font-medium text-deepBlue mb-2">
            {getNestedMessage(messages, 'contact.form.checkOut')}
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-deepBlue mb-2">
            {getNestedMessage(messages, 'contact.form.guests')}
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6+">6+</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="cabin" className="block text-sm font-medium text-deepBlue mb-2">
            {getNestedMessage(messages, 'contact.form.cabin')}
          </label>
          <select
            id="cabin"
            name="cabin"
            value={formData.cabin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
          >
            <option value="">Select...</option>
            <option value="cabin-rio">Cabaña Río / River Cabin</option>
            <option value="cabin-delfin">Cabaña Delfín / Dolphin Cabin</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-deepBlue mb-2">
          {getNestedMessage(messages, 'contact.form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          placeholder={locale === 'es' ? 'Cuéntanos sobre tu viaje ideal...' : 'Tell us about your ideal trip...'}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-turquoise focus:border-transparent"
        />
      </div>

      <Button type="submit" variant="lodge" size="lg" className="w-full">
        {getNestedMessage(messages, 'contact.form.submit')}
      </Button>
    </form>
  );
}

// Server component wrapper
interface ContactPageProps {
  params: {
    locale: Locale;
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const messages = await getMessages(params.locale);
  
  const breadcrumbItems = [
    { key: 'home', href: `/${params.locale}` },
    { key: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-bgSoft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs 
          items={breadcrumbItems}
          messages={messages}
          locale={params.locale}
          className="mb-8"
        />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-deepBlue mb-4">
            {getNestedMessage(messages, 'contact.title')}
          </h1>
          <p className="text-xl text-uiGray max-w-2xl mx-auto">
            {getNestedMessage(messages, 'contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactForm messages={messages} locale={params.locale} />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-semibold text-deepBlue mb-6">
                {getNestedMessage(messages, 'footer.contact')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-turquoise mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-deepBlue">Address</h3>
                    <p className="text-uiGray">
                      {getNestedMessage(messages, 'contact.info.address')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-turquoise flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-deepBlue">Phone</h3>
                    <a 
                      href={`tel:${settings.contact.phone}`}
                      className="text-uiGray hover:text-turquoise transition-colors duration-300"
                    >
                      {settings.contact.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-turquoise flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-deepBlue">Email</h3>
                    <a 
                      href={`mailto:${settings.contact.email}`}
                      className="text-uiGray hover:text-turquoise transition-colors duration-300"
                    >
                      {settings.contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <MessageCircle className="h-6 w-6 text-turquoise flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-deepBlue">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${settings.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-uiGray hover:text-turquoise transition-colors duration-300"
                    >
                      {getNestedMessage(messages, 'contact.info.whatsapp')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-semibold text-deepBlue mb-6">
                Location
              </h2>
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-uiGray text-center">
                  Interactive map will be loaded here<br />
                  <span className="text-sm">
                    Coordinates: {settings.coordinates.lat}, {settings.coordinates.lng}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${settings.contact.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}