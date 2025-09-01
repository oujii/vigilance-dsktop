'use client';

import { useState } from 'react';
import KeyboardPinInput from './KeyboardPinInput';

interface PinModalProps {
  isOpen: boolean;
  type: 'shutdown' | 'startup';
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function PinModal({ isOpen, type, onSubmit, onCancel }: PinModalProps) {
  const [showWallpaper, setShowWallpaper] = useState(false);
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePinComplete = () => {
    // Accept any PIN code
    if (type === 'shutdown') {
      // Show processing state first
      setIsProcessing(true);
      
      // After 1.5 seconds, proceed with wallpaper
      setTimeout(() => {
        setIsProcessing(false);
        setShowWallpaper(true);
        
        setTimeout(() => {
          setShowWallpaper(false);
          setShowBlackScreen(true);
          // Add 2 second delay before shutdown
          setTimeout(() => {
            onSubmit();
          }, 2000);
        }, 3000);
      }, 1500);
    } else {
      // For startup: show processing then proceed
      setIsProcessing(true);
      setTimeout(() => {
        onSubmit();
      }, 1000);
    }
  };

  // Show processing screen
  if (isProcessing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Wallpaper Background */}
        <div className="absolute inset-0">
          <img 
            src="/wallpaper.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        {/* Processing Content */}
        <div className="relative bg-[#1D2939]/95 backdrop-blur-sm border border-gray-600 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl text-center">
          <div className="mb-4">
            <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          </div>
          <div className="text-white text-lg font-medium">
            Processing...
          </div>
          <div className="text-gray-400 text-sm mt-2">
            Verifying credentials
          </div>
        </div>
      </div>
    );
  }

  // Show black screen after wallpaper
  if (showBlackScreen && type === 'shutdown') {
    return <div className="fixed inset-0 bg-black z-50"></div>;
  }

  // Show wallpaper transition (only for shutdown)
  if (showWallpaper && type === 'shutdown') {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <img 
          src="/wallpaper.png" 
          alt="VIGILANCE" 
          className="max-w-full max-h-full object-contain"
        />
        
        {/* Spinning Animation */}
        <div className="absolute flex justify-center items-end bottom-30">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 rounded-full opacity-30"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-white rounded-full border-t-transparent animate-spin opacity-60"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Wallpaper Background */}
      <div className="absolute inset-0">
        <img 
          src="/wallpaper.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* PIN Input Card */}
      <div className="relative bg-[#1D2939]/95 backdrop-blur-sm border border-gray-600 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <KeyboardPinInput onPinComplete={handlePinComplete} onCancel={onCancel} />
      </div>
    </div>
  );
}