"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Clock, TrendingUp, MapPin } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/Badge';
import { RatingStars } from '@/components/RatingStars';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Pagination } from '@/components/Pagination';
import expeditionsData from '@/data/expeditions.json';

// Client component wrapper for the filters
function ExpeditionsContent({ messages, locale }: { messages: any, locale: Locale }) {
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSchedule, setSelectedSchedule] = useState('all');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('rating');

  const itemsPerPage = 6;

  const filteredExpeditions = useMemo(() => {
    let filtered = [...expeditionsData];

    if (selectedDuration !== 'all') {
      filtered = filtered.filter(exp => {
        if (selectedDuration === 'halfDay') return exp.duration[locale].includes('4') || exp.duration[locale].includes('3');
        if (selectedDuration === 'fullDay') return exp.duration[locale].includes('6') || exp.duration[locale].includes('8');
        if (selectedDuration === 'multiDay') return exp.duration[locale].includes('día') && !exp.duration[locale].includes('8') && !exp.duration[locale].includes('6');
        return true;
      });
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(exp => exp.difficulty === selectedDifficulty);
    }

    if (selectedSchedule !== 'all') {
      filtered = filtered.filter(exp => exp.schedule.includes(selectedSchedule));
    }

    if (selectedInterests.length > 0) {
      filtered = filtered.filter(exp => 
        selectedInterests.some(interest => exp.interests.includes(interest))
      );
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    }

    return filtered;
  }, [selectedDuration, selectedDifficulty, selectedSchedule, selectedInterests, sortBy, locale]);

  const totalPages = Math.ceil(filteredExpeditions.length / itemsPerPage);
  const currentExpeditions = filteredExpeditions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedDuration('all');
    setSelectedDifficulty('all');
    setSelectedSchedule('all');
    setSelectedInterests([]);
    setCurrentPage(1);
  };

  const breadcrumbItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'expeditions' }
  ];

  return (
    <div className="min-h-screen bg-bgSoft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs 
          items={breadcrumbItems}
          messages={messages}
          locale={locale}
          className="mb-8"
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-deepBlue flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-uiGray hover:text-turquoise"
                >
                  Reset
                </Button>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-deepBlue mb-3">
                  {getNestedMessage(messages, 'expeditions.filters.duration')}
                </h4>
                <div className="space-y-2">
                  {[
                    { key: 'all', label: getNestedMessage(messages, 'expeditions.filters.all') },
                    { key: 'halfDay', label: getNestedMessage(messages, 'expeditions.filters.halfDay') },
                    { key: 'fullDay', label: getNestedMessage(messages, 'expeditions.filters.fullDay') },
                    { key: 'multiDay', label: getNestedMessage(messages, 'expeditions.filters.multiDay') }
                  ].map((option) => (
                    <label key={option.key} className="flex items-center">
                      <input
                        type="radio"
                        name="duration"
                        value={option.key}
                        checked={selectedDuration === option.key}
                        onChange={(e) => {
                          setSelectedDuration(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="mr-2 text-turquoise"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-deepBlue mb-3">
                  {getNestedMessage(messages, 'expeditions.filters.difficulty')}
                </h4>
                <div className="space-y-2">
                  {[
                    { key: 'all', label: getNestedMessage(messages, 'expeditions.filters.all') },
                    { key: 'easy', label: getNestedMessage(messages, 'expeditions.filters.easy') },
                    { key: 'moderate', label: getNestedMessage(messages, 'expeditions.filters.moderate') },
                    { key: 'challenging', label: getNestedMessage(messages, 'expeditions.filters.challenging') }
                  ].map((option) => (
                    <label key={option.key} className="flex items-center">
                      <input
                        type="radio"
                        name="difficulty"
                        value={option.key}
                        checked={selectedDifficulty === option.key}
                        onChange={(e) => {
                          setSelectedDifficulty(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="mr-2 text-turquoise"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Interests Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-deepBlue mb-3">
                  {getNestedMessage(messages, 'expeditions.filters.interests')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'wildlife', label: getNestedMessage(messages, 'expeditions.filters.wildlife') },
                    { key: 'birdwatching', label: getNestedMessage(messages, 'expeditions.filters.birdwatching') },
                    { key: 'community', label: getNestedMessage(messages, 'expeditions.filters.community') },
                    { key: 'adventure', label: getNestedMessage(messages, 'expeditions.filters.adventure') }
                  ].map((interest) => (
                    <button
                      key={interest.key}
                      onClick={() => toggleInterest(interest.key)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors duration-300 ${
                        selectedInterests.includes(interest.key)
                          ? 'bg-turquoise text-white border-turquoise'
                          : 'bg-white text-uiGray border-gray-200 hover:border-turquoise'
                      }`}
                    >
                      {interest.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Sort & Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-uiGray">
                {filteredExpeditions.length} expeditions found
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-turquoise"
              >
                <option value="rating">Highest rated</option>
                <option value="price">Lowest price</option>
              </select>
            </div>

            {/* Expeditions Grid */}
            {currentExpeditions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-uiGray">
                  {getNestedMessage(messages, 'common.noResults')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {currentExpeditions.map((expedition) => (
                  <div key={expedition.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48">
                      <Image
                        src={expedition.image}
                        alt={expedition.title[locale]}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="success">
                          ${expedition.price}
                        </Badge>
                      </div>
                      {expedition.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="warning">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-deepBlue mb-2">
                        {expedition.title[locale]}
                      </h3>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-uiGray">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {expedition.duration[locale]}
                        </div>
                        <RatingStars 
                          rating={expedition.rating} 
                          size="sm" 
                          showNumber 
                          reviewCount={expedition.reviewCount}
                        />
                      </div>
                      
                      <p className="text-uiGray mb-4 line-clamp-2">
                        {expedition.description[locale]}
                      </p>
                      
                      <div className="flex items-center space-x-3 mb-4 text-sm">
                        <div className="flex items-center text-uiGray">
                          <MapPin className="h-4 w-4 mr-1" />
                          {expedition.departurePoint[locale]}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {expedition.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="outline" size="sm">
                            {getNestedMessage(messages, `expeditions.filters.${interest}`)}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-turquoise text-turquoise hover:bg-turquoise hover:text-white"
                      >
                        {getNestedMessage(messages, 'common.viewDetails')}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Server component wrapper
interface ExpeditionsPageProps {
  params: {
    locale: Locale;
  };
}

export default async function ExpeditionsPage({ params }: ExpeditionsPageProps) {
  const messages = await getMessages(params.locale);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=640&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-deepBlue/60" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {getNestedMessage(messages, 'expeditions.title')}
          </h1>
          <p className="text-xl text-gray-200">
            {getNestedMessage(messages, 'expeditions.subtitle')}
          </p>
        </div>
      </section>

      <ExpeditionsContent messages={messages} locale={params.locale} />
    </div>
  );
}