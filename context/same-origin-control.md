# Same-Origin Multi-Window Control System

This document explains how to implement cross-window state synchronization using BroadcastChannel API for controlling multiple browser windows/tabs from the same origin.

## Core Concept

The BroadcastChannel API allows real-time communication between different windows, tabs, or frames that share the same origin (protocol + domain + port). Perfect for:
- Multi-monitor applications
- Control panels that affect other windows
- Synchronized state across browser tabs
- Film/TV props requiring instant scene control

## Implementation Guide

### 1. State Management with Zustand

First, create a store that combines Zustand with BroadcastChannel:

```typescript
// lib/store.ts
import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

interface AppState {
  // Your state properties
  power: 'ON' | 'OFF'
  selectedItem: string | null
  
  // Actions
  setPower: (power: 'ON' | 'OFF') => void
  setSelectedItem: (item: string | null) => void
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        // Initial state
        power: 'ON',
        selectedItem: null,

        // Actions
        setPower: (power) => set({ power }),
        setSelectedItem: (item) => set({ selectedItem: item }),
      }),
      {
        name: 'app-store', // localStorage key
        partialize: (state) => ({
          // Only persist these fields
          power: state.power,
          selectedItem: state.selectedItem,
        }),
      }
    )
  )
)
```

### 2. BroadcastChannel Integration

Add cross-window synchronization to your store:

```typescript
// lib/store.ts (continued)

// BroadcastChannel setup for cross-window synchronization
let broadcastChannel: BroadcastChannel | null = null

if (typeof window !== 'undefined') {
  broadcastChannel = new BroadcastChannel('your-app-channel')

  // Listen for external state changes
  broadcastChannel.addEventListener('message', (event) => {
    const { type, data } = event.data
    const store = useAppStore.getState()

    switch (type) {
      case 'POWER_CHANGE':
        store.setPower(data.power)
        break
      case 'ITEM_SELECT':
        store.setSelectedItem(data.item)
        break
      // Add more message types as needed
    }
  })

  // Broadcast state changes to other windows
  useAppStore.subscribe(
    (state) => state.power,
    (power) => {
      broadcastChannel?.postMessage({
        type: 'POWER_CHANGE',
        data: { power },
      })
    }
  )

  useAppStore.subscribe(
    (state) => state.selectedItem,
    (item) => {
      broadcastChannel?.postMessage({
        type: 'ITEM_SELECT',
        data: { item },
      })
    }
  )
}

// Helper functions for manual broadcasting
export const broadcastPowerChange = (power: 'ON' | 'OFF') => {
  broadcastChannel?.postMessage({
    type: 'POWER_CHANGE',
    data: { power },
  })
}

export const broadcastItemSelect = (item: string | null) => {
  broadcastChannel?.postMessage({
    type: 'ITEM_SELECT',
    data: { item },
  })
}
```

### 3. Component Implementation

Use the store in your components:

```tsx
// components/ControlPanel.tsx
'use client'

import { useAppStore } from '@/lib/store'

export function ControlPanel() {
  const { power, setPower, selectedItem } = useAppStore()

  const handlePowerToggle = () => {
    const newPower = power === 'ON' ? 'OFF' : 'ON'
    setPower(newPower)
    // State automatically broadcasts to other windows
  }

  return (
    <div>
      <button onClick={handlePowerToggle}>
        Power: {power}
      </button>
      <p>Selected: {selectedItem || 'None'}</p>
    </div>
  )
}
```

```tsx
// components/DisplayWindow.tsx
'use client'

import { useAppStore } from '@/lib/store'

export function DisplayWindow() {
  const { power, selectedItem } = useAppStore()

  if (power === 'OFF') {
    return (
      <div className="h-screen bg-black flex items-end justify-end p-4">
        <p className="text-gray-600 text-sm">System Off</p>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <h1>Display Window</h1>
      <p>Selected Item: {selectedItem || 'None'}</p>
    </div>
  )
}
```

### 4. Route Structure

Create routes for different windows:

```
app/
├── control/page.tsx          // Main control panel
├── display/[id]/page.tsx     // Display windows (1, 2, 3, etc.)
└── page.tsx                  // Redirect to control
```

```tsx
// app/control/page.tsx
import { ControlPanel } from '@/components/ControlPanel'

export default function ControlPage() {
  return <ControlPanel />
}
```

```tsx
// app/display/[id]/page.tsx
import { DisplayWindow } from '@/components/DisplayWindow'

export default function DisplayPage({ params }: { params: { id: string } }) {
  return <DisplayWindow />
}
```

### 5. Package Dependencies

Install required packages:

```bash
npm install zustand
```

For TypeScript projects:
```bash
npm install @types/node
```

## Usage Instructions

### Development
1. Start your development server: `npm run dev`
2. Open control panel: `http://localhost:3000/control`
3. Open display windows in new browser windows:
   - `http://localhost:3000/display/1`
   - `http://localhost:3000/display/2`
   - `http://localhost:3000/display/3`

### Production (Netlify/Vercel)
1. Deploy your app to any static hosting
2. Open multiple windows with different routes:
   - `https://your-app.netlify.app/control`
   - `https://your-app.netlify.app/display/1`
   - `https://your-app.netlify.app/display/2`

## Key Features

### ✅ What Works
- **Same-origin communication**: All windows from the same domain sync instantly
- **Persistent state**: Data survives page refreshes via localStorage
- **Real-time updates**: Changes propagate within ~50ms
- **Multi-monitor support**: Perfect for presentations or control rooms
- **Production ready**: Works on any modern hosting platform

### ❌ Limitations
- **Same origin only**: Cannot sync between different domains
- **Modern browsers**: IE not supported (BroadcastChannel API)
- **Same browser profile**: Incognito windows are isolated

## Advanced Patterns

### Message Type System
```typescript
interface BroadcastMessage {
  type: 'POWER_CHANGE' | 'ITEM_SELECT' | 'LAYOUT_CHANGE'
  data: any
  timestamp?: number
  windowId?: string
}
```

### Error Handling
```typescript
broadcastChannel?.addEventListener('messageerror', (event) => {
  console.warn('BroadcastChannel message error:', event)
})
```

### Cleanup
```typescript
// In useEffect cleanup
useEffect(() => {
  return () => {
    broadcastChannel?.close()
  }
}, [])
```

## Film/TV Production Tips

1. **Instant Scene Control**: Use boolean states for immediate on/off effects
2. **Black Screen Pattern**: Check power state and render full black div
3. **Multi-Monitor Setup**: Open different routes in different browser windows
4. **Backup Plan**: Always have manual refresh as fallback
5. **Testing**: Test with 3+ windows to ensure sync works reliably

## Troubleshooting

### State Not Syncing
- Ensure all windows are from the same origin
- Check browser console for BroadcastChannel errors
- Verify channel name matches across components

### Performance Issues
- Limit broadcast frequency for high-frequency events
- Use debouncing for rapid state changes
- Consider message batching for complex updates

### Browser Compatibility
- BroadcastChannel is supported in all modern browsers
- For IE support, consider fallback to localStorage + polling

---

This pattern provides robust, production-ready cross-window communication perfect for control panels, multi-monitor applications, and interactive installations.