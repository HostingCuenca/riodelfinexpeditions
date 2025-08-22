# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13 static website for **Río Delfín Lodge**, an eco-lodge in the Ecuadorian Amazon. The site showcases cabins, expeditions, and lodge information with bilingual support (Spanish/English).

## Development Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production (static export)
npm start           # Serve production build
npm run lint        # Run ESLint
```

## Architecture Overview

### Next.js Configuration
- **Static Export**: `output: 'export'` in next.config.js for hosting without server
- **Image Optimization**: Disabled (`unoptimized: true`) for static export compatibility
- **ESLint**: Ignored during builds to prevent deployment failures

### Internationalization (i18n)
- **File-based routing**: Uses `app/[locale]/` dynamic route pattern
- **Supported locales**: `es` (Spanish, default), `en` (English)
- **Message files**: `messages/es.json`, `messages/en.json`
- **i18n utilities**: `lib/i18n.ts` provides locale management and message retrieval
- **Root redirect**: `app/page.tsx` redirects to default locale using server-side `redirect()`

### Data Architecture
All content is stored in JSON files in `/data/`:
- `cabins.json`: Lodge cabin information with multilingual content
- `expeditions.json`: Available tours and experiences
- `settings.json`: Site configuration and partner lodge information
- `reviews.json`: Guest testimonials
- `gallery.json`: Photo gallery data

### UI System
- **Framework**: Tailwind CSS with custom color palette for lodge branding
- **Components**: shadcn/ui base components in `components/ui/`
- **Brand Colors**: 
  - `deepBlue`: #0B3A5B (primary)
  - `turquoise`: #34C6D3 (accent)
  - `jungle`: #0F5E3A (nature)
  - `bgSoft`: #F5F7FA (background)

### Route Structure
```
/                    → Redirects to /es
/[locale]            → Homepage (Spanish/English)
/[locale]/cabins     → Cabin listing
/[locale]/cabins/[slug] → Individual cabin details
/[locale]/expeditions → Expedition listing  
/[locale]/contact    → Contact information
```

## Key Implementation Details

### Static Generation
- **Dynamic routes** require `generateStaticParams()` exports for static build
- **Cabin detail pages** generate params for all cabin slugs × all locales
- **Locale validation** happens in layout.tsx using `isValidLocale()`

### Content Management
- **Multilingual content**: All user-facing text uses nested message keys (e.g., `home.about.title`)
- **Featured content**: Uses `featured: true` flags in data files
- **Image URLs**: External images from Unsplash for cabin/expedition photos

### Component Patterns
- **Server components**: Pages use async functions to load messages
- **Message retrieval**: Use `getNestedMessage(messages, 'key.path')` for translations
- **Locale switching**: `LocaleSwitcher` component handles language toggling
- **Responsive design**: Mobile-first approach with Tailwind breakpoints

## Static Export Considerations

- **No server-side features**: API routes, middleware, or dynamic features at runtime
- **Image optimization**: Must use `unoptimized: true` for Next.js Image components
- **Routing**: Client-side navigation works, but initial loads must be static files
- **Favicon handling**: Must be placed in both `app/favicon.ico` and `public/favicon.ico`

## Development Notes

When adding new pages:
1. Create the page component in appropriate `app/[locale]/` directory
2. Add required translations to `messages/es.json` and `messages/en.json`
3. Add `generateStaticParams()` if the route uses dynamic segments
4. Update navigation in `components/Navbar.tsx` if needed

When modifying data:
1. Update relevant JSON files in `/data/` directory
2. Ensure all multilingual fields have both `es` and `en` properties
3. Test both language variants of the site