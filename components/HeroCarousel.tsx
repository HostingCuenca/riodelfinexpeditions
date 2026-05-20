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
    src: '/assets/galeria/nuevasfotos/Amazon 2-23.jpg',
    alt: 'Guacamayo escarlata en la selva amazónica',
    title: 'Welcome to Paradise',
    subtitle: 'Your Amazon Adventure Begins Here'
  },
  {
    src: '/assets/galeria/nuevasfotos/Amazon 2-38.jpg',
    alt: 'Guacamayo azul en vuelo sobre la Amazonía',
    title: 'Breathtaking Views',
    subtitle: 'Panoramic Amazon Rainforest'
  },
  {
    src: '/assets/galeria/nuevasfotos/Amazon 2-17.jpg',
    alt: 'Garza blanca en el río amazónico',
    title: 'Wildlife Encounters',
    subtitle: 'Discover Exotic Birds'
  },
  {
    src: '/heroimage.png',
    alt: 'Río Delfín Lodge Main View',
    title: 'River Expeditions',
    subtitle: 'Navigate the Amazon Waters'
  },
  {
    src: '/1vistahermosa.jpeg',
    alt: 'Beautiful Amazon Vista',
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
            {/* Gradiente derecha oscuro → izquierda transparente, para apreciar la foto */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content — mismo contenedor que el navbar para alineación perfecta */}
      <div className="relative z-20 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 sm:pb-8">
        <div className="text-white max-w-xl sm:max-w-2xl lg:max-w-3xl">

          {/* Trust Badge */}
          <div className="flex mb-7">
            <div className="flex items-center space-x-3 bg-black/25 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                ))}
                <span className="text-sm font-medium ml-2 text-white">
                  {messages ? getNestedMessage(messages, 'hero.rating') : '4.9 Excellence'}
                </span>
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60 mb-5">
            {messages ? getNestedMessage(messages, 'hero.subtitle') : 'Río Delfín Lodge & Expeditions · Ecuadorian Amazon'}
          </p>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.0] text-white mb-8">
            {messages ? getNestedMessage(messages, 'hero.title.part1') : 'Live the Amazon,'}
            <br />
            <span>
              {messages ? getNestedMessage(messages, 'hero.title.part2') : 'welcome to your Natural Retreat'}
            </span>
          </h1>

          {/* Separator + Description */}
          <div className="w-12 h-px bg-white/40 mb-6" />
          <p className="text-base sm:text-lg text-white/75 max-w-md leading-relaxed mb-10">
            {messages ? getNestedMessage(messages, 'hero.description') : 'Experience the pristine Ecuadorian Amazon with expert naturalist guidance. Comfortable accommodations and world-class wildlife encounters await.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-32 sm:mb-0">
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
                className="bg-amazonGreen hover:bg-emerald text-white font-semibold min-h-[48px] px-8 py-4 text-base transition-all duration-300 border-0 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {messages ? getNestedMessage(messages, 'hero.buttons.book') : 'Book Now'}
              </Button>
            </a>
            <Link href={`/${locale || 'es'}/expeditions`}>
              <Button
                size="lg"
                className="bg-white/10 border border-white/40 text-white hover:bg-white hover:text-deepBlue font-semibold min-h-[48px] px-8 py-4 text-base transition-all duration-300 shadow-lg hover:scale-105"
              >
                {messages ? getNestedMessage(messages, 'hero.buttons.explore') : 'View More'}
              </Button>
            </Link>
          </div>
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