'use client';

import { useState } from 'react';
import PinModal from './PinModal';
import LoadingScreen from './LoadingScreen';

interface RestartScreenProps {
  onRestart: () => void;
}

export default function RestartScreen({ onRestart }: RestartScreenProps) {
  const [showPinModal, setShowPinModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPowerDelay, setShowPowerDelay] = useState(false);

  const handlePowerClick = () => {
    setShowPowerDelay(true);
    
    // 2 second delay before showing PIN modal
    setTimeout(() => {
      setShowPowerDelay(false);
      setShowPinModal(true);
    }, 2000);
  };

  const handlePinSubmit = () => {
    setShowPinModal(false);
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    onRestart();
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      {!showPowerDelay ? (
        <button
          onClick={handlePowerClick}
          className="w-24 h-24 bg-gray-800 hover:bg-gray-700 border-4 border-gray-600 rounded-full flex items-center justify-center transition-all active:scale-95 touch-manipulation"
        >
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13,3V9H11V3H13M12,1A11,11 0 0,0 1,12A11,11 0 0,0 12,23A11,11 0 0,0 23,12A11,11 0 0,0 12,1M12,3A9,9 0 0,1 21,12A9,9 0 0,1 12,21A9,9 0 0,1 3,12A9,9 0 0,1 12,3Z"/>
          </svg>
        </button>
      ) : (
        <div className="w-24 h-24 bg-gray-700 border-4 border-gray-500 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13,3V9H11V3H13M12,1A11,11 0 0,0 1,12A11,11 0 0,0 12,23A11,11 0 0,0 23,12A11,11 0 0,0 12,1M12,3A9,9 0 0,1 21,12A9,9 0 0,1 12,21A9,9 0 0,1 3,12A9,9 0 0,1 12,3Z"/>
          </svg>
        </div>
      )}

      <PinModal
        isOpen={showPinModal}
        type="startup"
        onSubmit={handlePinSubmit}
        onCancel={() => setShowPinModal(false)}
      />
    </div>
  );
}