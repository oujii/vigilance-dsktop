'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';

interface Camera {
  id: string;
  name: string;
  location: string;
  videoSrc: string;
  timestamp: string;
}

interface SurveillanceGridProps {
  cameras: Camera[];
  onShutdown?: () => void;
  gridType?: '3x2' | '2x2';
  displayId?: string;
  showTopBar?: boolean;
}

export default function SurveillanceGrid({ cameras, onShutdown, gridType = '3x2', displayId, showTopBar = true }: SurveillanceGridProps) {
  const { cameraVideos, setCameraVideo } = useAppStore();
  const [enlargedCamera, setEnlargedCamera] = useState<string | null>(null);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [shutdownCode, setShutdownCode] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCameraForFile, setSelectedCameraForFile] = useState<string | null>(null);

  const handleVideoClick = (cameraId: string, event: React.MouseEvent) => {
    // Right click or Ctrl+click to select file, otherwise enlarge
    if (event.ctrlKey || event.metaKey || event.button === 2) {
      setSelectedCameraForFile(cameraId);
      fileInputRef.current?.click();
    } else {
      setEnlargedCamera(enlargedCamera === cameraId ? null : cameraId);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedCameraForFile) {
      const videoUrl = URL.createObjectURL(file);
      setCameraVideo(selectedCameraForFile, videoUrl);
      setSelectedCameraForFile(null);
    }
  };

  const handleShutdownClick = () => {
    setShowShutdownDialog(true);
  };

  const handleCodeSubmit = () => {
    if (shutdownCode === '1234') {  // Hardcoded for scene
      onShutdown?.();
    } else {
      // Visual feedback for wrong code
      setShutdownCode('');
    }
  };

  const currentTime = new Date().toLocaleTimeString('sv-SE', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const currentDate = new Date().toLocaleDateString('sv-SE');

  return (
    <div className={`bg-[#0a0a0a] text-white flex flex-col overflow-hidden ${showTopBar ? 'h-screen' : 'h-full'}`}>
      {/* Top Bar - System Header (only show if showTopBar is true) */}
      {showTopBar && (
        <div className="bg-[#1a1a1a] px-6 py-3 flex justify-between items-center border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-blue-400">VIGILANCE SECURITY SYSTEM</h1>
            <div className="text-sm text-gray-400">
              Wander001 Home • {cameras.length} Cameras Active
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right text-sm">
              <div className="text-white font-mono">{currentTime}</div>
              <div className="text-gray-400 text-xs">{currentDate}</div>
            </div>
            {onShutdown && (
              <button
                onClick={handleShutdownClick}
                className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-400 px-3 py-1 rounded text-sm font-semibold transition-colors"
              >
                SHUTDOWN
              </button>
            )}
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="flex-1 p-1 min-h-0">
        <div className={`grid gap-1 h-full ${
          enlargedCamera 
            ? (gridType === '2x2' ? 'grid-cols-3 grid-rows-2' : 'grid-cols-4 grid-rows-3')
            : (gridType === '2x2' ? 'grid-cols-2 grid-rows-2' : 'grid-cols-3 grid-rows-2')
        }`}>
          {cameras.map((camera, index) => {
            const isEnlarged = enlargedCamera === camera.id;
            return (
              <div
                key={camera.id}
                className={`relative bg-gray-900 rounded border border-gray-700 overflow-hidden cursor-pointer hover:border-blue-500/50 transition-colors ${
                  isEnlarged ? 'col-span-2 row-span-2' : ''
                }`}
                onClick={(e) => handleVideoClick(camera.id, e)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setSelectedCameraForFile(camera.id);
                  fileInputRef.current?.click();
                }}
              >
                {/* Video Feed */}
                {cameraVideos[camera.id] ? (
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={cameraVideos[camera.id]}
                  />
                ) : (
                  <div className="w-full h-full bg-black"></div>
                )}

                {/* Camera Info Overlay */}
                <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                  <div className="text-white font-semibold">{camera.name}</div>
                </div>

                {/* Status Indicators */}
                <div className="absolute top-2 right-2 flex items-center space-x-2">
                  {/* Live indicator */}
                  <div className="bg-green-500 h-2 w-2 rounded-full animate-pulse"></div>
                  <div className="bg-black/70 px-1 rounded text-xs text-green-400">OK</div>
                </div>

                {/* Camera Model & IP */}
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-mono text-gray-300">
                  PAN 2500 HD (10.20.0.{parseInt(camera.id) + 26})
                </div>

                {/* Enlarged indicator */}
                {isEnlarged && (
                  <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Shutdown Dialog */}
      {showShutdownDialog && onShutdown && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-[#1a1a1a] border border-red-500/50 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-red-400 mb-4">SYSTEM SHUTDOWN</h3>
            <p className="text-gray-300 text-sm mb-4">
              Enter administrator code to shutdown surveillance system:
            </p>
            
            <div className="mb-4">
              <input
                type="password"
                value={shutdownCode}
                onChange={(e) => setShutdownCode(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white font-mono text-center text-lg tracking-widest"
                placeholder="••••"
                maxLength={4}
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit()}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowShutdownDialog(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCodeSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
              >
                Shutdown
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}