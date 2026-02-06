# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Estates by Sapna is a Dubai real estate website built from a Figma design template. It's a frontend-only React application with static property data (no backend).

## Development Commands

```bash
npm i           # Install dependencies
npm run dev     # Start Vite development server
npm run build   # Production build
```

## Architecture

### Tech Stack
- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router v7** with `createBrowserRouter`
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- **shadcn/ui** components built on Radix UI primitives

### Directory Structure

```
src/
├── main.tsx                    # React DOM entry point
├── styles/
│   ├── index.css               # Main stylesheet (imports all)
│   └── theme.css               # Design tokens and CSS variables
├── app/
│   ├── App.tsx                 # RouterProvider wrapper
│   ├── routes.ts               # Route definitions
│   ├── data/
│   │   └── properties.ts       # Static property data + Property interface
│   ├── pages/                  # Page components (home, properties, property-detail, about, contact, not-found)
│   └── components/
│       ├── layout/             # RootLayout, Navigation, Footer, WhatsApp button
│       ├── home/               # Home page section components
│       ├── property/           # Property-related components (cards, filters, gallery, etc.)
│       └── ui/                 # shadcn/ui components (~50 files)
```

### Routing

Routes defined in `src/app/routes.ts`:
- `/` - Home page
- `/properties` - Property listings with filters
- `/property/:id` - Property detail page
- `/about` - About page
- `/contact` - Contact page

All routes wrapped in `RootLayout` which provides Navigation, Footer, and floating WhatsApp button.

### Path Alias

Use `@/` to reference the `src` directory (configured in `vite.config.ts`):
```typescript
import { Button } from '@/app/components/ui/button';
```

## Design System

### Theme Colors (defined in `src/styles/theme.css`)

| Variable | Value | Usage |
|----------|-------|-------|
| `--navy` | `#1a2332` | Primary dark color, used as `--primary` |
| `--gold` | `#d4af37` | Accent color, used as `--accent` |
| `--light-gray` | `#f5f5f5` | Secondary backgrounds |

### Typography

- Headings: `'Playfair Display', serif` (`--font-heading`)
- Body text: `'Inter', sans-serif` (`--font-body`)

### Component Patterns

- UI components use **class-variance-authority (CVA)** for variant styling
- Use `cn()` utility from `@/app/components/ui/utils` for merging Tailwind classes
- Components are mobile-first with responsive Tailwind breakpoints (sm, md, lg, xl)

## Key Patterns

### Static Data
Property data lives in `src/app/data/properties.ts`. The `Property` interface defines the data shape used throughout the app. All filtering/sorting happens client-side.

### Forms
Forms use `react-hook-form`. Contact and inquiry forms are in the property components.

### State Management
Local `useState` only - no global state library. URL search params used for filter persistence on the properties page.
