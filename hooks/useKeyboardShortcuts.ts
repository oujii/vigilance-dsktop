'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';

export function useKeyboardShortcuts() {
  const { power, setPower, setSelectedCamera, setCameraLayout } = useAppStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Prevent shortcuts when typing in inputs
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case ' ':
          event.preventDefault();
          // Toggle power on/off
          setPower(power === 'ON' ? 'OFF' : 'ON');
          break;

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          event.preventDefault();
          // Select camera by number
          setSelectedCamera(event.key);
          break;

        case 'Escape':
          event.preventDefault();
          // Clear selected camera
          setSelectedCamera(null);
          break;

        case 'c':
          if (event.ctrlKey || event.metaKey) {
            return; // Allow normal copy
          }
          event.preventDefault();
          // Clear all display assignments
          setCameraLayout('1', null);
          setCameraLayout('2', null);
          setCameraLayout('3', null);
          break;

        // Quick assign shortcuts (Shift + number)
        case '!': // Shift+1
          event.preventDefault();
          if (useAppStore.getState().selectedCamera) {
            setCameraLayout('1', useAppStore.getState().selectedCamera);
          }
          break;
        case '@': // Shift+2
          event.preventDefault();
          if (useAppStore.getState().selectedCamera) {
            setCameraLayout('2', useAppStore.getState().selectedCamera);
          }
          break;
        case '#': // Shift+3
          event.preventDefault();
          if (useAppStore.getState().selectedCamera) {
            setCameraLayout('3', useAppStore.getState().selectedCamera);
          }
          break;
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [power, setPower, setSelectedCamera, setCameraLayout]);
}