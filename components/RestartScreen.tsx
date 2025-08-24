'use client';

import { useState, useEffect } from 'react';

interface RestartScreenProps {
  onRestart: () => void;
}

export default function RestartScreen({ onRestart }: RestartScreenProps) {
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const [restartCode, setRestartCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleStartClick = () => {
    setShowCodeDialog(true);
  };

  const handleCodeSubmit = async () => {
    if (restartCode === '1234') {  // Same code as shutdown
      setIsLoading(true);
      setShowCodeDialog(false);
      
      // Simulate system startup delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      onRestart();
    } else {
      // Visual feedback for wrong code
      setRestartCode('');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
          <div className="text-lg font-semibold text-blue-400 mb-2">VIGILANCE SECURITY SYSTEM</div>
          <div className="text-gray-400">Initializing cameras...</div>
          <div className="text-gray-500 text-sm mt-2">Please wait...</div>
        </div>
      </div>
    );
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
          START SYSTEM
        </button>

        <div className="mt-6 text-xs text-gray-500">
          Administrator access required
        </div>
      </div>

      {/* Code Dialog */}
      {showCodeDialog && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-[#1a1a1a] border border-green-500/50 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-green-400 mb-4">SYSTEM STARTUP</h3>
            <p className="text-gray-300 text-sm mb-4">
              Enter administrator code to start surveillance system:
            </p>
            
            <div className="mb-4">
              <input
                type="password"
                value={restartCode}
                onChange={(e) => setRestartCode(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-center text-lg tracking-widest"
                placeholder="••••"
                maxLength={4}
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCodeDialog(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCodeSubmit}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}