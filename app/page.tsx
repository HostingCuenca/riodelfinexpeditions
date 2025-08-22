import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

export default function RootPage() {
  // Server-side redirect to default locale
  redirect(`/${defaultLocale}`);
}