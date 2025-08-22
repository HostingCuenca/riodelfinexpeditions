"use client";

import { useParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function LocaleSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = params.locale as string;

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('es')}
        className={`text-xs px-2 py-1 ${
          locale === 'es' 
            ? 'text-turquoise bg-white/10' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        ES
      </Button>
      <span className="text-white/30">|</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('en')}
        className={`text-xs px-2 py-1 ${
          locale === 'en' 
            ? 'text-turquoise bg-white/10' 
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </Button>
    </div>
  );
}