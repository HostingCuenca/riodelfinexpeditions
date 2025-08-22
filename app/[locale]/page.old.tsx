import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Users, Compass } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { RatingStars } from '@/components/RatingStars';
import cabinsData from '@/data/cabins.json';
import expeditionsData from '@/data/expeditions.json';
import settings from '@/data/settings.json';

interface HomePageProps {
  params: {
    locale: Locale;
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const messages = await getMessages(params.locale);
  
  const featuredCabins = cabinsData.filter(cabin => cabin.featured);
  const featuredExpeditions = expeditionsData.filter(exp => exp.featured);

  return (
    <div>
      {/* Hero Section */}
      <Hero messages={messages} locale={params.locale} />

      {/* About Section */}
      <section className="py-20 bg-bgSoft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'home.about.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-jungle rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'home.about.conservation.title')}
              </h3>
              <p className="text-uiGray leading-relaxed">
                {getNestedMessage(messages, 'home.about.conservation.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jungle rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'home.about.culture.title')}
              </h3>
              <p className="text-uiGray leading-relaxed">
                {getNestedMessage(messages, 'home.about.culture.description')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-jungle rounded-full flex items-center justify-center mx-auto mb-6">
                <Compass className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'home.about.adventure.title')}
              </h3>
              <p className="text-uiGray leading-relaxed">
                {getNestedMessage(messages, 'home.about.adventure.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cabins */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deepBlue">
              {getNestedMessage(messages, 'home.featuredCabins')}
            </h2>
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/cabins`}>
                {getNestedMessage(messages, 'common.viewAll')}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredCabins.map((cabin) => (
              <div key={cabin.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={cabin.images[0]}
                    alt={cabin.title[params.locale]}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-deepBlue mb-2">
                    {cabin.title[params.locale]}
                  </h3>
                  <p className="text-uiGray mb-4 line-clamp-2">
                    {cabin.description[params.locale]}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-uiGray">
                      {cabin.capacity} {getNestedMessage(messages, 'common.guests')}
                    </span>
                    <span className="text-2xl font-bold text-turquoise">
                      ${cabin.pricePerNight} 
                      <span className="text-sm text-uiGray font-normal">
                        /{getNestedMessage(messages, 'common.perNight')}
                      </span>
                    </span>
                  </div>
                  <Button asChild variant="lodge" className="w-full">
                    <Link href={`/${params.locale}/cabins/${cabin.slug}`}>
                      {getNestedMessage(messages, 'common.viewDetails')}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Expeditions */}
      <section className="py-20 bg-bgSoft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deepBlue">
              {getNestedMessage(messages, 'home.featuredExpeditions')}
            </h2>
            <Button asChild variant="outline">
              <Link href={`/${params.locale}/expeditions`}>
                {getNestedMessage(messages, 'common.viewAll')}
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExpeditions.map((expedition) => (
              <div key={expedition.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={expedition.image}
                    alt={expedition.title[params.locale]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-jungle text-white px-2 py-1 rounded text-sm font-medium">
                      ${expedition.price}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-deepBlue mb-2">
                    {expedition.title[params.locale]}
                  </h3>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-uiGray">
                    <span>{expedition.duration[params.locale]}</span>
                    <RatingStars rating={expedition.rating} size="sm" showNumber />
                  </div>
                  <p className="text-uiGray mb-4 line-clamp-3">
                    {expedition.description[params.locale]}
                  </p>
                  <Button variant="outline" className="w-full border-turquoise text-turquoise hover:bg-turquoise hover:text-white">
                    {getNestedMessage(messages, 'common.viewDetails')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Allies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'footer.partners')}
            </h2>
            <p className="text-uiGray max-w-2xl mx-auto">
              Discover our sister lodges, each specialized in unique Amazon experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <a 
              href={settings.partners.colibri.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <h3 className="text-xl font-semibold text-deepBlue mb-2">
                {settings.partners.colibri.name}
              </h3>
              <p className="text-uiGray">
                {settings.partners.colibri.description[params.locale]}
              </p>
            </a>
            
            <a 
              href={settings.partners.monkeyFrog.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center"
            >
              <h3 className="text-xl font-semibold text-deepBlue mb-2">
                {settings.partners.monkeyFrog.name}
              </h3>
              <p className="text-uiGray">
                {settings.partners.monkeyFrog.description[params.locale]}
              </p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}