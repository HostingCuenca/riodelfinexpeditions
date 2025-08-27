import { getMessages, getNestedMessage, type Locale } from '@/lib/i18n';

interface TermsPageProps {
  params: {
    locale: Locale;
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const messages = await getMessages(params.locale);

  return (
    <div className="min-h-screen bg-bgSoft">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-deepBlue mb-8">
            {params.locale === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 text-gray-700">
              {params.locale === 'es' 
                ? 'Bienvenido a Río Delfín Expediciones. Al utilizar nuestros servicios, aceptas estos términos y condiciones.'
                : 'Welcome to Río Delfín Expediciones. By using our services, you agree to these terms and conditions.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Reservas y Pagos' : 'Bookings and Payments'}
            </h2>
            <p className="mb-4 text-gray-700">
              {params.locale === 'es'
                ? 'Las reservas se confirman mediante pago de depósito. Los precios pueden variar según la temporada y disponibilidad. Cancelaciones con más de 48 horas de anticipación tienen reembolso completo.'
                : 'Bookings are confirmed with deposit payment. Prices may vary by season and availability. Cancellations with more than 48 hours notice receive full refund.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Responsabilidades' : 'Responsibilities'}
            </h2>
            <p className="mb-4 text-gray-700">
              {params.locale === 'es'
                ? 'Los huéspedes son responsables de su seguridad y deben seguir las instrucciones del guía. Río Delfín Expediciones no se hace responsable por accidentes debido a negligencia del huésped.'
                : 'Guests are responsible for their safety and must follow guide instructions. Río Delfín Expediciones is not responsible for accidents due to guest negligence.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Equipaje y Pertenencias' : 'Luggage and Belongings'}
            </h2>
            <p className="mb-4 text-gray-700">
              {params.locale === 'es'
                ? 'Recomendamos equipaje liviano y resistente al agua. No nos hacemos responsables por pérdida o daño de pertenencias personales.'
                : 'We recommend lightweight and water-resistant luggage. We are not responsible for loss or damage to personal belongings.'
              }
            </p>

            <h2 className="text-xl font-semibold text-deepBlue mt-8 mb-4">
              {params.locale === 'es' ? 'Contacto' : 'Contact'}
            </h2>
            <p className="mb-8 text-gray-700">
              {params.locale === 'es'
                ? 'Para preguntas sobre estos términos, contáctanos por WhatsApp +593 99 065 7053.'
                : 'For questions about these terms, contact us via WhatsApp +593 99 065 7053.'
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