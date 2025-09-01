'use client';

import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';

interface AppState {
  // System state
  power: 'ON' | 'OFF';
  selectedCamera: string | null;
  
  // Camera layout state for customizable grid
  cameraLayout: {
    [displayId: string]: string | null; // displayId -> cameraId
  };

  // Surveillance grid cameras for each display
  surveillanceCameras: {
    [displayId: string]: string[]; // displayId -> array of camera IDs for grid
  };

  // Video file storage for each camera
  cameraVideos: {
    [cameraId: string]: string; // cameraId -> video file URL or blob URL
  };
  
  // Actions
  setPower: (power: 'ON' | 'OFF') => void;
  setSelectedCamera: (camera: string | null) => void;
  setCameraLayout: (displayId: string, cameraId: string | null) => void;
  setSurveillanceCameras: (displayId: string, cameraIds: string[]) => void;
  setCameraVideo: (cameraId: string, videoUrl: string) => void;
  resetCameras: () => void;
}

export const useAppStore = create<AppState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        // Initial state
        power: 'ON',
        selectedCamera: null,
        cameraLayout: {},
        surveillanceCameras: {
          'control': ['1', '2', '3', '4', '5', '6'], // 6 cameras for control (3x2 grid)
          '1': ['7', '8', '9', '10'],                // 4 cameras for display 1 (2x2 grid)
          '2': ['11', '12', '13', '5'],              // 4 cameras for display 2
        },
        cameraVideos: {},

        // Actions
        setPower: (power) => set({ power }),
        setSelectedCamera: (camera) => set({ selectedCamera: camera }),
        setCameraLayout: (displayId, cameraId) => 
          set((state) => ({
            cameraLayout: {
              ...state.cameraLayout,
              [displayId]: cameraId
            }
          })),
        setSurveillanceCameras: (displayId, cameraIds) =>
          set((state) => ({
            surveillanceCameras: {
              ...state.surveillanceCameras,
              [displayId]: cameraIds
            }
          })),
        setCameraVideo: (cameraId, videoUrl) =>
          set((state) => ({
            cameraVideos: {
              ...state.cameraVideos,
              [cameraId]: videoUrl
            }
          })),
        resetCameras: () =>
          set(() => ({
            cameraVideos: {}
          })),
      }),
      {
        name: 'vigilance-store-v2', // localStorage key
        partialize: (state) => ({
          // Only persist these fields
          power: state.power,
          selectedCamera: state.selectedCamera,
          cameraLayout: state.cameraLayout,
          surveillanceCameras: state.surveillanceCameras,
          cameraVideos: state.cameraVideos,
        }),
      }
    )
  )
);

// BroadcastChannel setup for cross-window synchronization
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== 'undefined') {
  broadcastChannel = new BroadcastChannel('vigilance-channel');

  // Listen for external state changes
  broadcastChannel.addEventListener('message', (event) => {
    const { type, data } = event.data;
    const store = useAppStore.getState();

    switch (type) {
      case 'POWER_CHANGE':
        store.setPower(data.power);
        break;
      case 'CAMERA_SELECT':
        store.setSelectedCamera(data.camera);
        break;
      case 'LAYOUT_CHANGE':
        store.setCameraLayout(data.displayId, data.cameraId);
        break;
    }
  });

  // Broadcast power state changes to other windows
  useAppStore.subscribe(
    (state) => state.power,
    (power) => {
      broadcastChannel?.postMessage({
        type: 'POWER_CHANGE',
        data: { power },
        timestamp: Date.now(),
      });
    }
  );

  // Broadcast camera selection changes
  useAppStore.subscribe(
    (state) => state.selectedCamera,
    (camera) => {
      broadcastChannel?.postMessage({
        type: 'CAMERA_SELECT',
        data: { camera },
        timestamp: Date.now(),
      });
    }
  );

  // Broadcast layout changes
  useAppStore.subscribe(
    (state) => state.cameraLayout,
    (cameraLayout) => {
      Object.entries(cameraLayout).forEach(([displayId, cameraId]) => {
        broadcastChannel?.postMessage({
          type: 'LAYOUT_CHANGE',
          data: { displayId, cameraId },
          timestamp: Date.now(),
        });
      });
    }
  );

  // Error handling
  broadcastChannel.addEventListener('messageerror', (event) => {
    console.warn('BroadcastChannel message error:', event);
  });
}

// Helper functions for manual broadcasting
export const broadcastPowerChange = (power: 'ON' | 'OFF') => {
  broadcastChannel?.postMessage({
    type: 'POWER_CHANGE',
    data: { power },
    timestamp: Date.now(),
  });
};

export const broadcastCameraSelect = (camera: string | null) => {
  broadcastChannel?.postMessage({
    type: 'CAMERA_SELECT',
    data: { camera },
    timestamp: Date.now(),
  });
};

export const broadcastLayoutChange = (displayId: string, cameraId: string | null) => {
  broadcastChannel?.postMessage({
    type: 'LAYOUT_CHANGE',
    data: { displayId, cameraId },
    timestamp: Date.now(),
  });
};

// Cleanup function for BroadcastChannel
export const closeBroadcastChannel = () => {
  broadcastChannel?.close();
};