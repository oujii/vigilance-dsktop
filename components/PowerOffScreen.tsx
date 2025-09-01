'use client';

import { useState, useEffect } from 'react';

interface PowerOffScreenProps {
  onPowerOn: () => void;
  isRestarting?: boolean;
}

export default function PowerOffScreen({ onPowerOn, isRestarting = false }: PowerOffScreenProps) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [isBooting, setIsBooting] = useState(false);

  const bootOptions = [
    { label: 'BOOT', description: 'Boot Vigilance Surveillance System' },
    { label: 'BOOT TO MAINTENANCE', description: 'Boot to maintenance console' },
    { label: 'DIAGNOSTICS', description: 'Run system diagnostics' },
    { label: 'SAFE MODE', description: 'Boot with minimal drivers' }
  ];

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isBooting) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedOption(prev => prev === 0 ? bootOptions.length - 1 : prev - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedOption(prev => prev === bootOptions.length - 1 ? 0 : prev + 1);
        break;
      case 'Enter':
        e.preventDefault();
        handleBoot();
        break;
      case 'Escape':
        // Could add cancel/shutdown functionality here
        break;
    }
  };

  const handleBoot = () => {
    setIsBooting(true);
    // For auto-boot during restart, go directly to loading
    if (isRestarting) {
      onPowerOn();
    } else {
      // Small delay to show booting state for manual boot
      setTimeout(() => {
        onPowerOn();
      }, 1000);
    }
  };

  // Auto-boot after 500ms when restarting
  useEffect(() => {
    if (isRestarting && !isBooting) {
      const timer = setTimeout(() => {
        handleBoot();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isRestarting, isBooting]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBooting, selectedOption]);

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Wallpaper Background */}
      <div className="absolute inset-0">
        <img 
          src="/wallpaper.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/90"></div>
      </div>
      
      {/* BIOS Boot Menu */}
      <div className="relative text-white font-mono">
        {/* VIGILANCE Logo */}
        <div className="text-center mb-12">
          <img 
            src="/bios-logo.png" 
            alt="VIGILANCE" 
            className="h-16 mx-auto mb-6"
            onError={(e) => {
              // Fallback to text if image doesn't exist
              e.currentTarget.style.display = 'none';
              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextSibling) {
                nextSibling.style.display = 'block';
              }
            }}
          />
          <div 
            className="text-2xl font-bold text-gray-200 tracking-wider hidden"
            style={{ display: 'none' }}
          >
            VIGILANCE
          </div>
        </div>

        {/* Boot Menu */}
        <div className="bg-gray-900/90 border border-gray-500 p-8 min-w-[500px] max-w-[600px]">
          {/* System Info Header */}
          <div className="text-xs text-gray-400 mb-6 text-center space-y-1">
            <div>Node: CW001 • Host: 10.20.0.31 • Build: v1.14.3</div>
            <div>VIGILANCE Surveillance System Boot Manager</div>
          </div>
          
          <div className="border-t border-gray-600 pt-4">
            <div className="text-sm text-gray-300 mb-6">
              Boot Configuration:
            </div>
            
            <div className="space-y-2">
              {bootOptions.map((option, index) => (
                <div 
                  key={index}
                  className={`p-3 cursor-pointer transition-colors ${
                    selectedOption === index 
                      ? 'bg-gray-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  onClick={() => !isBooting && setSelectedOption(index)}
                >
                  <div className="text-sm font-semibold">
                    {isBooting && selectedOption === index ? 'BOOTING...' : option.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-xs text-gray-500 text-center">
            Use ↑↓ to navigate • Press Enter to boot • ESC to cancel
          </div>
        </div>

      </div>
    </div>
  );
}