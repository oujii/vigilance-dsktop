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

  const handleStartClick = () => {
    setShowPinModal(true);
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
    <div className="h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-2xl font-bold text-blue-400 mb-2">VIGILANCE</div>
          <div className="text-gray-400">Security System</div>
        </div>

        <div className="mb-8 text-gray-300">
          <div className="text-red-400 mb-2">SYSTEM OFFLINE</div>
          <div className="text-sm">
            All surveillance cameras are currently disabled.
          </div>
        </div>

        <button
          onClick={handleStartClick}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          STARTA SYSTEM
        </button>

        <div className="mt-6 text-xs text-gray-500">
          Administrator access required
        </div>
      </div>

      <PinModal
        isOpen={showPinModal}
        type="startup"
        onSubmit={handlePinSubmit}
        onCancel={() => setShowPinModal(false)}
      />
    </div>
  );
}