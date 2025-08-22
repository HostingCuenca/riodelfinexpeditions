import Image from 'next/image';
import Link from 'next/link';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import cabinsData from '@/data/cabins.json';

interface CabinsPageProps {
  params: {
    locale: Locale;
  };
}

export default async function CabinsPage({ params }: CabinsPageProps) {
  const messages = await getMessages(params.locale);
  
  const breadcrumbItems = [
    { key: 'home', href: `/${params.locale}` },
    { key: 'cabins' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero 
        messages={messages} 
        locale={params.locale}
        backgroundImage="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop"
        title={getNestedMessage(messages, 'cabins.title')}
        subtitle={getNestedMessage(messages, 'cabins.subtitle')}
        showCTA={false}
      />

      {/* Content */}
      <section className="py-20 bg-bgSoft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs 
            items={breadcrumbItems}
            messages={messages}
            locale={params.locale}
            className="mb-8"
          />
          
          <div className="space-y-12">
            {cabinsData.map((cabin) => (
              <div key={cabin.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Images */}
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {cabin.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative h-48 rounded overflow-hidden">
                        <Image
                          src={image}
                          alt={`${cabin.title[params.locale]} - ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-deepBlue mb-4">
                      {cabin.title[params.locale]}
                    </h2>
                    <p className="text-uiGray mb-6 leading-relaxed">
                      {cabin.description[params.locale]}
                    </p>
                    
                    {/* Amenities Table */}
                    <div className="bg-bgSoft rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-deepBlue mb-3">
                        {getNestedMessage(messages, 'cabins.amenities')}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex justify-between">
                          <span className="text-uiGray">{getNestedMessage(messages, 'cabins.capacity')}:</span>
                          <span className="font-medium">{cabin.capacity} {getNestedMessage(messages, 'common.guests')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-uiGray">Bed:</span>
                          <span className="font-medium">{cabin.bedType[params.locale]}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                          {cabin.amenities[params.locale].map((amenity, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-white text-sm text-jungle rounded-full border border-jungle/20"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-3xl font-bold text-turquoise">
                          ${cabin.pricePerNight}
                        </span>
                        <span className="text-uiGray ml-1">
                          /{getNestedMessage(messages, 'common.perNight')}
                        </span>
                      </div>
                      <div className="space-x-3">
                        <Button asChild variant="outline">
                          <Link href={`/${params.locale}/cabins/${cabin.slug}`}>
                            {getNestedMessage(messages, 'common.viewDetails')}
                          </Link>
                        </Button>
                        <Button asChild variant="lodge">
                          <Link href={`/${params.locale}/book?cabin=${cabin.slug}`}>
                            {getNestedMessage(messages, 'common.bookNow')}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}