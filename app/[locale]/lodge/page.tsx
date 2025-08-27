'use client';

import Image from 'next/image';
import { MapPin, Users, Award, Wifi, Bath, Car, Coffee, Shield, Star, Leaf, TreePine, Fish, Camera, Heart, MessageCircle, Phone, Bed, Shower, Utensils, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LodgeHeroCarousel from '@/components/LodgeHeroCarousel';
import { useState, useEffect } from 'react';

interface LodgePageProps {
  params: {
    locale: string;
  };
}

export default function LodgePage({ params }: LodgePageProps) {
  const [messages, setMessages] = useState<any>(null);
  
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

  const colibriFeatures = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: messages?.lodge?.colibri?.features?.family?.title || 'Familia Auténtica',
      description: messages?.lodge?.colibri?.features?.family?.description || 'Operado por una familia local que te hace sentir parte de la Amazonía',
    },
    {
      icon: <TreePine className="h-6 w-6" />,
      title: messages?.lodge?.colibri?.features?.location?.title || 'Privileged Location',
      description: messages?.lodge?.colibri?.features?.location?.description || 'In protected primary forest',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: messages?.lodge?.colibri?.features?.cultural?.title || 'Cultural Experience',
      description: messages?.lodge?.colibri?.features?.cultural?.description || 'Authentic cultural interactions',
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: messages?.lodge?.colibri?.features?.conservation?.title || 'Active Conservation',
      description: messages?.lodge?.colibri?.features?.conservation?.description || 'Real conservation project',
    },
  ];

  const cabinTypes = [
    {
      name: messages?.lodge?.cabins?.colibri?.name || 'Colibri Amazon Lodge Cabins',
      description: messages?.lodge?.cabins?.colibri?.description || 'Private cabins with river views',
      capacity: "2-4 " + (messages?.common?.guests || 'guests'),
      amenities: [
        messages?.lodge?.amenities?.privateBath || 'Private bathrooms',
        messages?.lodge?.amenities?.mosquitoNets || 'Mosquito nets & protection',
        messages?.lodge?.amenities?.riverView || 'River views',
        messages?.lodge?.amenities?.naturalVentilation || 'Natural ventilation'
      ],
      images: [
        '/assets/colibrilodge/colibricabañas1.jpg',
        '/assets/colibrilodge/cabañashermosas.jpg',
        '/assets/detallescabaña/habitacion1.png',
        '/assets/detallescabaña/baño.png',
        '/assets/detallescabaña/gastronomiadesayunos.png'
      ]
    },
    {
      name: messages?.lodge?.cabins?.monkeyFrog?.name || 'Monkey Frog Lodge Cabins',
      description: messages?.lodge?.cabins?.monkeyFrog?.description || 'Community accommodation in traditional style',
      capacity: "2-6 " + (messages?.common?.guests || 'guests'),
      amenities: [
        messages?.lodge?.amenities?.sharedFacilities || 'Shared facilities',
        messages?.lodge?.amenities?.jungleViews || 'Jungle views',
        messages?.lodge?.amenities?.communityInteraction || 'Community interaction',
        messages?.lodge?.amenities?.traditionalStyle || 'Traditional style'
      ],
      images: [
        '/assets/1cabañahamacavertical.jpeg',
        '/assets/detallescabaña/habitacion.png',
        '/assets/detallescabaña/gastronomia3.png',
        '/assets/detallescabaña/desayunos.png',
        '/assets/riodelfin/hamacas.jpg'
      ]
    }
  ];

  const expeditionGallery = [
    { src: '/assets/colibrilodge/en lancha 1 expedicion.jpg', alt: 'Boat Expedition', category: 'Expedition' },
    { src: '/assets/colibrilodge/observacionaves1.jpg', alt: 'Bird Watching', category: 'Wildlife' },
    { src: '/assets/colibrilodge/fishingtrip.jpg', alt: 'Fishing Trip', category: 'Activities' },
    { src: '/assets/riodelfin/delfinesrosadosvertical.jpg', alt: 'Pink Dolphins', category: 'Wildlife' },
    { src: '/assets/colibrilodge/grupoenamazonia.jpg', alt: 'Amazon Group', category: 'Experience' },
    { src: '/assets/riodelfin/atardecer.jpg', alt: 'Amazon Sunset', category: 'Nature' },
    { src: '/assets/colibrilodge/turistas con jacobtangoy.jpg', alt: 'With Jacob Tangoy', category: 'Guide' },
    { src: '/assets/riodelfin/cieloestrelladovertical.jpg', alt: 'Starry Night', category: 'Nature' }
  ];

  const tripAdvisorReviews = [
    {
      id: 1,
      name: "María González",
      location: "Madrid, España",
      date: "Enero 2024",
      rating: 5,
      title: "¡Experiencia Inolvidable en la Amazonía!",
      comment: "Jacob y su familia nos hicieron sentir como en casa. Las cabañas son cómodas y la comida deliciosa. Ver los delfines rosados fue mágico.",
      photos: ['/assets/colibrilodge/grupoenamazonia.jpg', '/assets/detallescabaña/experiencias inolvidables.jpg'],
      verified: true
    },
    {
      id: 2,
      name: "Thomas Anderson",
      location: "California, USA",
      date: "Diciembre 2023",
      rating: 5,
      title: "Best Amazon Experience Ever!",
      comment: "The breakfast was amazing, the rooms were clean and comfortable. Jacob is the best guide we've ever had. Highly recommend!",
      photos: ['/assets/detallescabaña/desayunos.png', '/assets/detallescabaña/habitacion1.png'],
      verified: true
    },
    {
      id: 3,
      name: "Sophie Dubois",
      location: "Lyon, France",
      date: "Noviembre 2023",
      rating: 5,
      title: "Magnifique séjour en Amazonie",
      comment: "Les repas étaient délicieux, nos cabanes très confortables. L'expérience avec Jacob était authentique et éducative.",
      photos: ['/assets/detallescabaña/gastronomia2.png', '/assets/detallescabaña/habitacion.png'],
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel Section */}
      <LodgeHeroCarousel messages={messages} locale={params.locale} />

      {/* Colibri Amazon Lodge Features */}
      <section className="py-20 bg-gradient-to-br from-cream to-lightOrange/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/assets/colibrilodgelogo.jpeg"
                alt="Colibri Lodge Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
            <h2 className="text-5xl font-bold text-deepBlue mb-6">
              {messages?.lodge?.colibri?.title || 'Colibri Amazon Lodge'}
            </h2>
            <p className="text-xl text-darkGray max-w-4xl mx-auto leading-relaxed">
              {messages?.lodge?.colibri?.subtitle || 'Our flagship lodge operated by an authentic Kichwa family'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div className="space-y-8">
              {colibriFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-14 h-14 bg-emerald/10 rounded-full flex items-center justify-center text-emerald group-hover:bg-emerald group-hover:text-white transition-all duration-300 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-deepBlue mb-2">{feature.title}</h3>
                    <p className="text-darkGray leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/colibrilodge/cabañashermosas.jpg"
                      alt="Beautiful Cabins"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/colibrilodge/grupoenamazonia.jpg"
                      alt="Amazon Group"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative h-32 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/colibrilodge/observacionaves2.jpg"
                      alt="Bird Watching"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/assets/colibrilodge/bosquecolibrilodge.jpg"
                      alt="Lodge Forest"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Cabin Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {messages?.lodge?.cabins?.title || 'Our Amazon Cabins'}
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              {messages?.lodge?.cabins?.subtitle || 'Two accommodation options designed for different experiences'}
            </p>
          </div>

          <div className="space-y-16">
            {cabinTypes.map((cabin, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="grid grid-cols-3 gap-3">
                    {cabin.images.slice(0, 6).map((image, imgIndex) => (
                      <div key={imgIndex} className={`relative rounded-xl overflow-hidden shadow-lg group ${imgIndex === 0 ? 'col-span-2 row-span-2 h-48' : 'h-20'}`}>
                        <Image
                          src={image}
                          alt={`${cabin.name} detail ${imgIndex + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <Badge className="bg-emerald/10 text-emerald mb-4">
                    {cabin.capacity}
                  </Badge>
                  <h3 className="text-3xl font-bold text-deepBlue mb-4">{cabin.name}</h3>
                  <p className="text-lg text-darkGray mb-6 leading-relaxed">{cabin.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    {cabin.amenities.map((amenity, amenityIndex) => (
                      <div key={amenityIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-emerald rounded-full"></div>
                        <span className="text-darkGray">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => window.open('https://wa.me/593990657053?text=Hola! Me gustaría consultar disponibilidad para las cabañas. ¿Podrían ayudarme con información y precios?', '_blank')}
                    className="bg-warmOrange hover:bg-sunsetOrange text-white px-8 py-3"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {messages?.lodge?.cabins?.inquire || 'Check Availability'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Gallery */}
      <section className="py-20 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {messages?.lodge?.experiences?.title || 'Experiences from Our Lodges'}
            </h2>
            <p className="text-xl text-darkGray">
              {messages?.lodge?.experiences?.subtitle || 'Each day brings new adventures and discoveries in the heart of the Amazon'}
            </p>
          </div>

          {/* Featured Sunset Photo */}
          <div className="mb-12">
            <div className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src="/assets/riodelfin/atardecer.jpg"
                  alt="Magical Amazon Sunset - 2000x1500 horizontal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Badge className="bg-warmOrange/90 text-white mb-4 px-4 py-2 text-sm">
                      Experiencia Destacada
                    </Badge>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4">Atardeceres Mágicos</h3>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                      Cada día termina con espectaculares puestas de sol sobre el río amazonico. 
                      Momentos perfectos para enamorarse de la naturaleza.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activities Grid with proper dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Boat Expedition - 1536x2048 vertical */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/assets/colibrilodge/en lancha 1 expedicion.jpg"
                  alt="Boat Expedition"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-emerald text-white border-none">Expedición</Badge>
                </div>
              </div>
            </div>

            {/* Bird Watching - 2048x1365 horizontal */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/assets/colibrilodge/observacionaves1.jpg"
                  alt="Bird Watching"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-emerald text-white border-none">Observación Aves</Badge>
                </div>
              </div>
            </div>

            {/* Fishing Trip - 1536x2048 vertical */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/assets/colibrilodge/fishingtrip.jpg"
                  alt="Fishing Trip"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-emerald text-white border-none">Pesca</Badge>
                </div>
              </div>
            </div>

            {/* Amazon Group - 1600x1200 horizontal */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/assets/colibrilodge/grupoenamazonia.jpg"
                  alt="Amazon Group"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-emerald text-white border-none">Grupo</Badge>
                </div>
              </div>
            </div>

            {/* Pink Dolphins - 905x1024 vertical */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/assets/riodelfin/delfinesrosadosvertical.jpg"
                  alt="Pink Dolphins"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-emerald text-white border-none">Delfines</Badge>
                </div>
              </div>
            </div>

            {/* Starry Night - 1066x1600 vertical */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64">
                <Image
                  src="/assets/riodelfin/cieloestrelladovertical.jpg"
                  alt="Starry Night"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge className="bg-emerald text-white border-none">Noche Estrellada</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TripAdvisor Style Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Badge className="bg-emerald/10 text-emerald px-6 py-2 text-lg font-semibold">
                <Award className="h-5 w-5 mr-2" />
                Certificado de Excelencia TripAdvisor
              </Badge>
            </div>
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              Reseñas Verificadas de Nuestros Huéspedes
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              Experiencias reales de viajeros que han vivido la magia de la Amazonía con Río Delfín Expeditions
            </p>
            <div className="flex items-center justify-center mt-6 space-x-4">
              <div className="flex items-center">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-6 w-6 text-warmOrange fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-deepBlue">5.0</span>
              <span className="text-darkGray">basado en 200+ reseñas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tripAdvisorReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                      <span className="text-emerald font-semibold text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-deepBlue">{review.name}</h4>
                      <p className="text-sm text-darkGray">{review.location}</p>
                    </div>
                  </div>
                  {review.verified && (
                    <Badge className="bg-emerald/10 text-emerald border-emerald/20">
                      ✓ Verificado
                    </Badge>
                  )}
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex">
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= review.rating ? 'text-warmOrange fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-darkGray">{review.date}</span>
                </div>

                {/* Review Title */}
                <h5 className="font-semibold text-deepBlue mb-3">{review.title}</h5>

                {/* Review Comment */}
                <p className="text-darkGray mb-4 leading-relaxed">{review.comment}</p>

                {/* Review Photos */}
                {review.photos && review.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {review.photos.map((photo, index) => (
                      <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                        <Image
                          src={photo}
                          alt={`Foto de ${review.name} ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* More Reviews CTA */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! Vi sus excelentes reseñas y me gustaría reservar una experiencia. ¿Podrían ayudarme?', '_blank')}
              variant="outline" 
              className="border-2 border-emerald text-emerald hover:bg-emerald hover:text-white px-8 py-3"
            >
              <Star className="h-4 w-4 mr-2" />
              Ver Más Reseñas en TripAdvisor
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald to-amazonGreen text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-10 w-10" />
            </div>
            <h2 className="text-4xl font-bold mb-6">
              {messages?.lodge?.cta?.title || 'Ready for Your Amazon Adventure?'}
            </h2>
            <p className="text-xl mb-8 text-gray-200 max-w-3xl mx-auto">
              {messages?.lodge?.cta?.description || 'Contact Jacob Tangoy and his team directly'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! Me interesa reservar una experiencia en sus lodges amazónicos. ¿Podrían darme más información?', '_blank')}
              className="bg-white hover:bg-gray-100 text-emerald font-semibold px-12 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp: +593 99 065 7053
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => window.open(`/${params.locale}/gallery`, '_blank')}
              className="border-2 border-white text-white hover:bg-white hover:text-emerald font-semibold px-12 py-4 text-lg bg-white/10 backdrop-blur-sm"
            >
              <Camera className="h-5 w-5 mr-2" />
              {messages?.lodge?.cta?.viewMore || 'View More Photos'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}