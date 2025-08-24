# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Dev server**: `npm run dev --turbopack` - Uses Turbopack for faster development builds
- **Build**: `npm run build --turbopack` - Production build with Turbopack optimization  
- **Start production**: `npm start` - Runs production build
- **Lint**: `npm run lint` - Runs ESLint with Next.js configuration

## Project Architecture

This is a Next.js 15 application built as a Progressive Web App (PWA) for a security monitoring system interface designed for film/TV production use.

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom design system
- **TypeScript**: Strict mode enabled
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Build Tool**: Turbopack for development and production builds

### Key Architecture Patterns

**App Router Structure**: Uses Next.js App Router with layout.tsx and page.tsx pattern. Main application entry is `app/page.tsx` with global layout in `app/layout.tsx`.

**Design System**: Custom dark theme security interface with specific color palette:
- Background: `#101828`, Surface: `#1D2939`, Text: white/gray variants
- Accent colors: Blue (`#2563eb`), Green (`#22c55e`), Red (`#ef4444`)
- Typography: Inter font family with defined text hierarchy

### Styling Approach
- Tailwind CSS with custom theme configuration
- Dark theme by default with CSS custom properties
- Component-level styling with utility classes

### File Organization
- `app/` - Next.js app directory with pages and layouts  
- `public/` - Static assets (images, icons, videos)
- `context/` - Project documentation and design specifications
- Configuration files use modern ES modules syntax

### Development Notes
- Uses strict TypeScript configuration with path aliases (`@/*`)
- ESLint configured with Next.js core-web-vitals and TypeScript rules
- PostCSS configured for Tailwind CSS processing
- Turbopack enabled for faster development and build times

## Digital Props Goals (Film/TV)

- Produce believable **fake UIs** for movie productions. 
- **Offline + deterministic** playback for shoot day (no network, no time drift).
- **Zero-friction handoff**: single URL (Netlify) and local fallback.

## Context

`context/*` is read-only. Do not modify. 
- In this folder there will be files with describing names that you can use to get more context about the manuscript i.e. understand the scenes better so you can create better UI's. There will also be pure design inspiration there.


## UI Components
Rules:
- Use Tailwind tokens (no inline styles). Keep variants minimal.
- Ensure contrast and font size are readable on a monitor/camera.

## Offline Requirements

- Assume **airplane mode**.
- No env secrets needed for playback.
- Use static flags in `lib/scheduling/flags.ts` for feature gating.


## Delivery

- Preferred: Netlify deploy for remote review.
- Local fallback: static export (`out/`) or standalone (`.next/standalone`) + `public/`.
- Goal: team should click once and play.

## Do Not Touch

- Do not edit `context/*` sources or original `public/media/*` assets.
- Do not change Tailwind tokens without explicit instruction.
- Do not introduce runtime network dependencies for scene playback.


- plan.md är ett levande dokument som jag vill att du ska hålla uppdaterad när du implementerar nya sker