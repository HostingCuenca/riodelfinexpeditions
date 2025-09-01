# 🧑‍💻 Developer Documentation - Río Delfín Lodge

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Internationalization (i18n)](#internationalization-i18n)
- [Data Management](#data-management)
- [Component Guidelines](#component-guidelines)
- [Styling System](#styling-system)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## 🏗️ Architecture Overview

This is a **Next.js 13** static website using the **App Router** pattern with **TypeScript** and **Tailwind CSS**. The site is configured for static export (`output: 'export'`) to enable deployment on any static hosting service.

### Tech Stack
- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3 + shadcn/ui components
- **Icons**: Lucide React
- **Deployment**: Static export (compatible with Vercel, Netlify, etc.)

### Key Features
- 🌍 Bilingual support (Spanish/English)
- 📱 Fully responsive design
- ♿ WCAG AA accessibility compliance
- 🚀 Static site generation for optimal performance
- 📊 Component-based architecture with shadcn/ui

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd project-3

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Development server (localhost:3500)
npm run build        # Production build with static export
npm run start        # Serve production build locally
npm run lint         # Run ESLint (currently disabled in builds)
```

## 📂 Project Structure

```
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Dynamic locale routing
│   │   ├── layout.tsx           # Locale-specific layout
│   │   ├── page.tsx             # Homepage
│   │   ├── cabins/              # Cabin-related pages
│   │   ├── expeditions/         # Expedition pages
│   │   ├── contact/             # Contact page
│   │   └── ...                  # Other pages
│   ├── globals.css              # Global styles + Tailwind
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Root redirect to default locale
├── components/                   # React components
│   ├── ui/                      # shadcn/ui base components
│   ├── Navbar.tsx               # Main navigation
│   ├── Footer.tsx               # Site footer
│   ├── Hero.tsx                 # Hero sections
│   └── ...                      # Other custom components
├── data/                         # Static data (JSON)
│   ├── cabins.json              # Lodge cabin information
│   ├── expeditions.json         # Tour packages
│   ├── reviews.json             # Customer reviews
│   ├── settings.json            # Site configuration
│   └── gallery.json             # Photo gallery data
├── lib/                          # Utility functions
│   ├── i18n.ts                  # Internationalization utilities
│   ├── utils.ts                 # General utilities (cn, etc.)
│   └── seo.ts                   # SEO helpers
├── messages/                     # Translation files
│   ├── es.json                  # Spanish translations
│   └── en.json                  # English translations
├── public/                       # Static assets
│   ├── assets/                  # Images and media
│   └── favicon.ico              # Site favicon
└── CLAUDE.md                     # Project instructions for AI
```

## 🌍 Internationalization (i18n)

### How it works
The site uses a file-based routing approach with dynamic `[locale]` segments:

- **Supported locales**: `es` (Spanish), `en` (English)
- **Default locale**: Spanish (`es`)
- **Translation files**: `messages/es.json`, `messages/en.json`

### Adding new translations

1. **Add to translation files**:
```json
// messages/es.json
{
  "nav": {
    "newItem": "Nuevo Item"
  }
}

// messages/en.json  
{
  "nav": {
    "newItem": "New Item"
  }
}
```

2. **Use in components**:
```tsx
import { getNestedMessage } from '@/lib/i18n';

// In your component
const translatedText = getNestedMessage(messages, 'nav.newItem');
```

### Key i18n utilities

| Function | Description | Usage |
|----------|-------------|-------|
| `getMessages(locale)` | Load translations for locale | `await getMessages('es')` |
| `getNestedMessage(messages, key)` | Get nested translation | `getNestedMessage(messages, 'nav.home')` |
| `isValidLocale(locale)` | Validate locale string | `isValidLocale('es') // true` |
| `getAlternateLocale(locale)` | Get opposite locale | `getAlternateLocale('es') // 'en'` |

## 📊 Data Management

All content is stored in JSON files in the `/data/` directory. This approach provides:
- ✅ Version control for content
- ✅ Type safety with TypeScript interfaces
- ✅ Easy bulk updates
- ✅ Separation of content from code

### Data Structure Example

```typescript
// cabins.json structure
interface Cabin {
  slug: string;
  title: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  images: string[];
  capacity: number;
  amenities: {
    es: string[];
    en: string[];
  };
  featured: boolean;
  lodge: string;
}
```

### Adding new data

1. Update the appropriate JSON file in `/data/`
2. Ensure all required multilingual fields have both `es` and `en` properties
3. Test both language variants
4. Update TypeScript interfaces if needed

## 🧩 Component Guidelines

### Component Types

1. **UI Components** (`components/ui/`): Base shadcn/ui components
2. **Layout Components**: Navbar, Footer, Hero, etc.
3. **Feature Components**: Specific business logic components
4. **Page Components**: Full page implementations

### Component Best Practices

```tsx
// ✅ Good component structure
interface MyComponentProps {
  messages: Messages;
  locale: string;
  className?: string;
}

export function MyComponent({ messages, locale, className }: MyComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      <h1>{getNestedMessage(messages, 'component.title')}</h1>
    </div>
  );
}
```

### Key Patterns
- Always pass `messages` and `locale` props for i18n
- Use `cn()` utility for conditional classes
- Implement proper TypeScript interfaces
- Follow mobile-first responsive design
- Use semantic HTML elements

## 🎨 Styling System

### Tailwind Configuration

The project uses a custom Tailwind configuration with lodge-specific colors:

```typescript
// Key brand colors
colors: {
  deepBlue: '#0A2E47',      // Primary brand color
  turquoise: '#34C6D3',     // Accent color  
  jungle: '#0F5E3A',        // Nature green
  bgSoft: '#F5F7FA',        // Background
  // ... 20+ additional colors
}
```

### Custom Utilities

```css
/* Mobile-optimized utilities */
.touch-target { @apply min-h-[44px] min-w-[44px]; }
.touch-target-large { @apply min-h-[48px] min-w-[48px]; }

/* Responsive text sizing */
.text-responsive-sm { @apply text-sm sm:text-base; }

/* Safe viewport height for mobile */
.h-screen-safe { height: 100vh; height: 100dvh; }
```

### Component Styling Guidelines
- Use Tailwind classes primarily
- Custom CSS only for complex animations
- Mobile-first approach (`sm:`, `md:`, `lg:` breakpoints)
- Ensure minimum touch target sizes (44px)
- Test on various screen sizes

## 🚀 Deployment

### Build Process

```bash
# 1. Install dependencies
npm install

# 2. Build for production
npm run build

# 3. Deploy the 'out' folder
```

### Static Export Configuration

The site is configured for static export in `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',                    // Enable static export
  images: { unoptimized: true },       // Required for static export
  trailingSlash: true,                 // Add trailing slashes to URLs
  poweredByHeader: false,              // Remove X-Powered-By header
};
```

### Deployment Targets
- ✅ **Vercel**: `vercel --prod`
- ✅ **Netlify**: Deploy `out/` folder
- ✅ **GitHub Pages**: Deploy `out/` folder
- ✅ **AWS S3**: Upload `out/` contents
- ✅ **Any static host**: Serve `out/` directory

### Important Notes
- All routes are pre-generated at build time
- No server-side features available (API routes, middleware)
- Images must be optimized manually or via CDN
- Remember to include both `app/favicon.ico` and `public/favicon.ico`

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Failures
**Problem**: TypeScript or ESLint errors during build
**Solution**: Currently disabled in `next.config.js`, but consider enabling:
```javascript
// Remove these lines for stricter builds
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true },
```

#### 2. Missing Translations
**Problem**: Key returns instead of translated text
**Solution**: Check that the key exists in both `es.json` and `en.json`:
```typescript
// Debug missing translations
console.log('Available keys:', Object.keys(messages));
```

#### 3. Static Generation Failures
**Problem**: Pages not generating for all locales/slugs
**Solution**: Verify `generateStaticParams()` in dynamic routes:
```typescript
export function generateStaticParams() {
  return [
    { locale: 'es', slug: 'cabin-1' },
    { locale: 'en', slug: 'cabin-1' },
    // ... all combinations
  ];
}
```

#### 4. Image Loading Issues
**Problem**: Images not loading in production
**Solution**: 
- Check image paths are relative to `/public/`
- Verify images exist in build output
- Consider using absolute URLs for external images

### Debug Mode
Enable debug logging by adding environment variable:
```bash
# Development
NEXT_PUBLIC_DEBUG=true npm run dev
```

### Performance Issues
- Use Next.js Bundle Analyzer: `npm install @next/bundle-analyzer`
- Check for unused dependencies
- Optimize images before deployment
- Consider implementing lazy loading for galleries

---

## 📞 Support

For technical questions about this codebase:
- Check existing issues and documentation
- Review component implementations in `/components/`
- Test changes in both languages (`/es/` and `/en/`)
- Ensure responsive design across device sizes

Remember: This is a static site optimized for performance and SEO in the eco-tourism domain. Always test builds locally before deployment and maintain the bilingual nature of all user-facing content.