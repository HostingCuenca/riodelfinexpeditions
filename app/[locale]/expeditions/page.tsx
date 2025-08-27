'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star, MessageCircle, Phone, Clock, Calendar, CheckCircle, X, ChevronDown, ChevronUp, Shield, Heart, Camera, Navigation } from 'lucide-react';
import expeditionsData from '@/data/expeditions.json';

interface ExpeditionsPageProps {
  params: {
    locale: string;
  };
}

export default function ExpeditionsPage({ params }: ExpeditionsPageProps) {
  const [messages, setMessages] = useState<any>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [expandedExpedition, setExpandedExpedition] = useState<string | null>(null);
  const [expandedItinerary, setExpandedItinerary] = useState<{[key: string]: number | null}>({});
  
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesModule = await import(`@/messages/${params.locale}.json`);
        setMessages(messagesModule.default);
      } catch (error) {
        const fallbackModule = await import('@/messages/en.json');
        setMessages(fallbackModule.default);
      }
    };
    loadMessages();
  }, [params.locale]);
  
  if (!messages) return <div>Loading...</div>;

  const filteredExpeditions = selectedDuration === 'all' 
    ? expeditionsData 
    : expeditionsData.filter(exp => {
        if (selectedDuration === '3-days') return exp.slug.includes('3-days');
        if (selectedDuration === '4-days') return exp.slug.includes('4-days');
        return true;
      });

  const handleWhatsApp = (expeditionTitle: string, price: number) => {
    window.open(`https://wa.me/593990657053?text=Hola! Me interesa la ${expeditionTitle} por $${price} USD. ¿Podrían darme más información y disponibilidad?`, '_blank');
  };

  const toggleExpeditionDetails = (slug: string) => {
    setExpandedExpedition(expandedExpedition === slug ? null : slug);
  };

  const toggleItineraryDay = (expeditionSlug: string, dayIndex: number) => {
    setExpandedItinerary(prev => ({
      ...prev,
      [expeditionSlug]: prev[expeditionSlug] === dayIndex ? null : dayIndex
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald/10 text-emerald border-emerald/20';
      case 'moderate': return 'bg-warmOrange/10 text-warmOrange border-warmOrange/20';
      case 'challenging': return 'bg-red-100 text-red-600 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: 'Fácil',
      moderate: 'Moderado',
      challenging: 'Desafiante'
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Real Photos */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/colibrilodge/en lancha 1 expedicion.jpg"
            alt="Amazon Expeditions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>
        
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-5xl px-4 sm:px-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Badge className="bg-emerald/90 text-white px-4 py-2 text-sm border-0">
                <Star className="h-4 w-4 mr-1" />
                Expediciones Verificadas
              </Badge>
              <Badge className="bg-warmOrange/90 text-white px-4 py-2 text-sm border-0">
                <Shield className="h-4 w-4 mr-1" />
                Guías Certificados
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Expediciones Amazónicas Auténticas
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              Experiencias de vida silvestre, ecológicas y culturales en el corazón de la Amazonía ecuatoriana. 
              Cada expedición combina biodiversidad, inmersión cultural y aventura auténtica.
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-300 mb-8">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Monkey Frog Lodge, Limoncocha & Parque Nacional Yasuní</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-lightGray border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedDuration === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedDuration('all')}
              className={selectedDuration === 'all' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              Todas las Expediciones
            </Button>
            <Button
              variant={selectedDuration === '3-days' ? 'default' : 'outline'}
              onClick={() => setSelectedDuration('3-days')}
              className={selectedDuration === '3-days' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              <Calendar className="h-4 w-4 mr-2" />
              3 Días / 2 Noches
            </Button>
            <Button
              variant={selectedDuration === '4-days' ? 'default' : 'outline'}
              onClick={() => setSelectedDuration('4-days')}
              className={selectedDuration === '4-days' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              <Navigation className="h-4 w-4 mr-2" />
              4 Días / 3 Noches
            </Button>
          </div>
        </div>
      </section>

      {/* Expeditions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {filteredExpeditions.map((expedition, index) => (
              <div key={expedition.slug} className="group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Images Gallery */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative`}>
                    <div className="grid grid-cols-2 gap-3 h-full">
                      {/* Main large image */}
                      <div className="col-span-2 relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                        <Image
                          src={expedition.images[0]}
                          alt={expedition.title[params.locale as keyof typeof expedition.title]}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-emerald/90 text-white border-0 backdrop-blur-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {expedition.location}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-warmOrange/90 text-white border-0 backdrop-blur-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {expedition.duration[params.locale as keyof typeof expedition.duration]}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Smaller images */}
                      {expedition.images.slice(1, 5).map((image, imgIndex) => (
                        <div key={imgIndex} className="relative h-24 lg:h-32 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                          <Image
                            src={image}
                            alt={`${expedition.title[params.locale as keyof typeof expedition.title]} ${imgIndex + 2}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                      
                      {/* More photos overlay - only show if we have 3+ additional photos */}
                      {expedition.images.length >= 8 && (
                        <div className="relative h-24 lg:h-32 rounded-xl overflow-hidden shadow-lg bg-black/60 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Camera className="h-6 w-6 mx-auto mb-1" />
                            <span className="text-sm font-medium">+{expedition.images.length - 5} fotos</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col justify-center`}>
                    <div className="space-y-6">
                      
                      {/* Header */}
                      <div>
                        <div className="flex items-center space-x-3 mb-4">
                          <Badge className="bg-emerald/10 text-emerald border-emerald/20">
                            <Users className="h-3 w-3 mr-1" />
                            {expedition.groupSize}
                          </Badge>
                          <Badge className={getDifficultyColor(expedition.difficulty)}>
                            <Star className="h-3 w-3 mr-1" />
                            {getDifficultyLabel(expedition.difficulty)}
                          </Badge>
                          {expedition.featured && (
                            <Badge className="bg-warmOrange/10 text-warmOrange border-warmOrange/20">
                              <Heart className="h-3 w-3 mr-1" />
                              Destacado
                            </Badge>
                          )}
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-deepBlue mb-2">
                          {expedition.title[params.locale as keyof typeof expedition.title]}
                        </h2>
                        
                        <p className="text-lg font-medium text-warmOrange mb-4">
                          {expedition.subtitle[params.locale as keyof typeof expedition.subtitle]}
                        </p>
                        
                        <p className="text-lg text-darkGray leading-relaxed">
                          {expedition.description[params.locale as keyof typeof expedition.description]}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="bg-emerald/5 border border-emerald/20 rounded-lg p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-3xl font-bold text-emerald">
                              ${expedition.price.amount} {expedition.price.currency}
                            </span>
                            <p className="text-sm text-darkGray mt-1">
                              {expedition.price.per}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-darkGray">Jacob Tangoy</p>
                            <p className="text-xs text-gray-500">Guía Naturalista Experto</p>
                          </div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          onClick={() => handleWhatsApp(
                            expedition.title[params.locale as keyof typeof expedition.title],
                            expedition.price.amount
                          )}
                          className="bg-emerald hover:bg-amazonGreen text-white font-semibold px-8 py-3 flex-1"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reservar Expedición
                        </Button>
                        <Button
                          onClick={() => toggleExpeditionDetails(expedition.slug)}
                          variant="outline"
                          className="border-2 border-emerald text-emerald hover:bg-emerald hover:text-white font-semibold px-8 py-3"
                        >
                          {expandedExpedition === expedition.slug ? (
                            <>
                              <ChevronUp className="h-4 w-4 mr-2" />
                              Ocultar Itinerario
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4 mr-2" />
                              Ver Itinerario Completo
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Quick Highlights */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-lightGray rounded-lg">
                          <CheckCircle className="h-6 w-6 text-emerald mx-auto mb-2" />
                          <p className="text-sm font-medium text-deepBlue">Todo Incluido</p>
                        </div>
                        <div className="text-center p-3 bg-lightGray rounded-lg">
                          <Phone className="h-6 w-6 text-emerald mx-auto mb-2" />
                          <p className="text-sm font-medium text-deepBlue">Guías Bilingües</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Itinerary Section */}
                {expandedExpedition === expedition.slug && (
                  <div className="mt-12 bg-lightGray rounded-2xl p-8">
                    <div className="max-w-4xl mx-auto">
                      
                      {/* Itinerary Header */}
                      <div className="text-center mb-10">
                        <h3 className="text-2xl font-bold text-deepBlue mb-4">
                          Itinerario Detallado - {expedition.duration[params.locale as keyof typeof expedition.duration]}
                        </h3>
                        <p className="text-darkGray">
                          Cada día está cuidadosamente planificado para maximizar tu experiencia amazónica
                        </p>
                      </div>

                      {/* Itinerary Days */}
                      <div className="space-y-6">
                        {expedition.itinerary[params.locale as keyof typeof expedition.itinerary].map((day: any, dayIndex: number) => (
                          <div key={dayIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            
                            {/* Day Header */}
                            <button
                              onClick={() => toggleItineraryDay(expedition.slug, dayIndex)}
                              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-emerald text-white rounded-full flex items-center justify-center font-bold">
                                  {day.day}
                                </div>
                                <div className="text-left">
                                  <h4 className="text-lg font-semibold text-deepBlue">
                                    Día {day.day}: {day.title}
                                  </h4>
                                </div>
                              </div>
                              {expandedItinerary[expedition.slug] === dayIndex ? (
                                <ChevronUp className="h-5 w-5 text-emerald" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-emerald" />
                              )}
                            </button>

                            {/* Day Content */}
                            {expandedItinerary[expedition.slug] === dayIndex && (
                              <div className="px-6 pb-6 border-t border-gray-100">
                                <p className="text-darkGray leading-relaxed mb-6">
                                  {day.description}
                                </p>
                                
                                {/* Day Highlights */}
                                <div>
                                  <h5 className="font-semibold text-deepBlue mb-3">
                                    Aspectos Destacados:
                                  </h5>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {day.highlights.map((highlight: string, hIndex: number) => (
                                      <div key={hIndex} className="flex items-center space-x-2">
                                        <CheckCircle className="h-4 w-4 text-emerald flex-shrink-0" />
                                        <span className="text-sm text-darkGray">{highlight}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* What's Included/Not Included */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                        
                        {/* Included */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <h4 className="font-semibold text-deepBlue mb-4 flex items-center">
                            <CheckCircle className="h-5 w-5 text-emerald mr-2" />
                            Incluye:
                          </h4>
                          <ul className="space-y-2">
                            {expedition.included[params.locale as keyof typeof expedition.included].map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-emerald mt-0.5 flex-shrink-0" />
                                <span className="text-darkGray">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Not Included */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                          <h4 className="font-semibold text-deepBlue mb-4 flex items-center">
                            <X className="h-5 w-5 text-red-500 mr-2" />
                            No Incluye:
                          </h4>
                          <ul className="space-y-2">
                            {expedition.notIncluded[params.locale as keyof typeof expedition.notIncluded].map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start space-x-2 text-sm">
                                <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-darkGray">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div className="mt-8 bg-emerald/5 rounded-xl p-6 border border-emerald/20">
                        <h4 className="font-semibold text-deepBlue mb-4">Contactos para Reservas:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {expedition.contacts.map((contact: any, idx: number) => (
                            <div key={idx} className="text-center">
                              <p className="font-medium text-deepBlue">{contact.name}</p>
                              {contact.location && (
                                <p className="text-xs text-darkGray mb-2">{contact.location}</p>
                              )}
                              <Button
                                size="sm"
                                onClick={() => window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')}
                                className="bg-emerald hover:bg-amazonGreen text-white text-xs"
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                {contact.whatsapp}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald to-amazonGreen text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Tu Aventura Amazónica?
            </h2>
            <p className="text-xl text-gray-200">
              Contacta directamente con Jacob Tangoy y su equipo para planificar tu expedición perfecta
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! Me interesan sus expediciones amazónicas. ¿Podrían ayudarme con información personalizada?', '_blank')}
              className="bg-white hover:bg-gray-100 text-emerald font-semibold px-12 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp: +593 99 065 7053
            </Button>
            <Button 
              size="lg" 
              onClick={() => window.open('mailto:jacobtangoy@gmail.com', '_blank')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald font-semibold px-12 py-4 text-lg transition-all duration-300"
            >
              <Heart className="h-5 w-5 mr-2" />
              jacobtangoy@gmail.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}