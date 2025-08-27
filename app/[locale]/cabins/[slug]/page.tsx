import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Users, Eye } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RatingStars } from '@/components/RatingStars';
import cabinsData from '@/data/cabins.json';
import reviewsData from '@/data/reviews.json';

export function generateStaticParams() {
  const cabinParams = [];
  
  for (const cabin of cabinsData) {
    cabinParams.push(
      { locale: "es", slug: cabin.slug },
      { locale: "en", slug: cabin.slug }
    );
  }
  
  return cabinParams;
}

interface CabinDetailPageProps {
  params: {
    locale: Locale;
    slug: string;
  };
}

export default async function CabinDetailPage({ params }: CabinDetailPageProps) {
  const messages = await getMessages(params.locale);
  const cabin = cabinsData.find(c => c.slug === params.slug);
  
  if (!cabin) {
    notFound();
  }

  // Get some sample reviews
  const cabinReviews = reviewsData.slice(0, 3);
  
  const breadcrumbItems = [
    { key: 'home', href: `/${params.locale}` },
    { key: 'cabins', href: `/${params.locale}/cabins` },
    { label: cabin.title[params.locale] }
  ];

  return (
    <div className="min-h-screen bg-bgSoft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs 
          items={breadcrumbItems}
          messages={messages}
          locale={params.locale}
          className="mb-8"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={cabin.images[0]}
                  alt={cabin.title[params.locale]}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cabin.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative h-24 md:h-[123px] rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`${cabin.title[params.locale]} - ${index + 2}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
                <Link 
                  href={`/${params.locale}/gallery?category=cabins`}
                  className="relative h-24 md:h-[123px] bg-deepBlue/80 rounded flex items-center justify-center text-white hover:bg-deepBlue transition-colors duration-300"
                >
                  <div className="text-center">
                    <Eye className="h-6 w-6 mx-auto mb-1" />
                    <span className="text-xs">Ver más</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-3xl font-bold text-deepBlue mb-4">
                {cabin.title[params.locale]}
              </h1>
              <p className="text-uiGray leading-relaxed text-lg">
                {cabin.description[params.locale]}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'cabins.amenities')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-bgSoft rounded">
                  <Users className="h-5 w-5 text-turquoise" />
                  <div>
                    <span className="text-sm text-uiGray">{getNestedMessage(messages, 'cabins.capacity')}</span>
                    <div className="font-medium">{cabin.capacity} {getNestedMessage(messages, 'common.guests')}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-bgSoft rounded">
                  <Calendar className="h-5 w-5 text-turquoise" />
                  <div>
                    <span className="text-sm text-uiGray">Bed type</span>
                    <div className="font-medium">{cabin.bedType[params.locale]}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {cabin.amenities[params.locale].map((amenity, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 p-2 bg-bgSoft rounded"
                  >
                    <div className="w-2 h-2 bg-jungle rounded-full"></div>
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold text-deepBlue mb-4">
                {getNestedMessage(messages, 'common.reviews')}
              </h2>
              <div className="space-y-4">
                {cabinReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-10 h-10 bg-turquoise rounded-full flex items-center justify-center text-white font-medium">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <RatingStars rating={review.rating} size="sm" />
                      </div>
                    </div>
                    <p className="text-uiGray text-sm leading-relaxed">
                      {review.text[params.locale]}
                    </p>
                  </div>
                ))}
              </div>
              <Link 
                href={`/${params.locale}/reviews`}
                className="inline-block mt-4 text-turquoise hover:text-teal transition-colors duration-300 font-medium"
              >
                {getNestedMessage(messages, 'common.viewAll')} →
              </Link>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="bg-emerald/10 border border-emerald/20 rounded-lg p-4">
                  <p className="text-lg font-semibold text-emerald text-center">
                    {params.locale === 'es' ? 'Precio por consulta' : 'Price on request'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {params.locale === 'es' ? 'Tarifas especiales para grupos' : 'Special rates for groups'}
                  </p>
                </div>
              </div>

              {/* Dummy availability calendar */}
              <div className="mb-6 p-4 bg-bgSoft rounded-lg">
                <h3 className="font-medium text-deepBlue mb-3">Availability</h3>
                <div className="grid grid-cols-7 gap-1 text-xs text-center">
                  <div className="p-2 font-medium text-uiGray">S</div>
                  <div className="p-2 font-medium text-uiGray">M</div>
                  <div className="p-2 font-medium text-uiGray">T</div>
                  <div className="p-2 font-medium text-uiGray">W</div>
                  <div className="p-2 font-medium text-uiGray">T</div>
                  <div className="p-2 font-medium text-uiGray">F</div>
                  <div className="p-2 font-medium text-uiGray">S</div>
                  
                  {Array.from({ length: 28 }, (_, i) => (
                    <div 
                      key={i}
                      className={`p-2 rounded ${
                        Math.random() > 0.7 
                          ? 'bg-gray-200 text-gray-400' 
                          : 'bg-white border hover:bg-turquoise hover:text-white cursor-pointer'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild variant="lodge" size="lg" className="w-full">
                  <Link href={`/${params.locale}/book?cabin=${cabin.slug}`}>
                    Pre-reservar
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href={`/${params.locale}/contact?subject=cabin-inquiry&cabin=${cabin.slug}`}>
                    Consultar disponibilidad
                  </Link>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-uiGray">
                  ¿Necesitas ayuda? <br />
                  <a 
                    href={`https://wa.me/593991234567`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-turquoise hover:text-teal font-medium"
                  >
                    Contáctanos por WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}