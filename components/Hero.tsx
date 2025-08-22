import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getNestedMessage, type Messages } from '@/lib/i18n';

interface HeroProps {
  messages: Messages;
  locale: string;
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

export function Hero({ 
  messages, 
  locale, 
  backgroundImage = "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&h=1080&fit=crop",
  title,
  subtitle,
  showCTA = true
}: HeroProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-deepBlue/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {title || getNestedMessage(messages, 'home.hero.title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
          {subtitle || getNestedMessage(messages, 'home.hero.subtitle')}
        </p>
        {showCTA && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="lodge" size="lg" className="text-lg px-8 py-4">
              <Link href={`/${locale}/book`}>
                {getNestedMessage(messages, 'home.hero.cta')}
              </Link>
            </Button>
            <Button asChild variant="lodgeSecondary" size="lg" className="text-lg px-8 py-4">
              <Link href={`/${locale}/expeditions`}>
                {getNestedMessage(messages, 'nav.expeditions')}
              </Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}