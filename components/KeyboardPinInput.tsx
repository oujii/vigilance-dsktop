'use client';

import { useState, useEffect, useRef } from 'react';

interface KeyboardPinInputProps {
  onPinComplete: (pin: string) => void;
  onCancel?: () => void;
  maxLength?: number;
}

export default function KeyboardPinInput({ onPinComplete, onCancel, maxLength = 4 }: KeyboardPinInputProps) {
  const [pin, setPin] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only allow digits
    
    if (value.length <= maxLength) {
      setPin(value);
      
      // Auto-submit when max length reached
      if (value.length === maxLength) {
        setTimeout(() => onPinComplete(value), 100);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, backspace, delete, tab, escape, enter
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete', 'Tab', 'Escape', 'Enter'];
    
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }

    // Submit on Enter if PIN is complete
    if (e.key === 'Enter' && pin.length === maxLength) {
      onPinComplete(pin);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Enter Security PIN</h3>
        <p className="text-sm text-gray-400">Enter 4-digit PIN to continue</p>
      </div>


      {/* Keyboard Input Field */}
      <div className="w-full max-w-xs">
        <input
          ref={inputRef}
          type="password"
          value={pin}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={maxLength}
          placeholder="Enter PIN"
          className="w-full px-4 py-3 bg-[#101828] border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          autoComplete="off"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-4">
        {onCancel && (
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-600/50 hover:bg-gray-600/70 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={() => onPinComplete(pin)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={pin.length !== maxLength}
        >
          Submit
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center mt-2">
        Use keyboard to enter PIN • Press Enter to submit
      </div>
    </div>
  );
}