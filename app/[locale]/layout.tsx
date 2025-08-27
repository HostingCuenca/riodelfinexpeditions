import { notFound } from 'next/navigation';
import { getMessages, isValidLocale, type Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import WebsiteBadge from '@/components/WebsiteBadge';

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  if (!isValidLocale(params.locale)) {
    notFound();
  }

  const messages = await getMessages(params.locale as Locale);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar messages={messages} />
      <main className="flex-1">
        {children}
      </main>
      <Footer messages={messages} />
      <FloatingWhatsApp locale={params.locale as Locale} />
      <WebsiteBadge />
    </div>
  );
}