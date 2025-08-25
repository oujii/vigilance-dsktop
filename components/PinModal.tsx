'use client';

import { useState } from 'react';
import TouchPinPad from './TouchPinPad';

interface PinModalProps {
  isOpen: boolean;
  type: 'shutdown' | 'startup';
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function PinModal({ isOpen, type, onSubmit, onCancel }: PinModalProps) {
  const [showWallpaper, setShowWallpaper] = useState(false);

  if (!isOpen) return null;

  const handlePinComplete = (pin: string) => {
    // Accept any PIN code
    if (type === 'shutdown') {
      // For shutdown: show wallpaper then proceed
      setShowWallpaper(true);
      
      setTimeout(() => {
        setShowWallpaper(false);
        // Add 2 second delay before shutdown
        setTimeout(() => {
          onSubmit();
        }, 2000);
      }, 3000);
    } else {
      // For startup: proceed directly to loading
      onSubmit();
    }
  };

  // Show wallpaper transition (only for shutdown)
  if (showWallpaper && type === 'shutdown') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img 
          src="/wallpaper.png" 
          alt="VIGILANCE" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4">
        <TouchPinPad onPinComplete={handlePinComplete} />
        
        {onCancel && (
          <div className="flex justify-center mt-6">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors touch-manipulation"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}