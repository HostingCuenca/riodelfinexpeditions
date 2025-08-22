import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getNestedMessage, type Messages } from '@/lib/i18n';

interface BreadcrumbItem {
  key?: string;
  label?: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  messages: Messages;
  locale: string;
  className?: string;
}

export function Breadcrumbs({ items, messages, locale, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-turquoise transition-colors duration-300"
            >
              {item.key ? getNestedMessage(messages, `breadcrumbs.${item.key}`) : item.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">
              {item.key ? getNestedMessage(messages, `breadcrumbs.${item.key}`) : item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}