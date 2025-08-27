import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Clock, Users, Award, Camera, Heart, ChevronRight, Sparkles, Leaf, Mountain, MessageCircle, Bed, Wifi, Bath, Moon, Zap } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HeroCarousel from '@/components/HeroCarousel';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const messages = await getMessages(params.locale);

  const featuredCabins = [
    {
      slug: 'colibri-lodge-cabins',
      title: params.locale === 'es' ? 'Cabañas Colibri Amazon Lodge' : 'Colibri Amazon Lodge Cabins',
      description: params.locale === 'es' 
        ? 'Cabañas privadas con vistas al río, construidas con materiales locales.'
        : 'Private cabins with river views, built with local materials.',
      image: '/assets/colibrilodge/colibricabañas1.jpg',
      capacity: 4,
      bedType: params.locale === 'es' ? 'Cama matrimonial + literas' : 'Double bed + bunk beds',
      amenities: params.locale === 'es' 
        ? ['Vista al río Napo', 'Baño privado completo', 'Terraza con hamacas', 'Desayunos incluidos']
        : ['Napo River view', 'Full private bathroom', 'Terrace with hammocks', 'Breakfast included']
    },
    {
      slug: 'monkey-frog-lodge-cabins',
      title: params.locale === 'es' ? 'Cabañas Monkey Frog Lodge' : 'Monkey Frog Lodge Cabins',
      description: params.locale === 'es'
        ? 'Alojamiento comunitario en estilo tradicional amazónico.'
        : 'Community accommodation in traditional Amazonian style.',
      image: '/assets/1cabañahamacavertical.jpeg',
      capacity: 8,
      bedType: params.locale === 'es' ? 'Habitaciones compartidas + hamacas' : 'Shared rooms + hammocks',
      amenities: params.locale === 'es'
        ? ['Vistas a la selva', 'Interacción comunitaria', 'Comidas caseras', 'Guías locales']
        : ['Jungle views', 'Community interaction', 'Home-cooked meals', 'Local guides']
    }
  ];

  const expeditionPackages = [
    {
      id: '3-days',
      title: getNestedMessage(messages, 'home.packages.threeDays'),
      duration: '3 días / 2 noches',
      location: getNestedMessage(messages, 'home.packages.threeDaysLocation'),
      rating: 4.9,
      reviews: 124,
      image: '/assets/colibrilodge/colibricabañas1.jpg',
      highlights: [
        getNestedMessage(messages, 'home.packages.threeDaysHighlights.birdTower'),
        getNestedMessage(messages, 'home.packages.threeDaysHighlights.fishing'),
        getNestedMessage(messages, 'home.packages.threeDaysHighlights.fireflies'),
        getNestedMessage(messages, 'home.packages.threeDaysHighlights.cultural')
      ],
      difficulty: getNestedMessage(messages, 'home.packages.difficulty.easy'),
      groupSize: getNestedMessage(messages, 'home.packages.groupSize')
    },
    {
      id: '4-days',
      title: getNestedMessage(messages, 'home.packages.fourDays'),
      duration: '4 días / 3 noches',
      location: getNestedMessage(messages, 'home.packages.fourDaysLocation'),
      rating: 5.0,
      reviews: 89,
      image: '/assets/colibrilodge/en lancha 1 expedicion.jpg',
      highlights: [
        getNestedMessage(messages, 'home.packages.fourDaysHighlights.yasuni'),
        getNestedMessage(messages, 'home.packages.fourDaysHighlights.parrots'),
        getNestedMessage(messages, 'home.packages.fourDaysHighlights.napo'),
        getNestedMessage(messages, 'home.packages.fourDaysHighlights.refuge')
      ],
      difficulty: getNestedMessage(messages, 'home.packages.difficulty.moderate'),
      groupSize: getNestedMessage(messages, 'home.packages.groupSize')
    }
  ];

  const galleryImages = [
    { src: '/assets/colibrilodge/grupoenamazonia.jpg', alt: 'Amazon group experience', category: 'Experience' },
    { src: '/assets/colibrilodge/observacionaves1.jpg', alt: 'Bird watching', category: 'Wildlife' },
    { src: '/assets/colibrilodge/cabañashermosas.jpg', alt: 'Beautiful lodge cabins', category: 'Accommodation' },
    { src: '/assets/riodelfin/atardecer.jpg', alt: 'Amazon sunset', category: 'Nature' },
    { src: '/assets/1experienciadesayuno.jpeg', alt: 'Breakfast experience', category: 'Experience' },
    { src: '/assets/riodelfin/delfinesrosadosvertical.jpg', alt: 'Pink dolphins', category: 'Wildlife' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel Section */}
      <HeroCarousel messages={messages} locale={params.locale} />

      {/* Enhanced Quick Info Bar */}
      <div className="bg-gradient-to-r from-cream to-lightOrange/10 border-b border-warmOrange/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 items-center">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-warmOrange/10 rounded-full flex items-center justify-center group-hover:bg-warmOrange/20 transition-colors duration-300">
                <MapPin className="h-5 w-5 text-warmOrange" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Location</div>
                <div className="text-sm font-medium text-darkGray">{getNestedMessage(messages, 'home.quickInfo.location')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-emerald/10 rounded-full flex items-center justify-center group-hover:bg-emerald/20 transition-colors duration-300">
                <Users className="h-5 w-5 text-emerald" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Group Size</div>
                <div className="text-sm font-medium text-darkGray">{getNestedMessage(messages, 'home.quickInfo.groupSize')}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-lightNavy/10 rounded-full flex items-center justify-center group-hover:bg-lightNavy/20 transition-colors duration-300">
                <Award className="h-5 w-5 text-lightNavy" />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Expert Guide</div>
                <div className="text-sm font-medium text-darkGray">{getNestedMessage(messages, 'home.quickInfo.guide')}</div>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Starting From</div>
              <div className="text-2xl font-bold text-deepBlue">{getNestedMessage(messages, 'home.quickInfo.fromPrice')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Your Guide - Jacob Tangoy */}
      <section className="py-20 bg-gradient-to-br from-white via-cream/20 to-lightOrange/5 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amazonGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-warmOrange/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-warmOrange/20 to-emerald/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/assets/colibrilodge/turistas con jacobtangoy.jpg"
                    alt="Jacob Tangoy with tourists - Amazon Expert Guide"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-warmOrange" />
                    <div>
                      <div className="text-xs text-gray-500">Certified Guide</div>
                      <div className="text-sm font-bold text-deepBlue">15+ Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-emerald" />
                  </div>
                  <Badge className="bg-emerald/10 text-emerald border-emerald/20">Expert Naturalist</Badge>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-deepBlue leading-tight">
                  {getNestedMessage(messages, 'home.jacob.title')}
                  <span className="block text-lg sm:text-xl md:text-2xl font-normal text-warmOrange mt-3">
                    {getNestedMessage(messages, 'home.jacob.subtitle')}
                  </span>
                </h2>
              </div>
              
              <p className="text-xl text-darkGray leading-relaxed">
                {getNestedMessage(messages, 'home.jacob.description')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="group bg-gradient-to-br from-deepBlue/5 to-lightNavy/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-deepBlue/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mountain className="h-6 w-6 text-deepBlue" />
                    <div className="text-3xl font-bold text-deepBlue group-hover:scale-110 transition-transform duration-300">500+</div>
                  </div>
                  <div className="text-sm text-darkGray font-medium">
                    {getNestedMessage(messages, 'home.jacob.expeditionsLed')}
                  </div>
                </div>
                <div className="group bg-gradient-to-br from-emerald/5 to-amazonGreen/10 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-emerald/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <Star className="h-6 w-6 text-emerald" />
                    <div className="text-3xl font-bold text-emerald group-hover:scale-110 transition-transform duration-300">98%</div>
                  </div>
                  <div className="text-sm text-darkGray font-medium">
                    {getNestedMessage(messages, 'home.jacob.satisfactionRate')}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
                <a
                  href={`https://wa.me/593990657053?text=${encodeURIComponent(
                    params.locale === 'es' 
                      ? '¡Hola Jacob! Me interesa conocer más sobre tus expediciones amazónicas. ¿Podrías ayudarme con información?'
                      : 'Hello Jacob! I\'m interested in learning more about your Amazon expeditions. Could you help me with information?'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-emerald hover:bg-amazonGreen hover:scale-105 text-white min-h-[48px] px-6 py-3 sm:px-8 text-base sm:text-lg shadow-lg transition-all duration-300">
                    {getNestedMessage(messages, 'home.jacob.contact')}
                  </Button>
                </a>
                <div className="flex items-center space-x-2 text-darkGray">
                  <div className="w-2 h-2 bg-emerald rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
                    {getNestedMessage(messages, 'home.jacob.whatsapp')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fireflies Tour Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-deepBlue to-black relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-300/10 rounded-full blur-2xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Image Side */}
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-emerald/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/toursluciernagas.jpeg"
                    alt="Fireflies Tour - Amazon Night Experience"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 bg-yellow-400 rounded-full p-4 animate-bounce shadow-xl">
                  <Zap className="h-6 w-6 text-black" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-emerald rounded-full p-3 animate-float shadow-xl">
                  <Moon className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="order-1 lg:order-2 text-white space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-yellow-400" />
                  </div>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                    {getNestedMessage(messages, 'home.fireflies.subtitle')}
                  </Badge>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                  {getNestedMessage(messages, 'home.fireflies.title')}
                </h2>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {getNestedMessage(messages, 'home.fireflies.description')}
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Clock className="h-6 w-6 text-yellow-400 mb-2" />
                  <div className="text-sm text-gray-400 mb-1">Duración</div>
                  <div className="text-white font-semibold">
                    {getNestedMessage(messages, 'home.fireflies.features.timing')}
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Leaf className="h-6 w-6 text-emerald mb-2" />
                  <div className="text-sm text-gray-400 mb-1">{params.locale === 'es' ? 'Tipo' : 'Type'}</div>
                  <div className="text-white font-semibold">
                    {getNestedMessage(messages, 'home.fireflies.features.season')}
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Award className="h-6 w-6 text-orange-400 mb-2" />
                  <div className="text-sm text-gray-400 mb-1">Guía</div>
                  <div className="text-white font-semibold">
                    {getNestedMessage(messages, 'home.fireflies.features.experience')}
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Star className="h-6 w-6 text-yellow-400 mb-2" />
                  <div className="text-sm text-gray-400 mb-1">Experiencia</div>
                  <div className="text-white font-semibold">
                    {getNestedMessage(messages, 'home.fireflies.features.magic')}
                  </div>
                </div>
              </div>
              
              {/* Highlights */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  {getNestedMessage(messages, 'home.packages.highlights')}
                </h4>
                <div className="space-y-3">
                  {(() => {
                    const highlights = getNestedMessage(messages, 'home.fireflies.highlights');
                    const fallbackHighlights = [
                      params.locale === 'es' ? 'Observación de luciérnagas en su hábitat natural' : 'Firefly observation in their natural habitat',
                      params.locale === 'es' ? 'Navegación nocturna por ríos y lagunas' : 'Night navigation through rivers and lagoons',
                      params.locale === 'es' ? 'Sonidos nocturnos de la selva amazónica' : 'Nocturnal sounds of the Amazon rainforest',
                      params.locale === 'es' ? 'Fotografía nocturna con asistencia del guía' : 'Night photography with guide assistance'
                    ];
                    
                    const highlightsArray = Array.isArray(highlights) ? highlights : fallbackHighlights;
                    
                    return highlightsArray.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <ChevronRight className="h-4 w-4 text-yellow-400 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{highlight}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="pt-6">
                <a
                  href={`https://wa.me/593990657053?text=${encodeURIComponent(
                    params.locale === 'es' 
                      ? '¡Hola! Me interesa el tour nocturno de luciérnagas. ¿Podrían darme más información sobre disponibilidad y precios?'
                      : 'Hello! I\'m interested in the fireflies night tour. Could you give me more information about availability and prices?'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-black font-bold px-8 py-4 text-lg shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 hover:scale-105">
                    <Zap className="h-5 w-5 mr-2" />
                    {getNestedMessage(messages, 'home.fireflies.cta')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Cabins Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'home.cabins.title')}
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              {getNestedMessage(messages, 'home.cabins.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCabins.map((cabin) => (
              <div key={cabin.slug} className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <div className="relative h-64 sm:h-72 md:h-80">
                  <Image
                    src={cabin.image}
                    alt={cabin.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-emerald/90 text-white border-none">
                      {cabin.capacity} {getNestedMessage(messages, 'home.cabins.capacity')}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1">{cabin.title}</h3>
                    <div className="flex items-center space-x-1 text-sm text-white/90">
                      <Bed className="h-4 w-4" />
                      <span>{cabin.bedType}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-darkGray mb-4 leading-relaxed">
                    {cabin.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-deepBlue mb-3 text-sm uppercase tracking-wider">
                      {getNestedMessage(messages, 'home.cabins.features')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cabin.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-darkGray">
                          <ChevronRight className="h-3 w-3 text-emerald flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Link href={`/${params.locale}/cabins/${cabin.slug}`}>
                    <Button className="w-full bg-deepBlue hover:bg-lightNavy text-white transition-all duration-300 group-hover:shadow-lg">
                      {getNestedMessage(messages, 'common.viewDetails')}
                      <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href={`/${params.locale}/cabins`}>
              <Button variant="outline" className="border-deepBlue text-deepBlue hover:bg-deepBlue hover:text-white px-8 py-3">
                {getNestedMessage(messages, 'home.cabins.viewCabins')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Expedition Packages - TripAdvisor Style */}
      <section className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'home.packages.title')}
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              {getNestedMessage(messages, 'home.packages.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {expeditionPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-emerald text-white px-3 py-1 rounded-full text-sm font-bold">
                    Disponible
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    <Heart className="inline h-4 w-4 mr-1" />
                    {getNestedMessage(messages, 'home.packages.saveWishlist')}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => {
                        const filled = i < Math.floor(pkg.rating);
                        const halfFilled = i === Math.floor(pkg.rating) && pkg.rating % 1 >= 0.5;
                        return (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              filled || halfFilled 
                                ? 'fill-warmOrange text-warmOrange' 
                                : 'text-gray-300'
                            }`} 
                          />
                        );
                      })}
                      <span className="text-sm font-medium text-darkGray ml-2">
                        {pkg.rating} ({pkg.reviews} {getNestedMessage(messages, 'common.reviews')})
                      </span>
                    </div>
                    <Badge variant="outline" className="text-emerald border-emerald">
                      {pkg.difficulty}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-deepBlue mb-2">{pkg.title}</h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-darkGray mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{pkg.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{pkg.groupSize}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-deepBlue mb-2">
                      {getNestedMessage(messages, 'home.packages.highlights')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-darkGray">
                          <ChevronRight className="h-3 w-3 text-emerald" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg text-deepBlue font-semibold">
                      {getNestedMessage(messages, 'home.packages.priceOnRequest')}
                    </div>
                    <a
                      href={`https://wa.me/593990657053?text=${encodeURIComponent(
                        params.locale === 'es' 
                          ? `¡Hola! Me interesa el paquete "${pkg.title}". ¿Podrían darme más información sobre precios y disponibilidad?`
                          : `Hello! I'm interested in the "${pkg.title}" package. Could you give me more information about prices and availability?`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-emerald hover:bg-amazonGreen text-white min-h-[44px] text-sm sm:text-base">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        {getNestedMessage(messages, 'home.packages.whatsappQuote')}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'home.gallery.title')}
            </h2>
            <p className="text-xl text-darkGray">
              {getNestedMessage(messages, 'home.gallery.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-warmOrange text-white border-none">
                      {image.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href={`/${params.locale}/gallery`}>
              <Button variant="outline" className="border-warmOrange text-warmOrange hover:bg-warmOrange hover:text-white">
                {getNestedMessage(messages, 'home.gallery.viewGallery')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-deepBlue text-center mb-12">
            {getNestedMessage(messages, 'home.whyChoose.title')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'home.whyChoose.expertGuide.title')}
              </h3>
              <p className="text-darkGray leading-relaxed">
                {getNestedMessage(messages, 'home.whyChoose.expertGuide.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'home.whyChoose.smallGroup.title')}
              </h3>
              <p className="text-darkGray leading-relaxed">
                {getNestedMessage(messages, 'home.whyChoose.smallGroup.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'home.whyChoose.exceptionalReviews.title')}
              </h3>
              <p className="text-darkGray leading-relaxed">
                {getNestedMessage(messages, 'home.whyChoose.exceptionalReviews.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deepBlue to-navyBlue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            {getNestedMessage(messages, 'home.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            {getNestedMessage(messages, 'home.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <a
              href={`https://wa.me/593990657053?text=${encodeURIComponent(
                params.locale === 'es' 
                  ? '¡Hola! Me interesa una aventura amazónica con Río Delfín Lodge. ¿Pueden darme más información?'
                  : 'Hello! I\'m interested in an Amazon adventure with Río Delfín Lodge. Can you give me more information?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-warmOrange hover:bg-sunsetOrange text-white font-semibold min-h-[52px] px-6 py-3 sm:px-8 sm:py-4">
                {getNestedMessage(messages, 'home.cta.whatsapp')}
              </Button>
            </a>
            <Link href={`/${params.locale}/contact`}>
              <Button size="lg" variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white font-semibold min-h-[52px] px-6 py-3 sm:px-8 sm:py-4">
                {getNestedMessage(messages, 'home.cta.email')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}