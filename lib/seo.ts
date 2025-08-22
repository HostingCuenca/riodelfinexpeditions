import { Locale } from './i18n';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export const seoConfig: Record<Locale, Record<string, SEOData>> = {
  es: {
    home: {
      title: 'Río Delfín Lodge • Expeditions - Amazonía Ecuatoriana',
      description: 'Vive la Amazonía ecuatoriana en Río Delfín Lodge. Cabañas ecológicas, expediciones guiadas y experiencias únicas en la selva tropical.',
      keywords: ['amazonía ecuatoriana', 'lodge eco', 'expediciones selva', 'turismo sostenible'],
      ogImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=630&fit=crop'
    },
    lodge: {
      title: 'Sobre el Lodge - Río Delfín Lodge',
      description: 'Conoce más sobre nuestro lodge ecológico en la Amazonía ecuatoriana, nuestros valores de conservación y sostenibilidad.',
    },
    cabins: {
      title: 'Cabañas Ecológicas - Río Delfín Lodge',
      description: 'Cabañas rústico-elegantes con vista al río, construidas de manera sostenible en la selva amazónica.',
    },
    expeditions: {
      title: 'Expediciones y Tours - Río Delfín Lodge',
      description: 'Explora la Amazonía con nuestras expediciones guiadas: avistamiento de fauna, comunidades indígenas y aventuras en la selva.',
    }
  },
  en: {
    home: {
      title: 'Río Delfín Lodge • Expeditions - Ecuadorian Amazon',
      description: 'Experience the Ecuadorian Amazon at Río Delfín Lodge. Eco-friendly cabins, guided expeditions and unique rainforest experiences.',
      keywords: ['ecuadorian amazon', 'eco lodge', 'rainforest expeditions', 'sustainable tourism'],
      ogImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=630&fit=crop'
    },
    lodge: {
      title: 'About the Lodge - Río Delfín Lodge',
      description: 'Learn more about our eco lodge in the Ecuadorian Amazon, our conservation values and sustainability practices.',
    },
    cabins: {
      title: 'Eco Cabins - Río Delfín Lodge',
      description: 'Rustic-elegant cabins with river views, sustainably built in the Amazon rainforest.',
    },
    expeditions: {
      title: 'Expeditions & Tours - Río Delfín Lodge',
      description: 'Explore the Amazon with our guided expeditions: wildlife watching, indigenous communities and rainforest adventures.',
    }
  }
};

export function generateJsonLd(type: 'lodge' | 'cabin' | 'expedition', data: any, locale: Locale) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://riodelfin.com';
  
  if (type === 'lodge') {
    return {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Río Delfín Lodge',
      description: locale === 'es' 
        ? 'Lodge ecológico en la Amazonía ecuatoriana' 
        : 'Eco lodge in the Ecuadorian Amazon',
      url: `${baseUrl}/${locale}`,
      telephone: '+593-99-123-4567',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'EC',
        addressRegion: 'Orellana',
        addressLocality: 'Francisco de Orellana'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -0.4686,
        longitude: -76.9834
      },
      priceRange: '$$'
    };
  }
  
  return {};
}