'use client';

import { useState } from 'react';

interface TouchPinPadProps {
  onPinComplete: (pin: string) => void;
  maxLength?: number;
}

export default function TouchPinPad({ onPinComplete, maxLength = 4 }: TouchPinPadProps) {
  const [pin, setPin] = useState('');

  const handleNumberClick = (number: string) => {
    if (pin.length < maxLength) {
      const newPin = pin + number;
      setPin(newPin);
      
      // Auto-submit when max length reached
      if (newPin.length === maxLength) {
        setTimeout(() => onPinComplete(newPin), 100);
      }
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const pinNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'], 
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* PIN Display */}
      <div className="flex space-x-3 mb-4">
        {Array.from({ length: maxLength }).map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full border-2 transition-colors ${
              index < pin.length
                ? 'bg-primary border-primary'
                : 'border-muted-foreground bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* PIN Pad */}
      <div className="grid grid-cols-3 gap-4">
        {pinNumbers.flat().map((number) => (
          <button
            key={number}
            onClick={() => handleNumberClick(number)}
            className="w-16 h-16 bg-muted hover:bg-muted/80 text-foreground text-xl font-semibold rounded-full transition-all active:scale-95 touch-manipulation"
            style={{ userSelect: 'none' }}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleBackspace}
          className="px-6 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors touch-manipulation"
          disabled={pin.length === 0}
        >
          ←
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-lg transition-colors touch-manipulation"
          disabled={pin.length === 0}
        >
          Clear
        </button>
      </div>
    </div>
  );
}