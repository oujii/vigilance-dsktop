'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing system...');

  const steps = [
    { text: 'Initializing system...', duration: 700 },
    { text: 'Connecting to cameras...', duration: 1800 },
    { text: 'Loading security protocols...', duration: 1200 },
    { text: 'Establishing network connections...', duration: 2300 },
    { text: 'Validating user permissions...', duration: 800 },
    { text: 'Starting surveillance engine...', duration: 2700 },
    { text: 'System ready', duration: 500 }
  ];

  useEffect(() => {
    let currentStepIndex = 0;
    setCurrentStep(steps[0].text);

    const runStep = () => {
      if (currentStepIndex < steps.length - 1) {
        setTimeout(() => {
          currentStepIndex++;
          setCurrentStep(steps[currentStepIndex].text);
          
          if (currentStepIndex === steps.length - 1) {
            // Last step - trigger completion
            setTimeout(() => onComplete(), steps[currentStepIndex].duration);
          } else {
            runStep();
          }
        }, steps[currentStepIndex].duration);
      }
    };

    runStep();
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

      </div>
    </div>
  );
}