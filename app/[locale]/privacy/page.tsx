import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';

interface PrivacyPageProps {
  params: {
    locale: Locale;
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const messages = await getMessages(params.locale);

  return (
    <div className="min-h-screen bg-bgSoft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-deepBlue mb-8">
            {params.locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-gray-700">
              {params.locale === 'es' 
                ? 'En Río Delfín Expediciones, valoramos y protegemos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestros servicios.'
                : 'At Río Delfín Expediciones, we value and protect your privacy. This policy describes how we collect, use, and protect your personal information when you use our services.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Información que Recopilamos' : 'Information We Collect'}
            </h2>
            <p className="mb-4 text-gray-700">
              {params.locale === 'es'
                ? 'Recopilamos información que nos proporcionas directamente, como tu nombre, email, teléfono y preferencias de viaje cuando realizas una reserva o consulta.'
                : 'We collect information you provide directly to us, such as your name, email, phone number, and travel preferences when you make a booking or inquiry.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Uso de la Información' : 'Use of Information'}
            </h2>
            <p className="mb-4 text-gray-700">
              {params.locale === 'es'
                ? 'Utilizamos tu información para procesar reservas, comunicarnos contigo sobre tu viaje, y mejorar nuestros servicios. No compartimos tu información personal con terceros sin tu consentimiento.'
                : 'We use your information to process bookings, communicate with you about your trip, and improve our services. We do not share your personal information with third parties without your consent.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Contacto' : 'Contact'}
            </h2>
            <p className="mb-8 text-gray-700">
              {params.locale === 'es'
                ? 'Si tienes preguntas sobre esta política de privacidad, contáctanos a través de WhatsApp +593 99 065 7053.'
                : 'If you have questions about this privacy policy, contact us via WhatsApp +593 99 065 7053.'
              }
            </p>
          </div>

          {/* Developer Credit */}
          <div className="border-t border-gray-200 pt-8 mt-12">
            <div className="text-center">
              <p className="text-sm text-gray-500">
                {params.locale === 'es' 
                  ? 'Sitio web desarrollado y diseñado por'
                  : 'Website developed and designed by'
                }
                {' '}
                <a 
                  href="https://torisoftt.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald hover:text-amazonGreen font-semibold transition-colors duration-300"
                >
                  Torisoftt
                </a>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {params.locale === 'es' 
                  ? 'Soluciones digitales para empresas turísticas'
                  : 'Digital solutions for tourism companies'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}