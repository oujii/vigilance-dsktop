'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing system...');

  const steps = [
    'Initializing system...',
    'Connecting to cameras...',
    'Loading security protocols...',
    'Establishing network connections...',
    'Validating user permissions...',
    'Starting surveillance engine...',
    'System ready'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update step based on progress
        const stepIndex = Math.floor((newProgress / 100) * (steps.length - 1));
        setCurrentStep(steps[stepIndex] || steps[steps.length - 1]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#08101F] flex items-center justify-center">
      <div className="text-center max-w-md w-full mx-4">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src="/logoi.png" 
            alt="VIGILANCE" 
            className="h-16 w-auto mx-auto mb-6"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextSibling) {
                nextSibling.style.display = 'block';
              }
            }}
          />
          <div 
            className="text-3xl text-gray-400 tracking-widest font-semibold hidden"
            style={{ display: 'none' }}
          >
            VIGILANCE
          </div>
        </div>

        {/* Current Step */}
        <div className="text-gray-300 text-lg mb-8 font-medium">
          {currentStep}
        </div>

        {/* Spinning Loading Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-600 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}