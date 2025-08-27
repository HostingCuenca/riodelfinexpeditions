'use client';

import Image from 'next/image';
import { Star, ThumbsUp, MapPin, Calendar, Users, Heart, Filter, TrendingUp, ChevronLeft, ChevronRight, MessageCircle, Award } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import reviewsData from '@/data/reviews.json';
import { useState, useEffect } from 'react';

interface ReviewsPageProps {
  params: {
    locale: Locale;
  };
}

export default function ReviewsPage({ params }: ReviewsPageProps) {
  const [messages, setMessages] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Calculate totals first
  const reviews = reviewsData;
  const totalReviews = reviews.length;
  const reviewsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(prev => prev === totalPages - 1 ? 0 : prev + 1);
    }, 8000); // Auto-advance every 8 seconds

    return () => clearInterval(interval);
  }, [totalPages]);
  
  if (!messages) return <div>Loading...</div>;

  const getTravelerTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      family: 'Familia',
      couple: 'Pareja',
      solo: 'Solo',
      friends: 'Amigos'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(params.locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Real Photos */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/1grupodepersonas.jpeg"
            alt="Happy Guests at Río Delfín Lodge"
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
                Reseñas Verificadas
              </Badge>
              <Badge className="bg-warmOrange/90 text-white px-4 py-2 text-sm border-0">
                <Heart className="h-4 w-4 mr-1" />
                5.0 Estrellas TripAdvisor
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {getNestedMessage(messages, 'reviews.hero.title')}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
              {getNestedMessage(messages, 'reviews.hero.description').replace('{count}', totalReviews.toString())}
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-300 mb-8">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Más de {totalReviews} huéspedes satisfechos - Amazonía Ecuatoriana</span>
            </div>
          </div>
        </div>
      </section>

      {/* TripAdvisor Excellence Section */}
      <section className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* TripAdvisor Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-12 w-12 text-warmOrange mr-4" />
              <div>
                <h2 className="text-3xl font-bold text-deepBlue mb-2">
                  N.º 1 de 1 hostal en Coca
                </h2>
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-deepBlue mr-2">4,9</div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-2xl font-bold text-deepBlue mb-1">4,9</div>
              <div className="text-sm text-darkGray mb-2">Ubicación</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-2xl font-bold text-deepBlue mb-1">4,6</div>
              <div className="text-sm text-darkGray mb-2">Habitaciones</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-2xl font-bold text-deepBlue mb-1">5,0</div>
              <div className="text-sm text-darkGray mb-2">Calidad/precio</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-2xl font-bold text-deepBlue mb-1">5,0</div>
              <div className="text-sm text-darkGray mb-2">Limpieza</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-2xl font-bold text-deepBlue mb-1">5,0</div>
              <div className="text-sm text-darkGray mb-2">Servicio</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-2xl font-bold text-deepBlue mb-1">5,0</div>
              <div className="text-sm text-darkGray mb-2">Sueño</div>
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Carousel - 4 Reviews per Page */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-deepBlue">Reseñas de Huéspedes</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage === 0 ? totalPages - 1 : currentPage - 1)}
                  className="p-2 rounded-full bg-emerald/10 hover:bg-emerald/20 text-emerald transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-sm text-darkGray px-3">
                  {currentPage + 1} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1)}
                  className="p-2 rounded-full bg-emerald/10 hover:bg-emerald/20 text-emerald transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentPage * 100}%)` }}
              >
                {Array.from({ length: totalPages }, (_, pageIndex) => (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {reviews
                        .slice(pageIndex * reviewsPerPage, (pageIndex + 1) * reviewsPerPage)
                        .map((review) => (
                          <div key={review.id} className="bg-lightGray rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                            {/* Review Header */}
                            <div className="flex items-start space-x-4 mb-4">
                              <Image
                                src={review.avatar}
                                alt={review.name}
                                width={56}
                                height={56}
                                className="rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-lg font-semibold text-deepBlue">{review.name}</h4>
                                  <Badge className="bg-emerald/10 text-emerald border-emerald/20 text-xs">
                                    {getTravelerTypeLabel(review.travelerType)}
                                  </Badge>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-darkGray mb-2">
                                  <MapPin className="h-3 w-3" />
                                  <span>{review.location}</span>
                                  <span>•</span>
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatDate(review.date)}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Tourist Photos */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              {review.photos?.map((photo, photoIndex) => (
                                <div key={photoIndex} className="relative h-24 rounded-lg overflow-hidden">
                                  <Image
                                    src={photo}
                                    alt={`Foto de ${review.name}`}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Review Content */}
                            <div>
                              <h5 className="font-semibold text-deepBlue mb-2">
                                {review.title[params.locale as keyof typeof review.title] || review.title.en}
                              </h5>
                              <p className="text-darkGray text-sm leading-relaxed mb-3 line-clamp-4">
                                {review.text[params.locale as keyof typeof review.text] || review.text.en}
                              </p>
                              <div className="flex items-center justify-between">
                                <button className="flex items-center space-x-1 text-darkGray hover:text-emerald transition-colors duration-200">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span className="text-xs">Útil ({review.helpful})</span>
                                </button>
                                <div className="text-xs text-gray-500">
                                  #{review.id}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Page Indicators */}
            <div className="flex items-center justify-center space-x-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    currentPage === i ? 'bg-emerald' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center p-8 bg-gradient-to-r from-emerald/10 to-amazonGreen/10 rounded-2xl">
            <Heart className="h-12 w-12 text-emerald mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-deepBlue mb-4">
              ¿Viviste una experiencia increíble?
            </h3>
            <p className="text-darkGray mb-6">
              Comparte tu historia con futuros aventureros amazónicos
            </p>
            <Button 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! Me gustaría compartir mi experiencia y dejar una reseña sobre mi estancia en Río Delfín Lodge.', '_blank')}
              className="bg-emerald hover:bg-amazonGreen text-white px-8 py-3"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Compartir mi Experiencia
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deepBlue to-navyBlue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <TrendingUp className="h-12 w-12 mx-auto mb-6 text-emerald" />
          <h2 className="text-4xl font-bold mb-6">
            {getNestedMessage(messages, 'reviews.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            {getNestedMessage(messages, 'reviews.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! He visto las excelentes reseñas y me interesa reservar una expedición amazónica. ¿Podrían ayudarme?', '_blank')}
              className="bg-warmOrange hover:bg-sunsetOrange text-white font-semibold px-8 py-4"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Reservar Ahora
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.open('mailto:jacobtangoy@gmail.com?subject=Consulta desde Reseñas', '_blank')}
              className="border-emerald text-emerald hover:bg-emerald hover:text-white font-semibold px-8 py-4"
            >
              <Heart className="h-4 w-4 mr-2" />
              Contactar por Email
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}