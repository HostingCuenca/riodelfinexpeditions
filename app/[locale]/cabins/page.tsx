'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Star, MessageCircle, Phone, Bed, Shield, Heart, TreePine, Camera } from 'lucide-react';
import cabinsData from '@/data/cabins.json';

interface CabinsPageProps {
  params: {
    locale: string;
  };
}

export default function CabinsPage({ params }: CabinsPageProps) {
  const [messages, setMessages] = useState<any>(null);
  const [selectedLodge, setSelectedLodge] = useState<string>('all');
  
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

  const filteredCabins = selectedLodge === 'all' 
    ? cabinsData 
    : cabinsData.filter(cabin => cabin.lodge === selectedLodge);

  const handleWhatsApp = (cabinTitle: string) => {
    window.open(`https://wa.me/593990657053?text=Hola! Me interesa reservar ${cabinTitle}. ¿Podrían darme más información y disponibilidad?`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Real Photos */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/colibrilodge/colibricabañas1.jpg"
            alt="Amazon Cabins"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>
        
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4 sm:px-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Badge className="bg-emerald/90 text-white px-4 py-2 text-sm border-0">
                <Star className="h-4 w-4 mr-1" />
                Alojamientos Verificados
              </Badge>
              <Badge className="bg-warmOrange/90 text-white px-4 py-2 text-sm border-0">
                <Shield className="h-4 w-4 mr-1" />
                100% Seguro
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {messages?.lodge?.cabins?.title || 'Nuestras Cabañas Amazónicas'}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              {messages?.lodge?.cabins?.subtitle || 'Diferentes opciones de alojamiento diseñadas para cada tipo de aventurero. Desde cabañas privadas hasta experiencias de camping extremo.'}
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-300 mb-8">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Yasuní, Cuyabeno & Limoncocha - Amazonía Ecuatoriana</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-lightGray border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={selectedLodge === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedLodge('all')}
              className={selectedLodge === 'all' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              Todas las Opciones
            </Button>
            <Button
              variant={selectedLodge === 'colibri' ? 'default' : 'outline'}
              onClick={() => setSelectedLodge('colibri')}
              className={selectedLodge === 'colibri' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              <Heart className="h-4 w-4 mr-2" />
              Colibri Lodge
            </Button>
            <Button
              variant={selectedLodge === 'monkey-frog' ? 'default' : 'outline'}
              onClick={() => setSelectedLodge('monkey-frog')}
              className={selectedLodge === 'monkey-frog' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              <TreePine className="h-4 w-4 mr-2" />
              Monkey Frog Lodge
            </Button>
            <Button
              variant={selectedLodge === 'expedition' ? 'default' : 'outline'}
              onClick={() => setSelectedLodge('expedition')}
              className={selectedLodge === 'expedition' ? 'bg-emerald text-white' : 'border-emerald text-emerald hover:bg-emerald hover:text-white'}
            >
              <Camera className="h-4 w-4 mr-2" />
              Expedición
            </Button>
          </div>
        </div>
      </section>

      {/* Cabins Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {filteredCabins.map((cabin, index) => (
              <div key={cabin.slug} className="group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Images Gallery */}
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative`}>
                    <div className="grid grid-cols-2 gap-3 h-full">
                      {/* Main large image */}
                      <div className="col-span-2 relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                        <Image
                          src={cabin.images[0]}
                          alt={cabin.title[params.locale as keyof typeof cabin.title]}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-emerald/90 text-white border-0 backdrop-blur-sm">
                            <MapPin className="h-3 w-3 mr-1" />
                            {cabin.location}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Smaller images */}
                      {cabin.images.slice(1, 5).map((image, imgIndex) => (
                        <div key={imgIndex} className="relative h-24 lg:h-32 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-500">
                          <Image
                            src={image}
                            alt={`${cabin.title[params.locale as keyof typeof cabin.title]} ${imgIndex + 2}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
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
                            Hasta {cabin.capacity} personas
                          </Badge>
                          {cabin.featured && (
                            <Badge className="bg-warmOrange/10 text-warmOrange border-warmOrange/20">
                              <Star className="h-3 w-3 mr-1" />
                              Destacado
                            </Badge>
                          )}
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-deepBlue mb-4">
                          {cabin.title[params.locale as keyof typeof cabin.title]}
                        </h2>
                        
                        <p className="text-lg text-darkGray leading-relaxed">
                          {cabin.description[params.locale as keyof typeof cabin.description]}
                        </p>
                      </div>

                      {/* Bed Type */}
                      <div className="flex items-center space-x-3 p-4 bg-lightGray rounded-lg">
                        <Bed className="h-5 w-5 text-emerald" />
                        <div>
                          <span className="font-medium text-deepBlue">Configuración: </span>
                          <span className="text-darkGray">{cabin.bedType[params.locale as keyof typeof cabin.bedType]}</span>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div>
                        <h4 className="font-semibold text-deepBlue mb-3">Incluye:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cabin.amenities[params.locale as keyof typeof cabin.amenities].slice(0, 6).map((amenity, amenityIndex) => (
                            <div key={amenityIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-emerald rounded-full"></div>
                              <span className="text-darkGray text-sm">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                          onClick={() => handleWhatsApp(cabin.title[params.locale as keyof typeof cabin.title])}
                          className="bg-emerald hover:bg-amazonGreen text-white font-semibold px-8 py-3 flex-1"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Consultar Disponibilidad
                        </Button>
                        <Button
                          onClick={() => window.open('tel:+593990657053', '_blank')}
                          variant="outline"
                          className="border-2 border-emerald text-emerald hover:bg-emerald hover:text-white font-semibold px-8 py-3"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Llamar Ahora
                        </Button>
                      </div>

                      {/* Price Note */}
                      <div className="bg-emerald/5 border border-emerald/20 rounded-lg p-4">
                        <p className="text-sm text-emerald text-center">
                          💰 <strong>Precios por consulta</strong> - Tarifas especiales para grupos y estancias largas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-gray-200">
              Contáctanos directamente y diseñaremos la experiencia perfecta para ti
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! Me gustaría recibir información personalizada sobre alojamientos en sus lodges amazónicos.', '_blank')}
              className="bg-white hover:bg-gray-100 text-emerald font-semibold px-12 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp: +593 99 065 7053
            </Button>
            <Button 
              size="lg" 
              onClick={() => window.location.href = `/${params.locale}/expeditions`}
              className="bg-white hover:bg-gray-100 text-emerald font-semibold px-12 py-4 text-lg"
            >
              <Heart className="h-5 w-5 mr-2" />
              Ver Todas las Experiencias
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}