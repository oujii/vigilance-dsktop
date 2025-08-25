# Vigilance Desktop - Implementation Plan

## Project Overview
Converting the mobile Vigilance security app to a desktop webapp with multi-window control functionality. The desktop version will serve as a control panel that can manage multiple display windows, with the ability to turn screens on/off for film/TV production use.

## Key Requirements Analysis

### From context/example.html (Desktop Reference)
- **Sidebar Navigation**: Left sidebar with Vigilance logo and navigation links
- **Main Content Area**: Dashboard with camera feeds in grid layout  
- **System Stats**: Active cameras (14/14), System Health (99.8%), Storage (85%)
- **User Status**: Online/Offline user indicators (Adam, Carl)
- **Camera Grid**: Multiple camera feeds with hover controls

### From context/digest.txt (Mobile Reference)
- **App Architecture**: Next.js 15 with App Router, Inter fonts, dark theme
- **Color Scheme**: Background `#101828`, Surface `#1D2939`, blue accents
- **Authentication Flow**: Not needed for this desktop web app
- **Camera Components**: Video feeds with controls, online/offline states

### From context/same-origin-control.md (Multi-Window Control)
- **BroadcastChannel API**: Real-time cross-window communication
- **Zustand Store**: State management with localStorage persistence
- **Control System**: Power on/off states, synchronized across windows
- **Route Structure**: `/control` for main panel, `/display/[id]` for screens

## Implementation Plan

### Phase 1: Desktop Layout Foundation
**Goal**: Convert mobile layout to desktop with sidebar navigation

1. **Update Layout Structure**
   - Create desktop layout with sidebar navigation (based on example.html)
   - Update `app/layout.tsx` to use Inter font (matching mobile version)
   - Implement responsive grid system for camera feeds with the ability to choose what videos go where so you can build your own layout grid of videos of your choice.

2. **Desktop Dashboard Page**
   - Create new `app/dashboard/page.tsx` with sidebar + main content layout
   - Port system stats from mobile version (14/14 cameras, 99.8% health, 85% storage)
   - Convert bottom navigation to sidebar navigation
   - Implement camera grid (3-column desktop vs 1-column mobile)

3. **Styling Updates**
   - Keep existing color scheme (`#101828`, `#1D2939`)
   - Update component sizes for desktop (larger touch targets, more spacing)
   - Ensure camera feeds work with desktop hover states

### Phase 2: Multi-Window Control System
**Goal**: Implement BroadcastChannel-based cross-window synchronization

1. **Install Dependencies**
   ```bash
   npm install zustand
   ```

2. **Create Store System** (`lib/store.ts`)
   - Implement Zustand store with BroadcastChannel integration
   - State: `power: 'ON' | 'OFF'`, `selectedCamera: string | null`
   - Actions: `setPower()`, `setSelectedCamera()`
   - Auto-sync between windows using BroadcastChannel API

3. **Route Structure**
   - `/control` - Main control panel (current dashboard)
   - `/display/[id]` - Display windows (1, 2, 3, etc.)
   - `/` - Redirect to control panel

4. **Display Windows**
   - Create `app/display/[id]/page.tsx` 
   - Full-screen camera view when powered on
   - Black screen with "System Off" when powered off
   - Subscribe to store state changes for instant updates

### Phase 3: Authentication & Control Integration
**Goal**: Integrate logout functionality with power control

1. **Enhanced Authentication**
   - Add logout button to desktop sidebar
   - Connect logout action to power-off functionality

2. **Power Control Logic**
   - Logout triggers `setPower('OFF')` 
   - All display windows immediately show black screen
   - Control panel remains accessible for re-activation
   - State persists across page refreshes

3. **Camera Control Features**
   - Select individual cameras from control panel
   - Display selected camera on `/display/[id]` windows
   - Maintain camera feed controls (record, alerts, etc.)

### Phase 4: Desktop-Specific Features
**Goal**: Add desktop enhancements while maintaining mobile compatibility

1. **Enhanced Camera Grid**
   - Hover controls for all cameras (from example.html reference)
   - Drag & drop to reorder cameras
   - Full-screen camera preview on click

2. **Keyboard Shortcuts**
   - `Space` - Toggle power on/off
   - `1-9` - Select camera feeds
   - `Esc` - Return to control panel

3. **Multi-Monitor Optimization**
   - Window positioning helpers
   - Full-screen API integration
   - Display window identification

### Phase 5: Production Features
**Goal**: Film/TV production specific enhancements

1. **Scene Control**
   - Quick power states (instant black screen)
   - Preset camera configurations
   - Silent operation (no notification sounds)

2. **Reliability Features**
   - Offline functionality (static export compatibility)
   - Manual refresh fallback
   - Error handling for failed BroadcastChannel communication

## File Structure Changes

```
app/
├── control/page.tsx          # Main control panel (desktop dashboard)
├── display/[id]/page.tsx     # Display windows (full-screen feeds)
├── login/page.tsx           # Existing login (minor updates)
├── layout.tsx               # Update for desktop layout
└── page.tsx                 # Redirect to /control

lib/
└── store.ts                 # Zustand + BroadcastChannel store

components/
├── Sidebar.tsx              # Desktop navigation sidebar
├── ControlPanel.tsx         # Main control interface
├── DisplayWindow.tsx        # Full-screen display component
├── CameraFeed.tsx          # Existing (minor updates for desktop)
└── CameraGrid.tsx          # Desktop camera grid layout
```

## Technical Specifications

### State Management
- **Zustand** for global state with BroadcastChannel sync
- **LocalStorage** persistence for reliability
- **Real-time updates** within ~50ms across windows

### Responsive Design  
- **Desktop-first** approach with mobile fallback
- **Sidebar navigation** for desktop, bottom nav for mobile
- **Grid layouts** that adapt to screen size

### Browser Compatibility
- **Modern browsers** (BroadcastChannel API support)
- **Same-origin** requirement for cross-window sync
- **Graceful degradation** for unsupported features

## Success Criteria

1. **✅ Desktop Layout**: Sidebar navigation with camera grid matches example.html aesthetic
2. **✅ Multi-Window Sync**: Control panel can power on/off display windows instantly  
3. **✅ Authentication Flow**: Logout triggers system-wide power off
4. **✅ Production Ready**: Offline deployment works on Netlify/Vercel
5. **✅ Camera Controls**: Select and display individual feeds on external windows
6. **✅ Reliability**: State persists through page refreshes and connection issues

## Implementation Status

### ✅ Phase 1: Desktop Layout Foundation - COMPLETED
- ✅ Zustand dependency installed
- ✅ Updated layout.tsx with Inter font matching mobile version
- ✅ Created Sidebar component with navigation and power controls
- ✅ Created CameraGrid component for desktop camera layout
- ✅ Created control page with sidebar + main content layout
- ✅ Implemented system stats (14 cameras, 99.8% health, 85% storage)

### ✅ Phase 2: Multi-Window Control System - COMPLETED
- ✅ Created Zustand store with BroadcastChannel integration (`lib/store.ts`)
- ✅ Implemented power, selectedCamera, and cameraLayout state management
- ✅ Created DisplayWindow component for full-screen display
- ✅ Created display/[id] route structure for multiple windows
- ✅ Root page redirects to /control

### ✅ Phase 3: Camera Layout & Keyboard Controls - COMPLETED
- ✅ Added camera layout assignment functionality to control panel
- ✅ Implemented keyboard shortcuts (Space, 1-9, Esc, Shift+1/2/3, C)
- ✅ Enhanced display windows with specific camera assignments
- ✅ Added visual feedback for camera-to-display assignments
- ✅ Created assignment priority system (specific > global selection)

### 🔄 Currently Working - Development Server Running
**Server**: http://localhost:3001
- `/control` - Main control panel with enhanced desktop dashboard
- `/display/1` - Display window 1 
- `/display/2` - Display window 2
- `/display/3` - Display window 3

### New Features Available:
#### Mouse Controls:
- Click cameras to select them
- Use "Assign Selected" buttons to assign cameras to specific displays
- Power control in sidebar turns all screens on/off instantly

#### Keyboard Shortcuts:
- `Space` - Toggle power on/off
- `1-6` - Select camera by number
- `Esc` - Clear selection  
- `Shift+1/2/3` - Quick assign selected camera to display
- `C` - Clear all assignments

#### Visual Feedback:
- Blue ring: Selected camera
- Green ring: Camera assigned to display(s)
- Green badges: Show which display(s) camera is assigned to

### ✅ Phase 4: Film Production Features - COMPLETED
- ✅ Redesigned display windows as realistic surveillance system interface
- ✅ Added 4-6 camera grid layout with click-to-enlarge functionality  
- ✅ Implemented clickable SHUTDOWN with 4-digit code input (1234)
- ✅ Created restart screen on black background for system startup
- ✅ Updated control panel to pre-production setup mode
- ✅ Added scene instructions and actor guidance

### 🎬 PRODUCTION READY - Film/TV System
**Server**: http://localhost:3001

#### For Filming:
**Display Windows** (what appears on camera):
- `/display/1` - 6-camera surveillance grid
- `/display/2` - 4-camera surveillance grid  
- `/display/3` - 2-camera surveillance grid

**Actor Interaction** (Silvia's actions):
1. **Views surveillance system** - Multiple camera feeds in professional grid
2. **Clicks videos** - Can enlarge specific camera feeds
3. **Shutdown system** - Clicks SHUTDOWN button, enters code `1234`
4. **System goes black** - Shows restart screen with START SYSTEM button
5. **Restart system** - Clicks START SYSTEM, enters code `1234`, 2-second loading

**Behind Camera** (crew control):
- `/control` - Pre-production setup and emergency controls only
- Emergency power toggle with `Space` key if needed
- Otherwise, Silvia controls everything directly

### 🎭 Scene Flow:
1. **Setup**: Crew opens display windows on screens that will be filmed
2. **Action**: Silvia interacts directly with surveillance interface
3. **No crew input needed** during filming - all controlled by actor
4. **Emergency only**: Crew can override with control panel if needed

### ✅ Phase 5: Final UI/UX Polish - COMPLETED

#### Recent Updates (December 2024):
- ✅ **Netlify Deployment**: Configured static export with netlify.toml
- ✅ **Video Persistence**: Fixed video uploads to persist across power cycles in /control 
- ✅ **UI Redesign**: Complete navigation overhaul with expandable sidebar menus
- ✅ **Color System**: Implemented new OKLCH color scheme from context/colors.md
- ✅ **Touchscreen PIN**: Redesigned logout flow with touchscreen PIN pad
- ✅ **Component Architecture**: Added TouchPinPad, PinModal, LoadingScreen, ExpandableMenu

#### Color System Implementation:
- **OKLCH Colors**: Full implementation of modern color space
- **CSS Variables**: Comprehensive theming system with light/dark modes
- **Design Tokens**: Background, foreground, primary, secondary, destructive, etc.

#### UI/UX Enhancements:
- **Sidebar Transform**: From navigation to expandable menu structure with Swedish content
- **TopBar Navigation**: Moved navigation tabs to top with proper icon hierarchy
- **TouchScreen Support**: Large touch targets, PIN pad with haptic feedback
- **Fullscreen Control**: Click VIGILANCE logo for immersive fullscreen mode
- **Video Management**: Right-click/Ctrl+click to upload videos, persistence across sessions

#### Production Flow Updates:
- **Logout Sequence**: TouchPad PIN → Wallpaper (3s) → Black screen with POWER button
- **Display Screens**: /display/1 and /display/2 show pure black when powered off
- **Control Panel**: Only /control has restart capability with minimal POWER button
- **Video Persistence**: Videos stored as blob URLs in localStorage via Zustand

### Current Status: PRODUCTION READY ✅
1. ✅ Complete UI/UX system with modern design
2. ✅ Video upload/persistence working across all pages  
3. ✅ TouchScreen-optimized PIN system for film production
4. ✅ Netlify deployment configuration ready
5. ✅ Cross-window synchronization fully functional
