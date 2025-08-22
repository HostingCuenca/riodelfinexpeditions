import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Clock, Users, Award, Camera, Heart, ChevronRight, Sparkles, Leaf, Mountain } from 'lucide-react';
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

  const expeditionPackages = [
    {
      id: '3-days',
      title: getNestedMessage(messages, 'home.packages.threeDays'),
      price: 340,
      duration: '3 días / 2 noches',
      location: getNestedMessage(messages, 'home.packages.threeDaysLocation'),
      rating: 4.9,
      reviews: 124,
      image: '/1vistahermosa.jpeg',
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
      price: 495,
      duration: '4 días / 3 noches',
      location: getNestedMessage(messages, 'home.packages.fourDaysLocation'),
      rating: 5.0,
      reviews: 89,
      image: '/1rio.jpeg',
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
    { src: '/1grupodepersonas.jpeg', alt: 'Group experience', category: 'Experience' },
    { src: '/1ave.jpeg', alt: 'Amazon birds', category: 'Wildlife' },
    { src: '/1cabaña.jpeg', alt: 'Lodge cabin', category: 'Accommodation' },
    { src: '/1rio2.jpeg', alt: 'Amazon river', category: 'Nature' },
    { src: '/1experienciadesayuno.jpeg', alt: 'Breakfast experience', category: 'Experience' },
    { src: '/1grupodeavesenramas.jpeg', alt: 'Birds in trees', category: 'Wildlife' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel Section */}
      <HeroCarousel messages={messages} locale={params.locale} />

      {/* Enhanced Quick Info Bar */}
      <div className="bg-gradient-to-r from-cream to-lightOrange/10 border-b border-warmOrange/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
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
                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500">
                  <Image
                    src="/1JacobTangoy.jpeg"
                    alt="Jacob Tangoy - Amazon Expert Guide"
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
                <h2 className="text-5xl font-bold text-deepBlue leading-tight">
                  {getNestedMessage(messages, 'home.jacob.title')}
                  <span className="block text-2xl font-normal text-warmOrange mt-3">
                    {getNestedMessage(messages, 'home.jacob.subtitle')}
                  </span>
                </h2>
              </div>
              
              <p className="text-xl text-darkGray leading-relaxed">
                {getNestedMessage(messages, 'home.jacob.description')}
              </p>
              
              <div className="grid grid-cols-2 gap-6">
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
                <Button className="bg-emerald hover:bg-amazonGreen hover:scale-105 text-white px-8 py-3 text-lg shadow-lg transition-all duration-300">
                  {getNestedMessage(messages, 'home.jacob.contact')}
                </Button>
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

      {/* Expedition Packages - TripAdvisor Style */}
      <section className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'home.packages.title')}
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              {getNestedMessage(messages, 'home.packages.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expeditionPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative h-64">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-warmOrange text-white px-3 py-1 rounded-full text-sm font-bold">
                    ${pkg.price} USD
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    <Heart className="inline h-4 w-4 mr-1" />
                    {getNestedMessage(messages, 'home.packages.saveWishlist')}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(pkg.rating) ? 'fill-warmOrange text-warmOrange' : 'text-gray-300'}`} 
                        />
                      ))}
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
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-darkGray">
                          <ChevronRight className="h-3 w-3 text-emerald" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-deepBlue">${pkg.price}</span>
                      <span className="text-sm text-darkGray ml-1">
                        {getNestedMessage(messages, 'common.perPerson')}
                      </span>
                    </div>
                    <Button className="bg-warmOrange hover:bg-sunsetOrange text-white">
                      {getNestedMessage(messages, 'home.packages.viewDetailsBook')}
                    </Button>
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
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'home.gallery.title')}
            </h2>
            <p className="text-xl text-darkGray">
              {getNestedMessage(messages, 'home.gallery.description')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-64">
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
            <Button variant="outline" className="border-warmOrange text-warmOrange hover:bg-warmOrange hover:text-white">
              {getNestedMessage(messages, 'home.gallery.viewGallery')}
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-deepBlue text-center mb-12">
            {getNestedMessage(messages, 'home.whyChoose.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <h2 className="text-4xl font-bold mb-6">
            {getNestedMessage(messages, 'home.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            {getNestedMessage(messages, 'home.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-warmOrange hover:bg-sunsetOrange text-white font-semibold px-8 py-4">
              {getNestedMessage(messages, 'home.cta.whatsapp')}
            </Button>
            <Button size="lg" variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white font-semibold px-8 py-4">
              {getNestedMessage(messages, 'home.cta.email')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}