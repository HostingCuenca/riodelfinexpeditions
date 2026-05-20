'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Camera, Filter, X, ChevronLeft, ChevronRight, Star, Award, MapPin, MessageCircle, Heart, Eye, Users, Sun, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GalleryPageProps {
  params: {
    locale: string;
  };
}

// Client component for gallery functionality
function GalleryGrid({ messages, locale }: { messages: any; locale: string }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Comprehensive gallery with all available images
  const galleryImages = [
    // Expeditions & Adventures
    {
      id: '1',
      url: '/assets/colibrilodge/en lancha 1 expedicion.jpg',
      category: 'expeditions',
      caption: {
        es: 'Expedición en lancha por los ríos amazónicos',
        en: 'Boat expedition through Amazon rivers'
      }
    },
    {
      id: '2',
      url: '/assets/colibrilodge/fishingtrip.jpg',
      category: 'expeditions',
      caption: {
        es: 'Pesca tradicional de pirañas',
        en: 'Traditional piranha fishing'
      }
    },
    {
      id: '3',
      url: '/assets/colibrilodge/grupoenamazonia.jpg',
      category: 'expeditions',
      caption: {
        es: 'Grupo disfrutando la aventura amazónica',
        en: 'Group enjoying Amazon adventure'
      }
    },
    {
      id: '4',
      url: '/assets/colibrilodge/turistas con jacobtangoy.jpg',
      category: 'community',
      caption: {
        es: 'Turistas con Jacob Tangoy, guía experto',
        en: 'Tourists with Jacob Tangoy, expert guide'
      }
    },
    {
      id: '5',
      url: '/assets/colibrilodge/mas turistas expedicion.jpg',
      category: 'expeditions',
      caption: {
        es: 'Más aventureros en expedición',
        en: 'More adventurers on expedition'
      }
    },

    // Wildlife & Birds
    {
      id: '6',
      url: '/assets/colibrilodge/observacionaves1.jpg',
      category: 'fauna',
      caption: {
        es: 'Observación de aves exóticas',
        en: 'Exotic bird watching'
      }
    },
    {
      id: '7',
      url: '/assets/colibrilodge/observacionaves2.jpg',
      category: 'fauna',
      caption: {
        es: 'Torre de observación de aves',
        en: 'Bird watching tower'
      }
    },
    {
      id: '8',
      url: '/assets/riodelfin/observacionaves1.jpg',
      category: 'fauna',
      caption: {
        es: 'Aves coloridas de la Amazonía',
        en: 'Colorful Amazon birds'
      }
    },
    {
      id: '9',
      url: '/assets/riodelfin/observacionaves2.jpg',
      category: 'fauna',
      caption: {
        es: 'Avistamiento de aves tropicales',
        en: 'Tropical bird spotting'
      }
    },
    {
      id: '10',
      url: '/assets/riodelfin/delfinesrosadosvertical.jpg',
      category: 'fauna',
      caption: {
        es: 'Delfines rosados del Amazonas',
        en: 'Amazon pink dolphins'
      }
    },
    {
      id: '11',
      url: '/assets/riodelfin/mononaturalez.jpg',
      category: 'fauna',
      caption: {
        es: 'Monos en su hábitat natural',
        en: 'Monkeys in their natural habitat'
      }
    },
    {
      id: '12',
      url: '/assets/riodelfin/naturalezatortugas.jpg',
      category: 'fauna',
      caption: {
        es: 'Tortugas amazónicas',
        en: 'Amazon turtles'
      }
    },
    {
      id: '13',
      url: '/assets/1ave.jpeg',
      category: 'fauna',
      caption: {
        es: 'Ave exótica de la selva',
        en: 'Exotic jungle bird'
      }
    },
    {
      id: '14',
      url: '/assets/1avefoto .jpeg',
      category: 'fauna',
      caption: {
        es: 'Fotografía de ave tropical',
        en: 'Tropical bird photography'
      }
    },
    {
      id: '15',
      url: '/assets/1grupodeavesenramas.jpeg',
      category: 'fauna',
      caption: {
        es: 'Grupo de aves en las ramas',
        en: 'Group of birds on branches'
      }
    },

    // Lodges & Cabins
    {
      id: '16',
      url: '/assets/colibrilodge/colibricabañas1.jpg',
      category: 'cabins',
      caption: {
        es: 'Cabañas Colibri Amazon Lodge',
        en: 'Colibri Amazon Lodge Cabins'
      }
    },
    {
      id: '17',
      url: '/assets/colibrilodge/cabañashermosas.jpg',
      category: 'cabins',
      caption: {
        es: 'Hermosas cabañas con vista al río',
        en: 'Beautiful cabins with river view'
      }
    },
    {
      id: '18',
      url: '/assets/1cabaña.jpeg',
      category: 'cabins',
      caption: {
        es: 'Cabaña rústico-elegante',
        en: 'Rustic-elegant cabin'
      }
    },
    {
      id: '19',
      url: '/assets/1cabañahamacavertical.jpeg',
      category: 'cabins',
      caption: {
        es: 'Cabaña con hamacas tradicionales',
        en: 'Cabin with traditional hammocks'
      }
    },
    {
      id: '20',
      url: '/assets/riodelfin/hamacas.jpg',
      category: 'cabins',
      caption: {
        es: 'Área de descanso con hamacas',
        en: 'Rest area with hammocks'
      }
    },
    {
      id: '21',
      url: '/assets/1seccioncasa.jpeg',
      category: 'cabins',
      caption: {
        es: 'Sección interior de la casa',
        en: 'Interior section of the house'
      }
    },

    // Cabin Details & Amenities
    {
      id: '22',
      url: '/assets/detallescabaña/habitacion1.png',
      category: 'cabins',
      caption: {
        es: 'Habitación cómoda y acogedora',
        en: 'Comfortable and cozy room'
      }
    },
    {
      id: '23',
      url: '/assets/detallescabaña/habitacion.png',
      category: 'cabins',
      caption: {
        es: 'Dormitorio con decoración natural',
        en: 'Bedroom with natural decoration'
      }
    },
    {
      id: '24',
      url: '/assets/detallescabaña/baño.png',
      category: 'cabins',
      caption: {
        es: 'Baño privado completo',
        en: 'Complete private bathroom'
      }
    },
    {
      id: '25',
      url: '/assets/detallescabaña/desayunos.png',
      category: 'community',
      caption: {
        es: 'Deliciosos desayunos amazónicos',
        en: 'Delicious Amazon breakfasts'
      }
    },
    {
      id: '26',
      url: '/assets/detallescabaña/gastronomiadesayunos.png',
      category: 'community',
      caption: {
        es: 'Gastronomía local para desayunos',
        en: 'Local gastronomy for breakfast'
      }
    },
    {
      id: '27',
      url: '/assets/detallescabaña/gastronomia2.png',
      category: 'community',
      caption: {
        es: 'Platos tradicionales amazónicos',
        en: 'Traditional Amazon dishes'
      }
    },
    {
      id: '28',
      url: '/assets/detallescabaña/gastronomia3.png',
      category: 'community',
      caption: {
        es: 'Comida casera preparada con amor',
        en: 'Home-cooked food prepared with love'
      }
    },
    {
      id: '29',
      url: '/assets/detallescabaña/gastronomia4.png',
      category: 'community',
      caption: {
        es: 'Variedad gastronómica local',
        en: 'Local gastronomic variety'
      }
    },
    {
      id: '30',
      url: '/assets/1experienciadesayuno.jpeg',
      category: 'community',
      caption: {
        es: 'Experiencia de desayuno al aire libre',
        en: 'Outdoor breakfast experience'
      }
    },

    // Rivers & Nature
    {
      id: '31',
      url: '/assets/riodelfin/atardecer.jpg',
      category: 'river',
      caption: {
        es: 'Impresionante atardecer amazónico',
        en: 'Stunning Amazon sunset'
      }
    },
    {
      id: '32',
      url: '/assets/riodelfin/riodelfinpuestadesol.jpg',
      category: 'river',
      caption: {
        es: 'Puesta de sol en Río Delfín',
        en: 'Sunset at Río Delfín'
      }
    },
    {
      id: '33',
      url: '/assets/1rio.jpeg',
      category: 'river',
      caption: {
        es: 'Navegación por ríos cristalinos',
        en: 'Navigation through crystal-clear rivers'
      }
    },
    {
      id: '34',
      url: '/assets/1rio2.jpeg',
      category: 'river',
      caption: {
        es: 'Explorando afluentes amazónicos',
        en: 'Exploring Amazon tributaries'
      }
    },
    {
      id: '35',
      url: '/assets/1vistahermosa.jpeg',
      category: 'river',
      caption: {
        es: 'Vista hermosa del paisaje fluvial',
        en: 'Beautiful view of river landscape'
      }
    },
    {
      id: '36',
      url: '/assets/1vistapaisaje.jpeg',
      category: 'river',
      caption: {
        es: 'Paisaje amazónico espectacular',
        en: 'Spectacular Amazon landscape'
      }
    },
    {
      id: '37',
      url: '/assets/riodelfin/cieloestrelladovertical.jpg',
      category: 'river',
      caption: {
        es: 'Cielo estrellado sobre la Amazonía',
        en: 'Starry sky over the Amazon'
      }
    },

    // Forest & Nature
    {
      id: '38',
      url: '/assets/colibrilodge/bosquecolibrilodge.jpg',
      category: 'river',
      caption: {
        es: 'Bosque primario del lodge',
        en: 'Primary forest of the lodge'
      }
    },
    {
      id: '39',
      url: '/assets/detallescabaña/experiencias inolvidables.jpg',
      category: 'expeditions',
      caption: {
        es: 'Experiencias inolvidables en la selva',
        en: 'Unforgettable jungle experiences'
      }
    },

    // Community & People
    {
      id: '40',
      url: '/assets/1JacobTangoy.jpeg',
      category: 'community',
      caption: {
        es: 'Jacob Tangoy - Guía Naturalista Experto',
        en: 'Jacob Tangoy - Expert Naturalist Guide'
      }
    },
    {
      id: '41',
      url: '/assets/1grupodepersonas.jpeg',
      category: 'community',
      caption: {
        es: 'Grupo de aventureros satisfechos',
        en: 'Group of satisfied adventurers'
      }
    },
    {
      id: '42',
      url: '/assets/1selfiegrupal.jpeg',
      category: 'community',
      caption: {
        es: 'Selfie grupal de la expedición',
        en: 'Group selfie from the expedition'
      }
    },
    {
      id: '43',
      url: '/assets/riodelfin/personasenelaguaposando.jpg',
      category: 'community',
      caption: {
        es: 'Aventureros disfrutando del agua',
        en: 'Adventurers enjoying the water'
      }
    },
    {
      id: '44',
      url: '/assets/1guiaturisticovertical.jpeg',
      category: 'community',
      caption: {
        es: 'Guía turístico con experiencia local',
        en: 'Tour guide with local experience'
      }
    },
    {
      id: '45',
      url: '/assets/1experienciaconvivencia.jpeg',
      category: 'community',
      caption: {
        es: 'Experiencia de convivencia comunitaria',
        en: 'Community coexistence experience'
      }
    },
    {
      id: '46',
      url: '/assets/1fotografia.jpeg',
      category: 'community',
      caption: {
        es: 'Capturando momentos especiales',
        en: 'Capturing special moments'
      }
    },
    {
      id: '47',
      url: '/assets/1cacao.jpeg',
      category: 'community',
      caption: {
        es: 'Proceso tradicional del cacao',
        en: 'Traditional cacao process'
      }
    },
    {
      id: '48',
      url: '/assets/1carpavistahermosario.jpeg',
      category: 'expeditions',
      caption: {
        es: 'Camping con vista hermosa al río',
        en: 'Camping with beautiful river view'
      }
    },
    // Nuevas fotos de la galería
    {
      id: '49',
      url: '/assets/galeria/148A1023.jpg',
      category: 'fauna',
      caption: {
        es: 'Vida silvestre amazónica',
        en: 'Amazon wildlife'
      }
    },
    {
      id: '50',
      url: '/assets/galeria/148A1267.jpg',
      category: 'river',
      caption: {
        es: 'Naturaleza amazónica',
        en: 'Amazon nature'
      }
    },
    {
      id: '51',
      url: '/assets/galeria/148A4383.jpg',
      category: 'expeditions',
      caption: {
        es: 'Experiencia amazónica',
        en: 'Amazon experience'
      }
    },
    {
      id: '52',
      url: '/assets/galeria/_48A1846.jpg',
      category: 'expeditions',
      caption: {
        es: 'Aventura en la selva',
        en: 'Jungle adventure'
      }
    },
    {
      id: '53',
      url: '/assets/galeria/_48A4726.jpg',
      category: 'river',
      caption: {
        es: 'Selva tropical amazónica',
        en: 'Amazon rainforest'
      }
    },
    {
      id: '54',
      url: '/assets/galeria/_48A5321.jpg',
      category: 'fauna',
      caption: {
        es: 'Encuentro con vida silvestre',
        en: 'Wildlife encounter'
      }
    },
    {
      id: '55',
      url: '/assets/galeria/_48A6260.jpg',
      category: 'river',
      caption: {
        es: 'Selva amazónica',
        en: 'Amazon jungle'
      }
    },
    {
      id: '56',
      url: '/assets/galeria/_48A7132.jpg',
      category: 'expeditions',
      caption: {
        es: 'Expedición amazónica',
        en: 'Amazon expedition'
      }
    },
    {
      id: '57',
      url: '/assets/galeria/_MG_5467.jpg',
      category: 'river',
      caption: {
        es: 'Paisaje amazónico',
        en: 'Amazon landscape'
      }
    },
    {
      id: '58',
      url: '/assets/galeria/_MG_8778.jpg',
      category: 'river',
      caption: {
        es: 'Flora amazónica',
        en: 'Amazon flora'
      }
    },
    {
      id: '59',
      url: '/assets/galeria/_MG_8987.jpg',
      category: 'fauna',
      caption: {
        es: 'Fauna amazónica',
        en: 'Amazon fauna'
      }
    },
    {
      id: '60',
      url: '/assets/galeria/_MG_9282.jpg',
      category: 'river',
      caption: {
        es: 'Río amazónico',
        en: 'Amazon river'
      }
    },
    {
      id: '61',
      url: '/assets/galeria/DJI_0687.jpg',
      category: 'river',
      caption: {
        es: 'Vista aérea de la Amazonía',
        en: 'Amazon aerial view'
      }
    },
    {
      id: '62',
      url: '/assets/galeria/IMG_2147.jpg',
      category: 'expeditions',
      caption: {
        es: 'Exploración amazónica',
        en: 'Amazon exploration'
      }
    },
    {
      id: '63',
      url: '/assets/galeria/IMG_8404.jpg',
      category: 'river',
      caption: {
        es: 'Ecosistema amazónico',
        en: 'Amazon ecosystem'
      }
    },
    {
      id: '64',
      url: '/assets/galeria/IMG_9743.jpg',
      category: 'fauna',
      caption: {
        es: 'Biodiversidad amazónica',
        en: 'Amazon biodiversity'
      }
    },
    {
      id: '65',
      url: '/assets/galeria/Lagarto_54.jpg',
      category: 'fauna',
      caption: {
        es: 'Lagarto amazónico',
        en: 'Amazon lizard'
      }
    },
    {
      id: '66',
      url: '/assets/galeria/Lagarto_55.jpg',
      category: 'fauna',
      caption: {
        es: 'Reptil amazónico',
        en: 'Amazon reptile'
      }
    },
    {
      id: '67',
      url: '/assets/galeria/Lagarto_56.jpg',
      category: 'fauna',
      caption: {
        es: 'Especies de vida silvestre',
        en: 'Wildlife species'
      }
    },
    {
      id: '68',
      url: '/assets/galeria/Lagarto_59.jpg',
      category: 'fauna',
      caption: { es: 'Vida silvestre del bosque', en: 'Forest wildlife' }
    },

    // Serie Amazon 2024 — fotografías de expediciones
    { id: '69',  url: '/assets/galeria/nuevasfotos/Amazon 1-01.jpg', category: 'amazon', caption: { es: 'Amanecer en la selva amazónica',          en: 'Dawn in the Amazon jungle' } },
    { id: '70',  url: '/assets/galeria/nuevasfotos/Amazon 1-03.jpg', category: 'amazon', caption: { es: 'Vida silvestre en la expedición',           en: 'Wildlife on expedition' } },
    { id: '71',  url: '/assets/galeria/nuevasfotos/Amazon 1-04.jpg', category: 'amazon', caption: { es: 'Colores de la Amazonía ecuatoriana',         en: 'Colors of the Ecuadorian Amazon' } },
    { id: '72',  url: '/assets/galeria/nuevasfotos/Amazon 1-05.jpg', category: 'amazon', caption: { es: 'Bosque tropical en flor',                   en: 'Tropical forest in bloom' } },
    { id: '73',  url: '/assets/galeria/nuevasfotos/Amazon 1-06.jpg', category: 'amazon', caption: { es: 'Flora amazónica espectacular',              en: 'Spectacular Amazon flora' } },
    { id: '74',  url: '/assets/galeria/nuevasfotos/Amazon 1-08.jpg', category: 'amazon', caption: { es: 'Naturaleza exuberante',                     en: 'Lush nature' } },
    { id: '75',  url: '/assets/galeria/nuevasfotos/Amazon 1-09.jpg', category: 'amazon', caption: { es: 'Árboles en la selva profunda',              en: 'Trees in the deep jungle' } },
    { id: '76',  url: '/assets/galeria/nuevasfotos/Amazon 1-12.jpg', category: 'amazon', caption: { es: 'Paisaje tropical amazónico',                en: 'Amazon tropical landscape' } },
    { id: '77',  url: '/assets/galeria/nuevasfotos/Amazon 1-13.jpg', category: 'amazon', caption: { es: 'Selva en colores vibrantes',                en: 'Jungle in vibrant colors' } },
    { id: '78',  url: '/assets/galeria/nuevasfotos/Amazon 1-16.jpg', category: 'amazon', caption: { es: 'Fauna en su hábitat natural',               en: 'Fauna in its natural habitat' } },
    { id: '79',  url: '/assets/galeria/nuevasfotos/Amazon 1-17.jpg', category: 'amazon', caption: { es: 'Exploración entre la vegetación',           en: 'Exploration through vegetation' } },
    { id: '80',  url: '/assets/galeria/nuevasfotos/Amazon 1-18.jpg', category: 'amazon', caption: { es: 'Vista del río entre la vegetación',         en: 'River view through vegetation' } },
    { id: '81',  url: '/assets/galeria/nuevasfotos/Amazon 1-19.jpg', category: 'amazon', caption: { es: 'Reflejos amazónicos en el agua',            en: 'Amazon reflections on water' } },
    { id: '82',  url: '/assets/galeria/nuevasfotos/Amazon 1-22.jpg', category: 'amazon', caption: { es: 'Atardecer en la Amazonía',                  en: 'Sunset in the Amazon' } },
    { id: '83',  url: '/assets/galeria/nuevasfotos/Amazon 2-01.jpg', category: 'amazon', caption: { es: 'Expedición por los ríos amazónicos',        en: 'Expedition through Amazon rivers' } },
    { id: '84',  url: '/assets/galeria/nuevasfotos/Amazon 2-02.jpg', category: 'amazon', caption: { es: 'Navegando la selva amazónica',              en: 'Navigating the Amazon jungle' } },
    { id: '85',  url: '/assets/galeria/nuevasfotos/Amazon 2-03.jpg', category: 'amazon', caption: { es: 'Grupo en expedición amazónica',             en: 'Group on Amazon expedition' } },
    { id: '86',  url: '/assets/galeria/nuevasfotos/Amazon 2-06.jpg', category: 'amazon', caption: { es: 'Guías locales entre la naturaleza',         en: 'Local guides in nature' } },
    { id: '87',  url: '/assets/galeria/nuevasfotos/Amazon 2-10.jpg', category: 'amazon', caption: { es: 'Aventureros en la Amazonía',                en: 'Adventurers in the Amazon' } },
    { id: '88',  url: '/assets/galeria/nuevasfotos/Amazon 2-11.jpg', category: 'amazon', caption: { es: 'Explorando el dosel tropical',             en: 'Exploring the tropical canopy' } },
    { id: '89',  url: '/assets/galeria/nuevasfotos/Amazon 2-12.jpg', category: 'amazon', caption: { es: 'Momento especial en la selva',             en: 'Special moment in the jungle' } },
    { id: '90',  url: '/assets/galeria/nuevasfotos/Amazon 2-14.jpg', category: 'amazon', caption: { es: 'Experiencia única en la Amazonía',          en: 'Unique Amazon experience' } },
    { id: '91',  url: '/assets/galeria/nuevasfotos/Amazon 2-15.jpg', category: 'amazon', caption: { es: 'Descubriendo la Amazonía',                  en: 'Discovering the Amazon' } },
    { id: '92',  url: '/assets/galeria/nuevasfotos/Amazon 2-16.jpg', category: 'amazon', caption: { es: 'Entre la vegetación exótica',               en: 'Among exotic vegetation' } },
    { id: '93',  url: '/assets/galeria/nuevasfotos/Amazon 2-17.jpg', category: 'amazon', caption: { es: 'Biodiversidad amazónica',                   en: 'Amazon biodiversity' } },
    { id: '94',  url: '/assets/galeria/nuevasfotos/Amazon 2-20.jpg', category: 'amazon', caption: { es: 'Maravillas naturales del Amazonas',         en: 'Natural wonders of the Amazon' } },
    { id: '95',  url: '/assets/galeria/nuevasfotos/Amazon 2-21.jpg', category: 'amazon', caption: { es: 'Río y selva en armonía',                    en: 'River and jungle in harmony' } },
    { id: '96',  url: '/assets/galeria/nuevasfotos/Amazon 2-23.jpg', category: 'amazon', caption: { es: 'Vida silvestre amazónica',                  en: 'Amazon wildlife' } },
    { id: '97',  url: '/assets/galeria/nuevasfotos/Amazon 2-24.jpg', category: 'amazon', caption: { es: 'Fotografiando la naturaleza',               en: 'Photographing nature' } },
    { id: '98',  url: '/assets/galeria/nuevasfotos/Amazon 2-25.jpg', category: 'amazon', caption: { es: 'Amanecer en la expedición',                 en: 'Dawn on expedition' } },
    { id: '99',  url: '/assets/galeria/nuevasfotos/Amazon 2-27.jpg', category: 'amazon', caption: { es: 'Exploradores amazónicos',                   en: 'Amazon explorers' } },
    { id: '100', url: '/assets/galeria/nuevasfotos/Amazon 2-30.jpg', category: 'amazon', caption: { es: 'Flora tropical en esplendor',               en: 'Tropical flora in splendor' } },
    { id: '101', url: '/assets/galeria/nuevasfotos/Amazon 2-31.jpg', category: 'amazon', caption: { es: 'Comunidad y naturaleza',                    en: 'Community and nature' } },
    { id: '102', url: '/assets/galeria/nuevasfotos/Amazon 2-34.jpg', category: 'amazon', caption: { es: 'Momentos únicos en la selva',               en: 'Unique jungle moments' } },
    { id: '103', url: '/assets/galeria/nuevasfotos/Amazon 2-35.jpg', category: 'amazon', caption: { es: 'Colores vibrantes de la Amazonía',          en: 'Vibrant Amazon colors' } },
    { id: '104', url: '/assets/galeria/nuevasfotos/Amazon 2-36.jpg', category: 'amazon', caption: { es: 'Expedición amazónica 2024',                 en: 'Amazon expedition 2024' } },
    { id: '105', url: '/assets/galeria/nuevasfotos/Amazon 2-37.jpg', category: 'amazon', caption: { es: 'Naturaleza en su estado puro',              en: 'Nature in its pure state' } },
    { id: '106', url: '/assets/galeria/nuevasfotos/Amazon 2-38.jpg', category: 'amazon', caption: { es: 'Aventura en tierra amazónica',              en: 'Adventure in Amazon land' } },
    { id: '107', url: '/assets/galeria/nuevasfotos/Amazon 2-39.jpg', category: 'amazon', caption: { es: 'Recuerdos amazónicos inolvidables',         en: 'Unforgettable Amazon memories' } },
  ];

  const categories = [
    { id: 'all', name: 'Todas las Fotos', icon: '🌟' },
    { id: 'fauna', name: 'Vida Silvestre', icon: '🦜' },
    { id: 'river', name: 'Ríos & Naturaleza', icon: '🌊' },
    { id: 'cabins', name: 'Cabañas & Lodge', icon: '🏡' },
    { id: 'expeditions', name: 'Expediciones', icon: '🚤' },
    { id: 'community', name: 'Comunidad & Gastronomía', icon: '👥' },
    { id: 'amazon', name: 'Serie Amazon 2024', icon: '📸' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      {/* Excellence Awards Banner */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-deepBlue mb-2">Reconocimientos y Excelencia</h3>
          <p className="text-darkGray">Avalados por las mejores plataformas de turismo mundial</p>
        </div>
        
      </div>

      {/* Why Visit Us - 4 Reasons Section */}
      <div className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-deepBlue mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg text-darkGray max-w-2xl mx-auto">
              Descubre las razones que hacen de Río Delfín una experiencia única e inolvidable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Reason 1: Wildlife Observation */}
            <div className="group relative h-96 overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer">
              <Image
                src="/assets/colibrilodge/observacionaves1.jpg"
                alt="Observación de aves"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Observación de Vida Silvestre
                  </h3>
                </div>
                <p className="text-sm text-gray-200 leading-tight line-clamp-2">
                  Más de 500 especies de aves, delfines rosados y biodiversidad única.
                </p>
              </div>
            </div>

            {/* Reason 2: Cultural Experiences */}
            <div className="group relative h-96 overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer">
              <Image
                src="/assets/1experienciaconvivencia.jpeg"
                alt="Experiencias culturales"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Experiencias Auténticas
                  </h3>
                </div>
                <p className="text-sm text-gray-200 leading-tight line-clamp-2">
                  Convive con comunidades locales y vive tradiciones ancestrales.
                </p>
              </div>
            </div>

            {/* Reason 3: Unforgettable Sunsets */}
            <div className="group relative h-96 overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer">
              <Image
                src="/assets/riodelfin/atardecer.jpg"
                alt="Atardeceres amazónicos"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-sunset/90 rounded-full flex items-center justify-center mr-3">
                    <Sun className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Atardeceres Espectaculares
                  </h3>
                </div>
                <p className="text-sm text-gray-200 leading-tight line-clamp-2">
                  Colores vibrantes que se reflejan en los ríos amazónicos.
                </p>
              </div>
            </div>

            {/* Reason 4: Comfortable Accommodations */}
            <div className="group relative h-96 overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer">
              <Image
                src="/assets/detallescabaña/experiencias inolvidables.jpg"
                alt="Alojamientos cómodos"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <Home className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Comodidad en la Selva
                  </h3>
                </div>
                <p className="text-sm text-gray-200 leading-tight line-clamp-2">
                  Cabañas equipadas sin perder conexión con la naturaleza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
              selectedCategory === category.id
                ? 'bg-emerald text-white shadow-xl border-emerald scale-105'
                : 'bg-white text-darkGray border-gray-200 hover:bg-emerald/10 hover:text-emerald hover:border-emerald/30'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <Badge className={`${selectedCategory === category.id ? 'bg-white/20 text-white' : 'bg-emerald/10 text-emerald'} border-0`}>
              {selectedCategory === category.id ? filteredImages.length : galleryImages.filter(img => img.category === category.id).length}
            </Badge>
          </button>
        ))}
      </div>

      {/* Gallery Stats */}
      <div className="text-center mb-8">
        <p className="text-lg text-darkGray">
          Mostrando <span className="font-bold text-emerald">{filteredImages.length}</span> de <span className="font-bold text-deepBlue">{galleryImages.length}</span> fotografías
        </p>
      </div>

      {/* Gallery Grid - Optimized Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => {
          // Define different heights based on image aspect ratio or pattern
          const isVertical = image.url.includes('vertical') || image.url.includes('delfin') || index % 7 === 0;
          const isTall = image.url.includes('atardecer') || image.url.includes('estrellado') || index % 5 === 0;
          
          let heightClass = 'h-64'; // default
          if (isVertical) heightClass = 'h-80';
          if (isTall) heightClass = 'h-72';
          
          return (
            <div 
              key={image.id}
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${heightClass}`}
              onClick={() => setSelectedImage({ ...image, index })}
            >
              <Image
                src={image.url}
                alt={image.caption[locale as keyof typeof image.caption] || image.caption.en}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge className="bg-emerald/90 text-white border-none backdrop-blur-sm text-xs">
                  {categories.find(cat => cat.id === image.category)?.icon} {categories.find(cat => cat.id === image.category)?.name}
                </Badge>
              </div>
              
              {/* Camera Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Camera className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium leading-tight">
                  {image.caption[locale as keyof typeof image.caption] || image.caption.en}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 z-10 transition-colors duration-200"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* Navigation Buttons */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => {
                    const currentIndex = selectedImage.index;
                    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
                    setSelectedImage({ ...filteredImages[prevIndex], index: prevIndex });
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/30 rounded-full p-2 backdrop-blur-sm transition-all duration-200"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                
                <button
                  onClick={() => {
                    const currentIndex = selectedImage.index;
                    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
                    setSelectedImage({ ...filteredImages[nextIndex], index: nextIndex });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10 bg-black/30 rounded-full p-2 backdrop-blur-sm transition-all duration-200"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="relative max-h-[80vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.caption[locale as keyof typeof selectedImage.caption] || selectedImage.caption.en}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto rounded-lg"
              />
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent text-white p-6 rounded-b-lg">
              <p className="text-lg font-medium mb-2">
                {selectedImage.caption[locale as keyof typeof selectedImage.caption] || selectedImage.caption.en}
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-emerald/80 text-white border-none">
                  {categories.find(cat => cat.id === selectedImage.category)?.icon} {categories.find(cat => cat.id === selectedImage.category)?.name}
                </Badge>
                <span className="text-sm text-gray-300">
                  {selectedImage.index + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const [messages, setMessages] = useState<any>(null);
  
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesModule = await import(`@/messages/${params.locale}.json`);
        setMessages(messagesModule.default);
      } catch (error) {
        const fallbackModule = await import('@/messages/en.json');
        setMessages(fallbackModule.default);
      }
    };
    loadMessages();
  }, [params.locale]);
  
  if (!messages) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Real Photos */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/colibrilodge/grupoenamazonia.jpg"
            alt="Amazon Gallery"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>
        
        <div className="relative z-20 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-5xl px-4 sm:px-6">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Badge className="bg-emerald/90 text-white px-4 py-2 text-sm border-0">
                <Star className="h-4 w-4 mr-1" />
                Fotografías Verificadas
              </Badge>
              <Badge className="bg-warmOrange/90 text-white px-4 py-2 text-sm border-0">
                <Camera className="h-4 w-4 mr-1" />
                107 Fotos Auténticas
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Galería Fotográfica Río Delfín
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre la belleza de la Amazonía ecuatoriana a través de nuestras fotografías auténticas. 
              Cada imagen captura la magia de las expediciones reales con Río Delfín Expeditions.
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-300 mb-8">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">Yasuní, Cuyabeno & Limoncocha - Amazonía Ecuatoriana</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              Nuestras Experiencias Capturadas
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              Cada fotografía cuenta la historia de una aventura única en el corazón de la Amazonía ecuatoriana. 
              Desde la vida silvestre hasta las experiencias comunitarias, descubre lo que te espera.
            </p>
          </div>

          {/* Client-side Gallery Component */}
          <GalleryGrid messages={messages} locale={params.locale} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-emerald to-amazonGreen text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-6">
              ¿Listo para Crear Tus Propios Recuerdos?
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Únete a nosotros y captura tu propia aventura amazónica con Río Delfín Expeditions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => window.open('https://wa.me/593990657053?text=Hola! Vi su increíble galería fotográfica y me interesa reservar una expedición amazónica. ¿Podrían ayudarme?', '_blank')}
              className="bg-white hover:bg-gray-100 text-emerald font-semibold px-12 py-4 text-lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp: +593 99 065 7053
            </Button>
            <Button 
              size="lg" 
              onClick={() => window.open('mailto:jacobtangoy@gmail.com?subject=Consulta desde Galería Fotográfica', '_blank')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald font-semibold px-12 py-4 text-lg transition-all duration-300"
            >
              <Heart className="h-5 w-5 mr-2" />
              jacobtangoy@gmail.com
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}