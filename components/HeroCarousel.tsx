'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNestedMessage } from '@/lib/i18n';

interface HeroCarouselProps {
  messages?: any;
  locale?: string;
}

const heroImages = [
  {
    src: '/heroimage.png',
    alt: 'Río Delfín Lodge Main View',
    title: 'Welcome to Paradise',
    subtitle: 'Your Amazon Adventure Begins Here'
  },
  {
    src: '/1vistahermosa.jpeg',
    alt: 'Beautiful Amazon Vista',
    title: 'Breathtaking Views',
    subtitle: 'Panoramic Amazon Rainforest'
  },
  {
    src: '/1rio.jpeg',
    alt: 'Amazon River Experience',
    title: 'River Expeditions',
    subtitle: 'Navigate the Amazon Waters'
  },
  {
    src: '/1ave.jpeg',
    alt: 'Amazon Wildlife Birds',
    title: 'Wildlife Encounters',
    subtitle: 'Discover Exotic Birds'
  },
  {
    src: '/1grupodepersonas.jpeg',
    alt: 'Group Adventure Experience',
    title: 'Unforgettable Memories',
    subtitle: 'Share Amazing Experiences'
  }
];

export default function HeroCarousel({ messages, locale }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);


  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

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

  return (
    <div className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={cn(
                "object-cover",
                index === currentSlide 
                  ? "animate-subtle-zoom-in" 
                  : index === (currentSlide + 1) % heroImages.length
                  ? "animate-subtle-zoom-out"
                  : "scale-100"
              )}
              priority={index === 0}
              sizes="100vw"
            />
            {/* Luxury overlays with reduced opacity */}
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-br from-deepBlue/10 via-transparent to-lightOrange/5" />
          </div>
        ))}
      </div>

      {/* Main Content - Centered like reference */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-6 pb-24 sm:pb-8">
          
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-lightOrange text-lightOrange" />
                ))}
                <span className="text-sm font-medium ml-2 text-white">
                  {messages ? getNestedMessage(messages, 'hero.rating') : '4.9 Excellence'}
                </span>
              </div>
            </div>
          </div>

          {/* Main Heading - More traditional like reference */}
          <div className="space-y-6 mb-8">
            <h2 className="text-2xl font-light text-gray-200 tracking-wider uppercase">
              {messages ? getNestedMessage(messages, 'hero.subtitle') : 'Premium Amazon Experience'}
            </h2>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
              {messages ? getNestedMessage(messages, 'hero.title.part1') : 'Welcome To Your'}
              <br />
              <span className="text-lightOrange">
                {messages ? getNestedMessage(messages, 'hero.title.part2') : 'Nature Retreat'}
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="space-y-6 mb-12">
            <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              {messages ? getNestedMessage(messages, 'hero.description') : 'Experience the pristine Ecuadorian Amazon with expert naturalist guidance. Comfortable accommodations and world-class wildlife encounters await.'}
            </p>
            <div className="w-24 h-0.5 bg-lightOrange mx-auto"></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-32 sm:mb-16 px-4">
            <a
              href={`https://wa.me/593990657053?text=${encodeURIComponent(
                locale === 'es' 
                  ? '¡Hola! Me gustaría reservar una expedición amazónica con Río Delfín Lodge. ¿Podrían ayudarme con información sobre disponibilidad y precios?'
                  : 'Hello! I would like to book an Amazon expedition with Río Delfín Lodge. Could you help me with information about availability and prices?'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-amazonGreen hover:bg-emerald text-white font-semibold min-h-[48px] px-6 py-3 sm:px-8 sm:py-4 text-base transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {messages ? getNestedMessage(messages, 'hero.buttons.book') : 'Book Now'}
              </Button>
            </a>
            <Link href={`/${locale || 'es'}/expeditions`}>
              <Button 
                size="lg" 
                className="bg-lightNavy border-2 border-lightNavy text-white hover:bg-white hover:text-lightNavy font-semibold min-h-[48px] px-6 py-3 sm:px-8 sm:py-4 text-base transition-all duration-300 shadow-lg hover:scale-105"
              >
                {messages ? getNestedMessage(messages, 'hero.buttons.explore') : 'View More'}
              </Button>
            </Link>
          </div>
        </div>
      </div>



      {/* Navigation Controls */}
      <div className="absolute inset-y-0 left-4 flex items-center z-30">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 border border-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-4 flex items-center z-30">
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon"
          className="w-12 h-12 rounded-full bg-black/40 text-white hover:bg-black/60 hover:scale-110 transition-all duration-300 border border-white/20"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Play/Pause Control */}
      <div className="absolute top-8 right-8 z-30">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all duration-300 border border-white/20"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}