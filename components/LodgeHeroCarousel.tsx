'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Play, Pause, MessageCircle, Phone, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface LodgeHeroCarouselProps {
  messages?: any;
  locale?: string;
}

const heroImages = [
  {
    src: '/assets/colibrilodge/colibricabañas1.jpg',
    alt: 'Colibri Lodge Cabins',
    title: 'Colibri Amazon Lodge',
    subtitle: 'Authentic Kichwa Family Experience'
  },
  {
    src: '/assets/riodelfin/atardecer.jpg',
    alt: 'Amazon Sunset',
    title: 'Breathtaking Sunsets',
    subtitle: 'Magical Amazon Evenings'
  },
  {
    src: '/assets/colibrilodge/bosquecolibrilodge.jpg',
    alt: 'Lodge Forest',
    title: 'Primary Forest Location',
    subtitle: 'Deep in the Amazon Rainforest'
  },
  {
    src: '/assets/colibrilodge/observacionaves1.jpg',
    alt: 'Bird Watching',
    title: 'Wildlife Encounters',
    subtitle: 'Expert Guided Expeditions'
  },
  {
    src: '/assets/colibrilodge/grupoenamazonia.jpg',
    alt: 'Amazon Group Experience',
    title: 'Unforgettable Memories',
    subtitle: 'Share Amazing Adventures'
  }
];

export default function LodgeHeroCarousel({ messages, locale }: LodgeHeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  // Auto-play functionality - slower transition for lodge page
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 12000); // Slower transition - 12 seconds instead of 8

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isPlaying]);

  const handleWhatsApp = () => {
    window.open('https://wa.me/593990657053?text=Hola! Me interesa conocer más sobre los lodges amazónicos. ¿Podrían darme más información?', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+593990657053', '_blank');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden pb-24 sm:pb-0">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-2000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover scale-100"
              priority={index === 0}
              sizes="100vw"
            />
            {/* Background overlays with reduced opacity */}
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-br from-deepBlue/10 via-transparent to-emerald/5" />
          </div>
        ))}
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-5xl px-4 sm:px-6">
          
          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <Badge className="bg-emerald/90 text-white px-4 py-2 text-sm border-0">
              <Star className="h-4 w-4 mr-1" />
              5.0 Google Maps
            </Badge>
            <Badge className="bg-warmOrange/90 text-white px-4 py-2 text-sm border-0">
              <Award className="h-4 w-4 mr-1" />
              TripAdvisor Certificado
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl sm:text-2xl font-light text-gray-200 tracking-wider uppercase">
              {messages?.lodge?.hero?.description || 'Discover two unique experiences in the heart of the Ecuadorian Amazon'}
            </h2>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white">
              {messages?.lodge?.hero?.title || 'Our Amazon Lodges'}
            </h1>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center space-x-2 text-gray-300 mb-8">
            <MapPin className="h-5 w-5" />
            <span className="text-lg">{messages?.lodge?.hero?.location || 'Yasuní, Cuyabeno & Limoncocha - Ecuadorian Amazon'}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-32 sm:mb-16">
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              className="bg-emerald hover:bg-amazonGreen text-white font-semibold px-8 py-4 text-lg transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {messages?.lodge?.hero?.whatsapp || 'Contact via WhatsApp'}
            </Button>
            <Button 
              size="lg"
              onClick={handleCall} 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-deepBlue font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-lg hover:scale-105 bg-black/10 backdrop-blur-sm"
            >
              <Phone className="h-5 w-5 mr-2" />
              {messages?.lodge?.hero?.contact || 'Call Now'}
            </Button>
          </div>
        </div>
      </div>


      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center z-30">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:scale-110 transition-all duration-300 border border-white/30"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center z-30">
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 text-white hover:bg-black/50 hover:scale-110 transition-all duration-300 border border-white/30"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-4 sm:top-8 right-4 sm:right-8 z-30">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="ghost"
          size="icon"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-300 border border-white/30"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-3 w-3 sm:h-4 sm:w-4" />
          ) : (
            <Play className="h-3 w-3 sm:h-4 sm:w-4" />
          )}
        </Button>
      </div>

    </div>
  );
}