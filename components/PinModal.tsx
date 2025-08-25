'use client';

import { useState } from 'react';

interface PinModalProps {
  isOpen: boolean;
  type: 'shutdown' | 'startup';
  onSubmit: () => void;
  onCancel?: () => void;
}

export default function PinModal({ isOpen, type, onSubmit, onCancel }: PinModalProps) {
  const [pin, setPin] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (pin.length === 4) {
      onSubmit();
      setPin('');
    }
  };

  const handleCancel = () => {
    setPin('');
    onCancel?.();
  };

  const isShutdown = type === 'shutdown';

  if (isShutdown) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-[#1D2939] border border-red-500/30 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
          {/* Warning Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-400 mb-2">SYSTEM SHUTDOWN</h3>
            <div className="text-red-300 text-sm font-medium">CRITICAL OPERATION</div>
          </div>
          
          {/* Warning Messages */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <div className="text-red-300 text-sm space-y-2">
              <div>• All surveillance cameras will be disabled</div>
              <div>• Security monitoring will cease immediately</div>
              <div>• All active recordings will be terminated</div>
              <div>• Remote access will be unavailable</div>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm mb-4 text-center">
            Enter administrator PIN to confirm shutdown:
          </p>
          
          <div className="mb-6">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.slice(0, 4))}
              className="w-full bg-gray-800 border border-red-500/30 rounded-lg px-4 py-3 text-white font-mono text-center text-xl tracking-[0.5em] focus:outline-none focus:border-red-400"
              placeholder="••••"
              maxLength={4}
              autoFocus
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <div className="flex space-x-3">
            {onCancel && (
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSubmit}
              disabled={pin.length !== 4}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONFIRM SHUTDOWN
            </button>
          </div>
          
          <div className="text-center mt-4 text-xs text-red-500">
            This action cannot be undone remotely
          </div>
        </div>
      </div>
    );
  }

  // Startup Modal
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-[#1D2939] border border-green-500/30 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-green-400 mb-2">SYSTEM STARTUP</h3>
          <div className="text-green-300 text-sm font-medium">INITIALIZING SECURITY PROTOCOLS</div>
        </div>
        
        {/* Info Messages */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
          <div className="text-green-300 text-sm space-y-2">
            <div>• Activating surveillance network</div>
            <div>• Establishing secure connections</div>
            <div>• Loading security configurations</div>
            <div>• Enabling monitoring protocols</div>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm mb-4 text-center">
          Enter administrator PIN to authorize startup:
        </p>
        
        <div className="mb-6">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.slice(0, 4))}
            className="w-full bg-gray-800 border border-green-500/30 rounded-lg px-4 py-3 text-white font-mono text-center text-xl tracking-[0.5em] focus:outline-none focus:border-green-400"
            placeholder="••••"
            maxLength={4}
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        <div className="flex space-x-3">
          {onCancel && (
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={pin.length !== 4}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            AUTHORIZE STARTUP
          </button>
        </div>
        
        <div className="text-center mt-4 text-xs text-green-500">
          Secure administrator access required
        </div>
      </div>
    </div>
  );
}