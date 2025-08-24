'use client';

import { useAppStore } from '@/lib/store';

interface Camera {
  id: string;
  name: string;
  model: string;
  placeholder: string;
  isActive: boolean;
}

interface CameraGridProps {
  cameras: Camera[];
}

export default function CameraGrid({ cameras }: CameraGridProps) {
  const { selectedCamera, setSelectedCamera, cameraLayout } = useAppStore();

  const handleCameraSelect = (cameraId: string) => {
    setSelectedCamera(cameraId === selectedCamera ? null : cameraId);
  };

  // Find which displays are assigned to each camera
  const getAssignedDisplays = (cameraId: string) => {
    return Object.entries(cameraLayout)
      .filter(([_, assignedCamera]) => assignedCamera === cameraId)
      .map(([displayId, _]) => displayId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cameras.map((camera) => {
        const assignedDisplays = getAssignedDisplays(camera.id);
        const isSelected = selectedCamera === camera.id;
        const isAssigned = assignedDisplays.length > 0;
        
        return (
        <div 
          key={camera.id} 
          className={`relative rounded-2xl overflow-hidden group cursor-pointer transition-all ${
            isSelected ? 'ring-2 ring-blue-500' : ''
          } ${
            isAssigned ? 'ring-2 ring-green-500/50' : ''
          }`}
          onClick={() => handleCameraSelect(camera.id)}
        >
          {/* Placeholder image - will be replaced with real video feeds */}
          <div className={`w-full h-64 bg-gray-700 object-cover transition-opacity flex items-center justify-center ${
            camera.isActive ? 'opacity-100' : 'opacity-50'
          }`}>
            <div className="text-center">
              <div className="text-gray-400 text-lg font-semibold">{camera.placeholder}</div>
              <div className="text-gray-500 text-sm mt-1">Camera Feed</div>
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

          {/* Feed Info */}
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-semibold text-sm">{camera.name}</h3>
            <p className="text-xs text-gray-300 opacity-80">{camera.model}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-300 mt-1">
              {/* Radio Waves Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 512 512" 
                fill="currentColor" 
                className="w-3 h-3"
              >
                <circle cx="256" cy="256" r="48"/>
                <path d="M158.6 353.4c-53.4-53.4-53.4-140.2 0-193.6l-30.2-30.2c-70 70-70 183.9 0 253.9l30.2-30.1zM353.4 353.4l30.2 30.2c70-70 70-183.9 0-253.9l-30.2 30.2c53.4 53.4 53.4 140.2 0 193.6zM107 405c-82.7-82.7-82.7-216.7 0-299.3L76.8 75.5c-99.5 99.5-99.5 260.5 0 360l30.2-30.5zM405 405c82.7-82.7 82.7-216.7 0-299.3l30.2-30.2c99.5 99.5 99.5 260.5 0 360L405 405z"/>
              </svg>
              
              {/* Status Indicator */}
              <div className="flex items-center space-x-1">
                <div className={`h-1.5 w-1.5 rounded-full ${
                  camera.isActive ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
                <span className={`text-xs ${camera.isActive ? 'text-white' : 'text-gray-400'}`}>
                  {camera.isActive ? 'Live' : 'Offline'}
                </span>
              </div>

              {/* Signal Strength - simulated */}
              <div className="flex space-x-0.5">
                {[1, 2, 3].map((bar) => (
                  <div
                    key={bar}
                    className={`w-1 h-2 rounded-sm ${
                      camera.isActive && bar <= 2 ? 'bg-green-400' : 'bg-gray-500'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Hover Controls */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Record Button */}
            <button className="bg-black/50 rounded-full h-9 w-9 flex items-center justify-center hover:bg-black/70 transition-colors">
              <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>
            
            {/* Alert Count */}
            <button className="bg-black/50 rounded-full h-9 w-9 flex items-center justify-center font-semibold text-xs hover:bg-black/70 transition-colors">
              0
            </button>
            
            {/* More Options */}
            <button className="bg-black/50 rounded-full h-9 w-9 flex items-center justify-center hover:bg-black/70 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>

          {/* Status Indicators */}
          <div className="absolute top-4 right-4 flex flex-col space-y-1">
            {isSelected && (
              <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                Selected
              </div>
            )}
            {isAssigned && (
              <div className="bg-green-500/80 text-white px-2 py-1 rounded text-xs font-semibold">
                Display {assignedDisplays.join(', ')}
              </div>
            )}
          </div>

          {/* Offline Overlay */}
          {!camera.isActive && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <div className="text-red-400 text-sm font-semibold">OFFLINE</div>
                <div className="text-gray-300 text-xs mt-1">Camera unavailable</div>
              </div>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
}