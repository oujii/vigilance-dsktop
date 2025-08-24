# DESIGN.md

## Overview

Vigilance Mobile is a Next.js-based security monitoring application designed as a Progressive Web App (PWA) for film/TV production use. The app simulates a professional home security system interface with dark theme aesthetics optimized for camera visibility.

## Color Palette

### Primary Colors
- **Background Dark**: `#101828` - Main app background
- **Surface Dark**: `#1D2939` - Cards, panels, navigation
- **Surface Lighter**: `#374151` (gray-700) - Secondary surfaces

### Text Colors
- **Primary Text**: `#ffffff` - Main headings, active text
- **Secondary Text**: `#d1d5db` (gray-300) - Subtext, descriptions
- **Tertiary Text**: `#9ca3af` (gray-400) - Inactive states, placeholders
- **Disabled Text**: `#6b7280` (gray-500) - Offline users, disabled elements

### Accent Colors
- **Primary Blue**: `#2563eb` (blue-600) - Active buttons, primary CTA
- **Blue Hover**: `#1d4ed8` (blue-700) - Button hover states
- **Green Status**: `#22c55e` (green-500) - Online indicators, success states
- **Red Alert**: `#ef4444` (red-500) - Recording indicators, alerts
- **Blue Active**: `#3b82f6` (blue-500) - Active navigation, selected states

## Typography

### Font Stack
- **Primary Font**: Inter via Google Fonts
- **CSS Variable**: `--font-inter`
- **Fallback**: `sans-serif`
- **Font Loading**: Optimized with `next/font/google`

### Text Hierarchy
- **App Title/Logo**: Handled via image assets
- **Page Headers**: `text-lg font-semibold` (18px, 600 weight)
- **Section Headers**: `text-sm font-semibold` (14px, 600 weight)
- **Body Text**: `text-sm` (14px, normal weight)
- **Caption Text**: `text-xs` (12px, normal weight)
- **Status Text**: `text-xs` with color variants for different states

## Layout Structure

### App Layout
```
<html>
  <body class="${inter.variable} font-inter antialiased">
    {/* Page content */}
  </body>
</html>
```

### Page Structure
```
<div class="bg-[#101828] text-white min-h-screen flex flex-col">
  <header><!-- App header --></header>
  <main class="flex-grow overflow-y-auto no-scrollbar">
    <!-- Page content -->
  </main>
  <footer><!-- Bottom navigation --></footer>
</div>
```

## Components

### 1. App Header (`app/dashboard/page.tsx:60-86`)
- **Container**: `px-4 pt-4 pb-4`
- **Layout**: Flex layout with space-between alignment
- **Logo**: Clickable Vigilance logo (120×24px)
- **Icons**: Bell and plus icons with gray-400 color

### 2. Navigation Tabs (`app/dashboard/page.tsx:91-105`)
- **Container**: Flex layout with space-x-6
- **Border**: Bottom border with gray-700
- **Active State**: Blue-500 bottom border, white text, font-semibold
- **Inactive State**: Gray-400 text
- **Tabs**: ['Favorites', 'Security', 'Care', 'Lights']

### 3. Home Selection Bar (`app/dashboard/page.tsx:108-124`)
- **Background**: `bg-[#1D2939]` with rounded-lg corners
- **Padding**: `p-2`
- **Home Icon**: 32×32px circular image
- **Text**: "Wander001 home" with dropdown chevron
- **Layout**: Flex with space-between alignment

### 4. System Status Dashboard (`app/dashboard/page.tsx:127-194`)
- **Container**: `bg-[#1D2939] rounded-2xl p-4`
- **Stats Section**: Three-column flex layout with text-center
  - **Active Cameras**: "8 / 14" format
  - **System Health**: "99.8%" percentage
  - **Storage**: "85%" percentage
- **User Status**: Two user cards with online/offline indicators
  - **Online User**: Green dot indicator, "Online" text
  - **Offline User**: Gray dot, opacity-50 avatar, "Offline" text

### 5. Camera Feed Component (`components/CameraFeed.tsx`)

#### Container Structure
```jsx
<div class="relative rounded-2xl overflow-hidden mb-4 group">
  {/* Loading state */}
  {/* Video element */}
  {/* Gradient overlay */}
  {/* Feed info */}
  {/* Controls */}
  {/* Offline overlay */}
</div>
```

#### Video Element
- **Dimensions**: `w-full h-48`
- **Behavior**: autoPlay, muted, loop, playsInline
- **Active State**: `opacity-100`
- **Inactive State**: `opacity-50`

#### Feed Information Overlay
- **Position**: `absolute bottom-3 left-3`
- **Camera Name**: `font-semibold text-sm`
- **Model**: `text-xs text-gray-300 opacity-80`
- **Status Indicators**:
  - Signal icon (radio waves SVG)
  - Live/Offline status with colored dots
  - Signal strength bars (3 bars, green-400/gray-500)

#### Hover Controls
- **Position**: `absolute bottom-3 right-3`
- **Visibility**: `opacity-0 group-hover:opacity-100`
- **Buttons**: Record (red pulsing dot), Alert count, More options
- **Style**: `bg-black/50 rounded-full h-8 w-8`

### 6. Bottom Navigation (`app/dashboard/page.tsx:211-229`)
- **Container**: `bg-[#1D2939] px-4 py-2 pb-8 sticky bottom-0`
- **Layout**: Flex with justify-around
- **Icons**: 28×28px with conditional styling
  - **Active**: `text-blue-500` with brightness/invert filters
  - **Inactive**: `opacity-60 brightness-0 invert`
- **Items**: ['Home', 'Events', 'Services', 'Settings']

## Authentication Flow

### Login Page (`app/login/page.tsx`)

#### Invite Message State
- **Background**: `bg-[#101828]` full screen
- **Card**: `bg-[#1D2939] rounded-2xl p-6 max-w-sm`
- **Logo**: 160×32px Vigilance logo
- **Message**: Invitation text with user profile card
- **Duration**: 2-second display before transitioning

#### Sign-In State
- **Layout**: Three-section vertical layout (header space, content, footer)
- **Logo Section**: Centered with "Security System" subtitle
- **Sign-In Card**: `bg-[#1D2939] rounded-2xl p-4`
- **User Profile**: Profile image with "Saved" indicator
- **CTA Button**: `bg-blue-600 hover:bg-blue-700` with loading state
- **Alternative**: Link for different account sign-in

## Interactive States

### Loading States
- **General Loading**: Gray-700 background with pulse animation
- **Button Loading**: Spinner with "Signing in..." text
- **Video Loading**: "Loading feed..." text with pulse

### Hover States
- **Buttons**: Opacity transitions, color changes
- **Camera Controls**: Opacity 0 to 100 on group hover
- **Logo**: Opacity-80 transition

### Active States
- **Navigation Tabs**: Blue-500 border, white text, bold weight
- **Bottom Nav**: Blue-500 text color with filter effects
- **User Status**: Green dot for online, gray for offline

## Responsive Design

### Mobile-First Approach
- **Base Design**: Optimized for mobile screens
- **Padding**: Consistent `px-4` horizontal padding
- **Touch Targets**: Minimum 44px for interactive elements
- **Scrolling**: Custom scrollbar hiding with `no-scrollbar` class

### Viewport Configuration
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

## Progressive Web App Features

### PWA Manifest
- **Theme Color**: `#101828` (matches app background)
- **Icons**: Multiple sizes (192×192, 512×512, 152×152)
- **App Title**: "Vigilance Security"
- **Capabilities**: Full-screen mobile web app

### Apple Web App Integration
- **Status Bar**: Black-translucent style
- **Capable**: Full native-like experience
- **Icons**: Optimized for iOS home screen

## Animation and Transitions

### Micro-Interactions
- **Loading Spinners**: CSS keyframe rotation
- **Pulse Effects**: Recording indicator, loading states
- **Hover Transitions**: 0.2-0.3s ease timing
- **Opacity Fades**: Group hover reveals, state changes

### Video Playback
- **Autoplay**: Immediate start for camera feeds
- **Loop**: Continuous playback for demo purposes
- **Muted**: Prevents audio interference during filming

## Asset Management

### Image Assets
- **Logo**: `/logoi.png` (multiple sizes: 120×24, 160×32, 180×36)
- **User Avatars**: `/user.png`, `/carl-icon.png`
- **Navigation Icons**: Individual PNG files for each nav item
- **Status Indicators**: `/offline.png` for offline states
- **Home Icon**: `/homename.png` for home selection

### Video Assets
- **Camera Feeds**: `/0823.mp4`, `/0824.mp4`
- **Fallback**: Error handling for missing video sources

## Implementation Notes

### State Management
- **Local Storage**: Authentication persistence
- **Component State**: UI interactions, loading states
- **Props Interface**: TypeScript interfaces for component contracts

### Performance Optimizations
- **Next.js Image**: Optimized image loading and sizing
- **Font Loading**: Strategic font loading with fallbacks
- **Video Optimization**: Compressed video assets for faster loading

### Development Considerations
- **Mock Data**: Simulated camera feeds and user data
- **Error Handling**: Graceful degradation for missing assets
- **Accessibility**: Semantic HTML structure, alt texts
- **Type Safety**: Full TypeScript implementation

This design system ensures consistent visual presentation across all components while maintaining the professional, security-focused aesthetic required for film/TV production use.