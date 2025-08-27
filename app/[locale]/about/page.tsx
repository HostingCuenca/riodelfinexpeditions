import Image from 'next/image';
import { Award, Users, Leaf, Heart, Clock, MapPin, Star, TreePine } from 'lucide-react';
import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AboutPageProps {
  params: {
    locale: Locale;
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const messages = await getMessages(params.locale);

  const milestones = [
    {
      year: '2008',
      title: getNestedMessage(messages, 'about.timeline.2008.title'),
      description: getNestedMessage(messages, 'about.timeline.2008.description'),
      icon: <TreePine className="h-6 w-6" />
    },
    {
      year: '2012',
      title: getNestedMessage(messages, 'about.timeline.2012.title'),
      description: getNestedMessage(messages, 'about.timeline.2012.description'),
      icon: <Users className="h-6 w-6" />
    },
    {
      year: '2018',
      title: getNestedMessage(messages, 'about.timeline.2018.title'),
      description: getNestedMessage(messages, 'about.timeline.2018.description'),
      icon: <Award className="h-6 w-6" />
    },
    {
      year: '2024',
      title: getNestedMessage(messages, 'about.timeline.2024.title'),
      description: getNestedMessage(messages, 'about.timeline.2024.description'),
      icon: <Star className="h-6 w-6" />
    }
  ];

  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: getNestedMessage(messages, 'about.values.conservation.title'),
      description: getNestedMessage(messages, 'about.values.conservation.description')
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: getNestedMessage(messages, 'about.values.community.title'),
      description: getNestedMessage(messages, 'about.values.community.description')
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: getNestedMessage(messages, 'about.values.authenticity.title'),
      description: getNestedMessage(messages, 'about.values.authenticity.description')
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: getNestedMessage(messages, 'about.values.excellence.title'),
      description: getNestedMessage(messages, 'about.values.excellence.description')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/1JacobTangoy.jpeg"
          alt="About Río Delfín Lodge"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <Badge className="bg-emerald text-white mb-4">
              {getNestedMessage(messages, 'about.hero.badge')}
            </Badge>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              {getNestedMessage(messages, 'about.hero.title')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {getNestedMessage(messages, 'about.hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-deepBlue mb-6">
                {getNestedMessage(messages, 'about.story.title')}
              </h2>
              <div className="space-y-4 text-darkGray leading-relaxed">
                <p>{getNestedMessage(messages, 'about.story.paragraph1')}</p>
                <p>{getNestedMessage(messages, 'about.story.paragraph2')}</p>
                <p>{getNestedMessage(messages, 'about.story.paragraph3')}</p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-emerald/10 rounded-xl">
                  <div className="text-3xl font-bold text-emerald mb-2">15+</div>
                  <div className="text-sm text-darkGray">{getNestedMessage(messages, 'about.stats.experience')}</div>
                </div>
                <div className="text-center p-4 bg-deepBlue/10 rounded-xl">
                  <div className="text-3xl font-bold text-deepBlue mb-2">2000+</div>
                  <div className="text-sm text-darkGray">{getNestedMessage(messages, 'about.stats.guests')}</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/1vistahermosa.jpeg"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-emerald" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-deepBlue">4.9</div>
                    <div className="text-sm text-darkGray">{getNestedMessage(messages, 'about.stats.rating')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-lightGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'about.timeline.title')}
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              {getNestedMessage(messages, 'about.timeline.subtitle')}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 bg-emerald/30 h-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center text-emerald">
                          {milestone.icon}
                        </div>
                        <div className="text-2xl font-bold text-emerald">{milestone.year}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-deepBlue mb-3">{milestone.title}</h3>
                      <p className="text-darkGray leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-full lg:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'about.values.title')}
            </h2>
            <p className="text-xl text-darkGray max-w-3xl mx-auto">
              {getNestedMessage(messages, 'about.values.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-lightGray p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-emerald/10 rounded-full flex items-center justify-center mb-6 text-emerald group-hover:bg-emerald group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-deepBlue mb-4">{value.title}</h3>
                <p className="text-darkGray leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Jacob Section */}
      <section className="py-16 bg-gradient-to-br from-emerald/5 to-amazonGreen/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/1JacobTangoy.jpeg"
                  alt="Jacob Tangoy - Founder & Guide"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-emerald text-white">
                    {getNestedMessage(messages, 'about.jacob.badge')}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-deepBlue mb-6">
                {getNestedMessage(messages, 'about.jacob.title')}
              </h2>
              <div className="space-y-4 text-darkGray leading-relaxed">
                <p>{getNestedMessage(messages, 'about.jacob.bio1')}</p>
                <p>{getNestedMessage(messages, 'about.jacob.bio2')}</p>
                <p>{getNestedMessage(messages, 'about.jacob.bio3')}</p>
              </div>
              
              <div className="mt-8 flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald">15+</div>
                  <div className="text-sm text-darkGray">{getNestedMessage(messages, 'about.jacob.years')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald">500+</div>
                  <div className="text-sm text-darkGray">{getNestedMessage(messages, 'about.jacob.expeditions')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald">98%</div>
                  <div className="text-sm text-darkGray">{getNestedMessage(messages, 'about.jacob.satisfaction')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Access */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-deepBlue mb-4">
              {getNestedMessage(messages, 'about.location.title')}
            </h2>
            <p className="text-xl text-darkGray">
              {getNestedMessage(messages, 'about.location.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-emerald" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-deepBlue mb-2">
                    {getNestedMessage(messages, 'about.location.accessibility.title')}
                  </h3>
                  <p className="text-darkGray">{getNestedMessage(messages, 'about.location.accessibility.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-emerald" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-deepBlue mb-2">
                    {getNestedMessage(messages, 'about.location.duration.title')}
                  </h3>
                  <p className="text-darkGray">{getNestedMessage(messages, 'about.location.duration.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <TreePine className="h-6 w-6 text-emerald" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-deepBlue mb-2">
                    {getNestedMessage(messages, 'about.location.setting.title')}
                  </h3>
                  <p className="text-darkGray">{getNestedMessage(messages, 'about.location.setting.description')}</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/1rio.jpeg"
                alt="Lodge Location"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-lg font-semibold">Yasuní National Park</div>
                <div className="text-sm text-gray-200">Ecuador Amazon</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-deepBlue to-navyBlue text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            {getNestedMessage(messages, 'about.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            {getNestedMessage(messages, 'about.cta.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-warmOrange hover:bg-sunsetOrange text-white font-semibold px-8 py-4">
              {getNestedMessage(messages, 'about.cta.book')}
            </Button>
            <Button size="lg" variant="outline" className="border-emerald text-emerald hover:bg-emerald hover:text-white font-semibold px-8 py-4">
              {getNestedMessage(messages, 'about.cta.contact')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}